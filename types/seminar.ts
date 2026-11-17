import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export interface SeminarThumbnail {
  id?: string;
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
}

// Public catalogue shape (GET /api/seminars?depth=1). muxPlaybackId is never
// included by the backend.
export interface Seminar {
  id: string;
  title: string;
  slug: string;
  published?: boolean;
  description?: SerializedEditorState | null;
  speaker?: string | null;
  seminarDate?: string | null;
  duration?: string | null;
  // An id string when fetched at depth=0; always request depth=1.
  thumbnail?: SeminarThumbnail | string | null;
  priceLabel?: string | null;
  purchaseUrl?: string | null;
}

// GET /api/customers/me/seminars
export interface CustomerSeminar {
  id: string;
  slug: string;
  title: string;
  speaker: string | null;
  duration: string | null;
  thumbnail: SeminarThumbnail | null;
}

export interface Customer {
  id: string;
  email: string;
  name?: string | null;
  watermarkCode?: string | null;
  avatarUrl?: string | null;
}

// GET /api/seminars/:slug/play
export interface PlayResponse {
  playbackId: string;
  tokens: {
    playback: string;
    thumbnail: string;
    storyboard: string;
  };
  expiresIn: number;
  watermark: {
    email: string;
    code: string;
    ip: string | null;
    issuedAt: string;
    notice: string[];
  };
}
