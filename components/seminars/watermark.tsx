"use client";

import { forwardRef, useEffect, useState } from "react";
import BrandLogo from "@/public/images/brand-logo-colored.png";
import type { PlayResponse } from "@/types";

export type WatermarkGrid = { cols: number; rows: number };

type Props = {
  watermark: PlayResponse["watermark"];
  // Client clock (ms) when /play responded; the displayed time advances from
  // the server's issuedAt by however long has elapsed on this client since.
  receivedAt: number;
  grid: WatermarkGrid;
};

// Horizontal brick grid on a layer 140% the size of the frame, so the random
// shifts never expose a clean edge. As dense as the text allows without
// blocks overlapping: ~5.7 × 5.7 blocks visible on desktop, fewer on phones
// (where the minimum font size makes each block relatively wider).
const LAYER_SIZE = "140%";
const BLOCK_OPACITY = 0.26;
const HERO_OPACITY = 0.38;
const FADED_SHARE = 0.08;

export function watermarkGrid(frameWidth: number): WatermarkGrid {
  return frameWidth < 640 ? { cols: 5, rows: 6 } : { cols: 8, rows: 8 };
}

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
});

// "16 Nov 2026 15:30:12 WIB"
function formatClock(ms: number) {
  return `${clockFormat.format(new Date(ms)).replace(",", "")} WIB`;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickFaded(count: number) {
  const faded = new Set<number>();
  const target = Math.max(1, Math.round(count * FADED_SHARE));
  while (faded.size < target) {
    faded.add(Math.floor(Math.random() * count));
  }
  return faded;
}

const textShadow = "0 0 1px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.6)";
const logoFilter = "brightness(0) invert(1) drop-shadow(0 0 1px rgba(0,0,0,0.9))";

function BlockContent({
  watermark,
  clock,
  scale = 1,
}: {
  watermark: PlayResponse["watermark"];
  clock: string;
  scale?: number;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BrandLogo.src}
        alt=""
        draggable={false}
        style={{
          width: `clamp(${26 * scale}px, ${4.5 * scale}cqw, ${90 * scale}px)`,
          filter: logoFilter,
          marginBottom: "0.35em",
        }}
      />
      <span>{watermark.email}</span>
      <span>{watermark.code}</span>
      {watermark.ip && <span>{watermark.ip}</span>}
      <span>{clock}</span>
      {watermark.notice.map((line) => (
        <span key={line} className="font-semibold tracking-wide">
          {line}
        </span>
      ))}
    </>
  );
}

// Traceability overlay drawn on top of the video. Purely visual and
// non-interactive (pointer-events: none); ProtectedPlayer watches it for
// tampering. Never rendered before /play succeeds.
const Watermark = forwardRef<HTMLDivElement, Props>(function Watermark(
  { watermark, receivedAt, grid },
  ref
) {
  const { cols, rows } = grid;
  const blockCount = cols * rows;
  const [now, setNow] = useState(() => Date.now());
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [faded, setFaded] = useState<Set<number>>(() => new Set());

  // Live clock.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Every 10–20s (randomised): shift the whole grid and fade a few blocks, so a
  // fixed-position blur/mask can't hide it.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setShift({ x: randomBetween(-4, 4), y: randomBetween(-4, 4) });
        setFaded(pickFaded(blockCount));
        schedule();
      }, randomBetween(10_000, 20_000));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [blockCount]);

  const clock = formatClock(Date.parse(watermark.issuedAt) + (now - receivedAt));

  return (
    <div
      ref={ref}
      data-watermark
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden [container-type:size]"
    >
      {/* Oversized, staggered grid so no corner or region is clean. */}
      <div
        data-wm-layer
        className="absolute left-1/2 top-1/2 flex flex-col transition-transform ease-in-out [transition-duration:2000ms]"
        style={{
          width: LAYER_SIZE,
          height: LAYER_SIZE,
          transform: `translate(calc(-50% + ${shift.x}%), calc(-50% + ${shift.y}%))`,
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="flex flex-1 items-center"
            style={row % 2 ? { transform: `translateX(${50 / cols}%)` } : undefined}
          >
            {Array.from({ length: cols }).map((_, col) => {
              const index = row * cols + col;
              return (
                <div key={col} className="flex flex-1 justify-center">
                  <div
                    data-wm-block
                    className="flex flex-col items-center whitespace-nowrap text-center leading-tight text-white transition-opacity [transition-duration:1500ms]"
                    style={{
                      opacity: faded.has(index) ? 0 : BLOCK_OPACITY,
                      fontSize: "clamp(5px, 0.75cqw, 15px)",
                      textShadow,
                    }}
                  >
                    <BlockContent watermark={watermark} clock={clock} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Two larger, slightly more opaque blocks drifting slowly across on
          opposite phases of the same path, so they never stack. */}
      {[
        { left: "8%", top: "10%", animationDelay: "0s" },
        { left: "50%", top: "50%", animationDelay: "-35s", animationDirection: "alternate-reverse" },
      ].map((position) => (
        <div
          key={position.animationDelay}
          data-wm-hero
          className="absolute flex animate-wm-drift flex-col items-center whitespace-nowrap text-center leading-tight text-white motion-reduce:animate-none"
          style={{
            opacity: HERO_OPACITY,
            fontSize: "clamp(9px, 1.5cqw, 28px)",
            textShadow,
            ...position,
          }}
        >
          <BlockContent watermark={watermark} clock={clock} scale={1.6} />
        </div>
      ))}
    </div>
  );
});

export default Watermark;
