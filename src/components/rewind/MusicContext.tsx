"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import { asset } from "@/lib/asset";

/** public/music.wav, compressed to AAC for the web (same audio, ~3 MB instead of 26 MB). */
const MUSIC_SRC = "/music.m4a";
/** Fades so the loop never starts or stops with a click. */
const FADE_IN = 1;
const FADE_OUT = 0.4;

interface Music {
  /** The reader wants music (the sound button). It only plays once they've tapped something. */
  on: boolean;
  toggle: () => void;
}

const MusicContext = createContext<Music | null>(null);

/** The flow's music, or null where there is none (the handoff deck's embedded demos). */
export const useMusic = () => useContext(MusicContext);

/**
 * Background music for the whole flow: one looping track that keeps playing across screens and
 * restarts. Browsers only allow sound after a tap, so it starts on the reader's first tap anywhere
 * (usually "Bắt đầu"), pauses while the tab is hidden, and the sound button mutes it.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(true);
  const onRef = useRef(on);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<AnimationPlaybackControls | null>(null);
  /** The reader has tapped something, so the browser lets us play. */
  const unlocked = useRef(false);

  const fadeTo = (volume: number, duration: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeRef.current?.stop();
    fadeRef.current = animate(audio.volume, volume, {
      duration,
      ease: "easeInOut",
      onUpdate: (v) => (audio.volume = v),
      onComplete: done,
    });
  };
  const play = () => {
    const audio = audioRef.current;
    if (!audio || !onRef.current || !unlocked.current) return;
    if (audio.paused) audio.volume = 0;
    // A refused play (no gesture yet, or the file failed) just leaves it silent
    audio.play().catch(() => {});
    fadeTo(1, FADE_IN);
  };
  const pause = () => fadeTo(0, FADE_OUT, () => audioRef.current?.pause());

  useEffect(() => {
    const audio = new Audio(asset(MUSIC_SRC));
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const unlock = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      play();
    };
    const onVisibility = () => (document.hidden ? pause() : play());
    // Capture phase: runs even where the tapped element stops propagation
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      document.removeEventListener("visibilitychange", onVisibility);
      fadeRef.current?.stop();
      audio.pause();
      audioRef.current = null;
    };
    // play/pause only read refs; this runs once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    // The button tap itself counts as the gesture
    unlocked.current = true;
    if (next) play();
    else pause();
  };

  return <MusicContext value={{ on, toggle }}>{children}</MusicContext>;
}
