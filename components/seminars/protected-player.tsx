"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import MuxPlayer, {
  type MuxCSSProperties,
  type MuxPlayerRefAttributes,
} from "@mux/mux-player-react";
import { Maximize, Minimize } from "lucide-react";
import type { PlayResponse } from "@/types";
import Watermark, { watermarkGrid, type WatermarkGrid } from "./watermark";

type Props = {
  data: PlayResponse;
  receivedAt: number;
  title: string;
  startTime?: number;
  // Tokens likely expired (player error, or a long-idle tab): fetch new ones
  // and resume from `currentTime`.
  onNeedFreshTokens: (currentTime: number) => void;
};

// Picture-in-picture, AirPlay and casting would show the video without the
// overlay, and the player's own fullscreen button would fullscreen the player
// element alone (leaving the watermark behind). Hide them all; we provide a
// fullscreen button that fullscreens the wrapper (video + watermark) instead.
const playerStyle: MuxCSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  "--fullscreen-button": "none",
  "--pip-button": "none",
  "--airplay-button": "none",
  "--cast-button": "none",
};

function isHidden(style: CSSStyleDeclaration) {
  return (
    style.display === "none" ||
    style.visibility !== "visible" ||
    parseFloat(style.opacity) < 0.99
  );
}

function alphaOf(color: string) {
  const parts = color.match(/[\d.]+/g);
  if (!parts) return 1;
  return parts.length >= 4 ? parseFloat(parts[3]) : 1;
}

export default function ProtectedPlayer({
  data,
  receivedAt,
  title,
  startTime,
  onNeedFreshTokens,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const lastRecreateRef = useRef(0);
  const tamperedRef = useRef(false);
  const mutedByGuardRef = useRef(false);
  const [overlayKey, setOverlayKey] = useState(0);
  const [tampered, setTampered] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [grid, setGrid] = useState<WatermarkGrid>(() => watermarkGrid(Infinity));
  // What's been rendered, so verify() never compares against a grid that
  // hasn't been committed yet (e.g. mid-resize).
  const gridRef = useRef(grid);
  gridRef.current = grid;

  // Watermark density follows the player's width (incl. fullscreen).
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const update = () => {
      const next = watermarkGrid(wrapper.getBoundingClientRect().width);
      setGrid((prev) => (prev.cols === next.cols && prev.rows === next.rows ? prev : next));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Checks the watermark's actual on-screen state (rather than reacting to
  // individual mutations), so legitimate updates pass and any removal, hiding,
  // resizing or CSS override fails.
  const verify = useCallback(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay || !wrapper.contains(overlay)) return false;
    if (isHidden(getComputedStyle(overlay))) return false;

    const wrapperBox = wrapper.getBoundingClientRect();
    const overlayBox = overlay.getBoundingClientRect();
    if (
      Math.abs(overlayBox.width - wrapperBox.width) > 4 ||
      Math.abs(overlayBox.height - wrapperBox.height) > 4
    ) {
      return false;
    }

    const layer = overlay.querySelector<HTMLElement>("[data-wm-layer]");
    if (!layer || isHidden(getComputedStyle(layer))) return false;
    if (layer.getBoundingClientRect().width < overlayBox.width) return false;

    const blockCount = gridRef.current.cols * gridRef.current.rows;
    const blocks = overlay.querySelectorAll<HTMLElement>("[data-wm-block]");
    if (blocks.length !== blockCount) return false;
    let visible = 0;
    blocks.forEach((block) => {
      if (parseFloat(getComputedStyle(block).opacity) > 0.05) visible++;
    });
    if (visible < blockCount / 2) return false;
    const sample = getComputedStyle(blocks[0]);
    if (alphaOf(sample.color) < 0.5) return false;
    if (blocks[0].getBoundingClientRect().height < 8) return false;

    // In fullscreen, the watermark must be inside whatever is fullscreen.
    const fullscreenEl = document.fullscreenElement;
    if (fullscreenEl && !fullscreenEl.contains(overlay)) return false;

    return true;
  }, []);

  // Muting is a second line of defence: if pause() is overridden from the
  // console, the video may keep running, but without sound. Only the mute we
  // applied is undone, never one the viewer chose.
  const silence = useCallback(() => {
    const player = playerRef.current;
    if (!player || player.muted) return;
    mutedByGuardRef.current = true;
    player.muted = true;
  }, []);

  const restoreSound = useCallback(() => {
    if (!mutedByGuardRef.current) return;
    mutedByGuardRef.current = false;
    if (playerRef.current) playerRef.current.muted = false;
  }, []);

  // On failure: pause, mute and re-create the overlay (throttled, so a
  // persistent CSS override can't spin a remount loop — the video just stays
  // paused).
  const enforce = useCallback(() => {
    if (verify()) {
      tamperedRef.current = false;
      setTampered(false);
      restoreSound();
      return true;
    }
    tamperedRef.current = true;
    playerRef.current?.pause();
    silence();
    setTampered(true);
    const now = Date.now();
    if (now - lastRecreateRef.current > 1000) {
      lastRecreateRef.current = now;
      setOverlayKey((key) => key + 1);
    }
    return false;
  }, [verify, silence, restoreSound]);

  // Tamper response: watch the wrapper subtree, plus a periodic check that
  // also catches stylesheet-based hiding (which doesn't mutate the overlay).
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => enforce());
    });
    observer.observe(wrapper, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden"],
    });
    const interval = setInterval(enforce, 1500);
    return () => {
      observer.disconnect();
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, [enforce]);

  // Disable the "f" fullscreen shortcut, which would fullscreen the player
  // element alone. `hotkeys` is a read-only property on the element (so it
  // can't be a React prop); the attribute is the supported way to set it.
  useEffect(() => {
    playerRef.current?.setAttribute("hotkeys", "nof");
  }, []);

  // While tampered, unmuting (or raising the volume from zero) is undone.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const onVolumeChange = () => {
      if (!tamperedRef.current || player.muted) return;
      mutedByGuardRef.current = true;
      player.muted = true;
    };
    player.addEventListener("volumechange", onVolumeChange);
    return () => player.removeEventListener("volumechange", onVolumeChange);
  }, []);

  // Fullscreen: keep the wrapper (video + watermark) as the fullscreen element.
  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () => {
      const wrapper = wrapperRef.current;
      const fullscreenEl = document.fullscreenElement;
      setIsFullscreen(Boolean(wrapper) && fullscreenEl === wrapper);
      // Something inside the player went fullscreen on its own (e.g. a
      // double-click): move fullscreen to the wrapper, or leave it.
      if (wrapper && fullscreenEl && fullscreenEl !== wrapper && wrapper.contains(fullscreenEl)) {
        wrapper
          .requestFullscreen()
          .catch(() => document.exitFullscreen().catch(() => {}));
      }
      enforce();
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [enforce]);

  // Coming back to a tab left open past the token lifetime: refresh while
  // paused (a playing video will report an error and refresh that way).
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const expired = Date.now() - receivedAt > data.expiresIn * 1000;
      const player = playerRef.current;
      if (expired && player?.paused) onNeedFreshTokens(player.currentTime ?? 0);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [receivedAt, data.expiresIn, onNeedFreshTokens]);

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      wrapper.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="group relative aspect-video w-full overflow-hidden bg-black"
    >
      <MuxPlayer
        ref={playerRef}
        playbackId={data.playbackId}
        tokens={{
          playback: data.tokens.playback,
          thumbnail: data.tokens.thumbnail,
          storyboard: data.tokens.storyboard,
        }}
        streamType="on-demand"
        startTime={startTime}
        // No email/IP in analytics — title only.
        metadata={{ video_title: title }}
        // No Mux Data viewer cookie: the privacy policy promises essential
        // (session) cookies only.
        disableCookies
        disablePictureInPicture
        playsInline
        style={playerStyle}
        onPlay={() => enforce()}
        onError={() => onNeedFreshTokens(playerRef.current?.currentTime ?? 0)}
      />

      <Watermark
        key={overlayKey}
        ref={overlayRef}
        watermark={data.watermark}
        receivedAt={receivedAt}
        grid={grid}
      />

      {canFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-70 transition hover:bg-black/60 hover:opacity-100"
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>
      )}

      {tampered && (
        <div className="absolute inset-x-0 bottom-16 z-20 mx-auto w-fit rounded-full bg-black/70 px-4 py-2 text-xs text-white">
          Playback paused and muted. The watermark must stay visible.
        </div>
      )}
    </div>
  );
}
