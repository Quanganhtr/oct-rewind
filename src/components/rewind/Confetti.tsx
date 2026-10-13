"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

/**
 * Two confetti cannons firing from the bottom corners. Each piece is simulated once on mount
 * (launch, air drag, gravity, then a slow fluttering fall) and the path is played back as
 * Framer Motion keyframes, so every burst is different.
 */

const PER_CORNER = 42;
/** Keyframes per second of simulated flight; Motion interpolates linearly between them. */
const SAMPLE_RATE = 30;
const STEP = 1 / 240;
const MAX_LIFE = 4.6;
const FADE_OUT = 0.6;
/** The Figma logo shape is 1.48:1. */
const ASPECT = 1.48;

interface Piece {
  color: 1 | 2 | 3 | 4;
  w: number;
  delay: number;
  duration: number;
  times: number[];
  x: number[];
  y: number[];
  rotate: number[];
  rotateX: number[];
  rotateY: number[];
  opacity: number[];
}

const between = (min: number, max: number) => min + Math.random() * (max - min);

/** Mostly small pieces with the odd big one, like a real cannon load. */
const randomWidth = () => 5 + 19 * Math.random() ** 2.2;

function simulate(fromLeft: boolean, width: number, height: number): Piece {
  const side = fromLeft ? 1 : -1;
  // Aim up and in, towards the middle of the screen
  const angle = (between(58, 84) * Math.PI) / 180;
  const speed = between(2.3, 3.5) * height;
  const gravity = 2 * height;
  // Rising, drag is light; falling, paper hits terminal speed fast and flutters
  const dragUp = 2.6;
  const fallSpeed = between(0.17, 0.27) * height;
  const dragDown = gravity / fallSpeed;
  const w = randomWidth();
  // Smaller pieces catch more air: wider, quicker flutter
  const flutterSize = between(10, 26) * (1.4 - w / 30);
  const flutterRate = between(2.6, 5.2);
  const flutterPhase = between(0, Math.PI * 2);
  const spin = between(-540, 540);
  const flipX = between(240, 900) * (Math.random() < 0.5 ? -1 : 1);
  const flipY = between(120, 600) * (Math.random() < 0.5 ? -1 : 1);
  const life = between(3.4, MAX_LIFE);

  let px = fromLeft ? between(-6, 10) : width - between(-6, 10);
  let py = height + between(0, 12);
  let vx = Math.cos(angle) * speed * side;
  let vy = -Math.sin(angle) * speed;
  let falling = 0; // seconds since the apex — the flutter grows in from there
  let spun = between(0, 360);
  let rx = between(0, 360);
  let ry = between(0, 360);

  const piece: Piece = {
    color: (1 + Math.floor(Math.random() * 4)) as Piece["color"],
    w,
    delay: between(0, 0.14),
    duration: life,
    times: [],
    x: [],
    y: [],
    rotate: [],
    rotateX: [],
    rotateY: [],
    opacity: [],
  };

  const stepsPerSample = Math.round(1 / (SAMPLE_RATE * STEP));
  for (let i = 0, t = 0; t <= life + 1e-6; i++, t = i * STEP) {
    if (i % stepsPerSample === 0) {
      const sway = falling > 0 ? flutterSize * Math.min(1, falling / 0.8) * Math.sin(flutterRate * falling + flutterPhase) : 0;
      piece.times.push(t / life);
      piece.x.push(px + sway);
      piece.y.push(py);
      piece.rotate.push(spun);
      piece.rotateX.push(rx);
      piece.rotateY.push(ry);
      piece.opacity.push(t > life - FADE_OUT ? Math.max(0, (life - t) / FADE_OUT) : 1);
    }
    const drag = vy < 0 ? dragUp : dragDown;
    vx -= vx * (vy < 0 ? dragUp * 1.1 : dragDown * 0.6) * STEP;
    vy += (gravity - drag * vy) * STEP;
    px += vx * STEP;
    py += vy * STEP;
    if (vy >= 0) falling += STEP;
    // Spin bleeds off with the launch speed but never quite stops
    const spinScale = vy < 0 ? 1 : 0.55;
    spun += spin * spinScale * STEP;
    rx += flipX * STEP;
    ry += flipY * STEP;
  }
  return piece;
}

function fire(width: number, height: number): Piece[] {
  return Array.from({ length: PER_CORNER * 2 }, (_, i) => simulate(i % 2 === 0, width, height));
}

/** Fires once when mounted over the whole screen (callers skip it under reduced motion). */
export function Confetti() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  return (
    <div
      aria-hidden
      // Simulate against the real screen size the first time the layer is laid out
      ref={(el) => {
        if (el && !pieces) setPieces(fire(el.clientWidth, el.clientHeight));
      }}
      className="pointer-events-none absolute inset-0 overflow-clip"
    >
      {pieces?.map((piece, i) => <ConfettiPiece key={i} piece={piece} />)}
    </div>
  );
}

function ConfettiPiece({ piece }: { piece: Piece }) {
  const { w, times, delay, duration } = piece;
  const h = w / ASPECT;
  const track = { delay, duration, times, ease: "linear" as const };
  return (
    <motion.img
      alt=""
      src={asset(`/rewind/confetti-${piece.color}.svg`)}
      className="absolute top-0 left-0 block max-w-none"
      // Centred on its simulated point; Motion owns `transform`, so offset with margins
      style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transformPerspective: 400 }}
      initial={{ x: piece.x[0], y: piece.y[0], opacity: 0 }}
      animate={{
        x: piece.x,
        y: piece.y,
        rotate: piece.rotate,
        rotateX: piece.rotateX,
        rotateY: piece.rotateY,
        opacity: piece.opacity,
      }}
      transition={track}
    />
  );
}
