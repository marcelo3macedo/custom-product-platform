"use client";

import type { ReactNode } from "react";
import type { ProductKind } from "@/data/store";

type Props = {
  kind: ProductKind;
  color: string;
  showGuides: boolean;
  printAreaLabel: string;
  children: ReactNode;
};

export default function ProductMockupFrame({
  kind,
  color,
  showGuides,
  printAreaLabel,
  children,
}: Props) {
  return (
    <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center p-4">
      {/* Product Silhouette Wrapper */}
      <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100 to-zinc-200/80 p-4 shadow-inner">
        {/* Subtle grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* SVG Product Silhouette Backing */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <svg
            viewBox="0 0 500 560"
            className="h-full w-full drop-shadow-xl transition-all duration-300"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12))" }}
          >
            <defs>
              <linearGradient id="shadingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#000000" stopOpacity="0.0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
              </linearGradient>
            </defs>

            {kind === "tshirt" && (
              <g>
                {/* T-Shirt Body */}
                <path
                  d="M175 60 C195 90 305 90 325 60 L445 125 L405 210 L350 185 L350 510 C350 520 340 530 325 530 L175 530 C160 530 150 520 150 510 L150 185 L95 210 L55 125 Z"
                  fill={color}
                />
                {/* Shading overlay */}
                <path
                  d="M175 60 C195 90 305 90 325 60 L445 125 L405 210 L350 185 L350 510 C350 520 340 530 325 530 L175 530 C160 530 150 520 150 510 L150 185 L95 210 L55 125 Z"
                  fill="url(#shadingGrad)"
                />
                {/* Collar Rib */}
                <path
                  d="M175 60 C195 95 305 95 325 60 C310 75 190 75 175 60 Z"
                  fill="#000000"
                  opacity="0.18"
                />
                {/* Sleeve stitches */}
                <path d="M350 185 L405 210" stroke="#000000" strokeWidth="2" opacity="0.15" />
                <path d="M150 185 L95 210" stroke="#000000" strokeWidth="2" opacity="0.15" />
              </g>
            )}

            {kind === "hoodie" && (
              <g>
                {/* Hoodie body */}
                <path
                  d="M165 70 C190 115 310 115 335 70 L455 140 L400 320 L355 270 L355 520 C355 530 345 535 330 535 L170 535 C155 535 145 530 145 520 L145 270 L100 320 L45 140 Z"
                  fill={color}
                />
                <path
                  d="M165 70 C190 115 310 115 335 70 L455 140 L400 320 L355 270 L355 520 C355 530 345 535 330 535 L170 535 C155 535 145 530 145 520 L145 270 L100 320 L45 140 Z"
                  fill="url(#shadingGrad)"
                />
                {/* Hood collar */}
                <path
                  d="M170 70 C185 130 315 130 330 70 C305 85 195 85 170 70 Z"
                  fill="#000"
                  opacity="0.25"
                />
                {/* Kangaroo Pocket */}
                <path
                  d="M185 390 L315 390 L335 480 L165 480 Z"
                  fill="#000"
                  opacity="0.1"
                  stroke="#000"
                  strokeWidth="2"
                />
                {/* Drawstrings */}
                <path d="M225 105 L220 180" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                <path d="M275 105 L280 180" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              </g>
            )}

            {kind === "mug" && (
              <g transform="translate(45, 50) scale(0.82)">
                {/* Handle */}
                <path
                  d="M370 140 C465 140 465 340 370 340"
                  fill="none"
                  stroke={color}
                  strokeWidth="48"
                  strokeLinecap="round"
                />
                <path
                  d="M370 140 C465 140 465 340 370 340"
                  fill="none"
                  stroke="#000"
                  strokeWidth="48"
                  strokeLinecap="round"
                  opacity="0.15"
                />
                {/* Mug Body */}
                <rect x="90" y="80" width="280" height="350" rx="28" fill={color} />
                <rect x="90" y="80" width="280" height="350" rx="28" fill="url(#shadingGrad)" />
                {/* Rim */}
                <ellipse cx="230" cy="80" rx="140" ry="24" fill="#000" opacity="0.18" />
                <ellipse cx="230" cy="78" rx="136" ry="20" fill={color} />
              </g>
            )}

            {kind === "cap" && (
              <g transform="translate(15, 60) scale(0.94)">
                {/* Cap Dome */}
                <path
                  d="M75 320 C75 160 170 90 250 90 C330 90 425 160 425 320 Z"
                  fill={color}
                />
                <path
                  d="M75 320 C75 160 170 90 250 90 C330 90 425 160 425 320 Z"
                  fill="url(#shadingGrad)"
                />
                {/* Visor / Brim */}
                <path
                  d="M50 320 C110 375 390 375 450 320 C420 380 340 410 250 410 C160 410 80 380 50 320 Z"
                  fill={color}
                  filter="brightness(0.9)"
                />
                {/* Seam stitches */}
                <path d="M250 90 L250 320" stroke="#000" strokeWidth="2" opacity="0.2" strokeDasharray="4 3" />
                <circle cx="250" cy="92" r="10" fill="#000" opacity="0.3" />
              </g>
            )}

            {kind === "bag" && (
              <g transform="translate(45, 20) scale(0.82)">
                {/* Straps */}
                <path
                  d="M170 200 C170 60 330 60 330 200"
                  fill="none"
                  stroke={color}
                  strokeWidth="28"
                  filter="brightness(0.85)"
                />
                {/* Tote Body */}
                <rect x="85" y="180" width="330" height="370" rx="16" fill={color} />
                <rect x="85" y="180" width="330" height="370" rx="16" fill="url(#shadingGrad)" />
                {/* Top fold */}
                <rect x="85" y="180" width="330" height="24" fill="#000" opacity="0.12" />
              </g>
            )}

            {kind === "bottle" && (
              <g transform="translate(110, 20) scale(0.72, 0.88)">
                {/* Cap & Handle */}
                <rect x="150" y="20" width="100" height="50" rx="8" fill="#27272a" />
                <rect x="170" y="5" width="60" height="20" rx="6" fill="#52525b" />
                {/* Bottle Neck */}
                <rect x="165" y="70" width="70" height="30" fill={color} filter="brightness(0.9)" />
                {/* Bottle Body */}
                <rect x="100" y="100" width="200" height="460" rx="36" fill={color} />
                <rect x="100" y="100" width="200" height="460" rx="36" fill="url(#shadingGrad)" />
                {/* Stainless steel reflection strip */}
                <rect x="130" y="110" width="20" height="440" rx="10" fill="#fff" opacity="0.25" />
              </g>
            )}
          </svg>
        </div>

        {/* The Printable Canvas Area */}
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={`relative rounded-xl transition-all duration-200 ${
              showGuides
                ? "border-2 border-dashed border-indigo-400 bg-white/70 shadow-sm backdrop-blur-[1px]"
                : "border-2 border-transparent bg-transparent"
            }`}
          >
            {/* Guide badge */}
            {showGuides && (
              <span className="pointer-events-none absolute -top-3 left-3 rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm">
                {printAreaLabel}
              </span>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
