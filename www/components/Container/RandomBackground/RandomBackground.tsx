"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

import { ContentfulImage } from "@/components/ContentfulImage/ContentfulImage";
import { ContentfulAsset } from "@/utils/types";

const CELL_HEIGHT = 224; // h-56
const COLS = 9;

type Cell = {
  id: string;
  scale: number;
  translateX: number;
  translateY: number;
  flip: boolean;
  hidden: boolean;
  png: ContentfulAsset | undefined;
};

const Duck = {
  id: "3JBqFnuMTu1pbSFS4ifafO",
};
const Shark = {
  id: "hIjGc51v69UNChLdhQZbV",
};
const Popeye = {
  id: "4l7ViTUNNB4XcvbpaLGb3s",
};
const Brouette = {
  id: "3TgLWOnNssc61Cc32QO0wK",
};
const King = {
  id: "5x2dGJ9NUm1pjaMhQnUaXB",
};
const Elefant = {
  id: "63SBdGZHOxTTFg4bheOY24",
};
const Mill = {
  id: "3agj2s4Uqz2gIjkxAoVIGy",
};
const Borie = {
  id: "7wxSIV2ollwz7lEAxlbpt4",
};
const Truelle = {
  id: "65APH11IpPHVkyQD1WsuXc",
};
const Deer = {
  id: "2WlIf3SOvzVVg9NraIuDfd",
};
const Venus = {
  id: "4ImM2j4tL1z5Yg7yuiz7SR",
};
const Family = {
  id: "5r5TVJ2Uk2ja0vFRoc0y63",
};

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getRandomPNG(assets: ContentfulAsset[], random: () => number) {
  const value = random();
  if (value < 0.0125) return assets.find(({ sys }) => sys.id === Family.id);
  if (value < 0.025) return assets.find(({ sys }) => sys.id === Venus.id);
  if (value < 0.05) return assets.find(({ sys }) => sys.id === Deer.id);
  if (value < 0.075) return assets.find(({ sys }) => sys.id === Truelle.id);
  if (value < 0.1) return assets.find(({ sys }) => sys.id === Borie.id);
  if (value < 0.2) return assets.find(({ sys }) => sys.id === Mill.id);
  if (value < 0.3) return assets.find(({ sys }) => sys.id === Elefant.id);
  if (value < 0.4) return assets.find(({ sys }) => sys.id === King.id);
  if (value < 0.5) return assets.find(({ sys }) => sys.id === Brouette.id);
  if (value < 0.6) return assets.find(({ sys }) => sys.id === Shark.id);
  if (value < 0.7) return assets.find(({ sys }) => sys.id === Duck.id);
  if (value < 0.8) return assets.find(({ sys }) => sys.id === Popeye.id);
  return;
}

function randomOffset(random: () => number) {
  return random() > 0.5
    ? Math.floor(50 * random())
    : -1 * Math.floor(50 * random());
}

function makeCell(r: number, c: number, assets: ContentfulAsset[]): Cell {
  const random = createSeededRandom(r * COLS + c + 1);
  return {
    id: `row-${r}-$col-${c}`,
    scale: Math.max(0.5, Math.min(random(), 0.75)),
    translateX: randomOffset(random),
    translateY: randomOffset(random),
    flip: random() > 0.5,
    hidden: c > 2 && c < 6,
    png: getRandomPNG(assets, random),
  };
}

function makeCells(rowCount: number, assets: ContentfulAsset[]) {
  const cols = Array.from({ length: COLS });
  const rows = Array.from({ length: rowCount });

  return rows.map((_row, r) => cols.map((_col, c) => makeCell(r, c, assets)));
}

function subscribeToResize(element: HTMLElement | null, onChange: () => void) {
  if (!element) return () => {};
  const observer = new ResizeObserver(onChange);
  observer.observe(element);
  return () => observer.disconnect();
}

function countRows(element: HTMLElement | null) {
  if (!element) return 0;
  return Math.ceil(element.clientHeight / CELL_HEIGHT);
}

const NO_ROWS_ON_SERVER = () => 0;

type Props = {
  assets: ContentfulAsset[];
};

export default function RandomBackground({ assets }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subscribe = useCallback(
    (onChange: () => void) => subscribeToResize(containerRef.current, onChange),
    []
  );
  const getRowCount = useCallback(() => countRows(containerRef.current), []);
  const rowCount = useSyncExternalStore(
    subscribe,
    getRowCount,
    NO_ROWS_ON_SERVER
  );
  const cells = makeCells(rowCount, assets);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 hidden overflow-hidden sm:block portrait:hidden"
    >
      {cells.map((rows, n) => {
        return (
          <ul
            key={`row-${n}`}
            className="hidden h-56 min-h-56 grid-cols-9 sm:grid"
            style={{
              gridRow: COLS,
            }}
          >
            {rows.map((cell) => {
              return (
                <li
                  key={`cell-${cell.id}`}
                  className=""
                  style={{
                    scale: cell.scale,
                    transform: cell.flip ? "scaleX(-1)" : undefined,
                    translate: `${cell.translateX}px ${cell.translateY}px`,
                  }}
                >
                  {cell.hidden || !cell.png ? (
                    <></>
                  ) : (
                    <ContentfulImage
                      asset={cell.png}
                      alt=""
                      aria-hidden
                      sizes="(max-width: 639px) 0vw, 100px"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
