"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { ContentfulAsset } from "@/utils/types";

const CELL_HEIGHT = 224; // h-56
const WINDOW_PADDING = -0;
const COLS = 9;
const ROWS_SAFE_FACTOR =
  process.env["NEXT_PUBLIC_USE_SCROLL_TO"] === "true" ? 2 : 5;

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

function getRandomPNG(assets: ContentfulAsset[]) {
  const random = Math.random();
  if (random < 0.0125) return assets.find(({ sys }) => sys.id === Family.id);
  if (random < 0.025) return assets.find(({ sys }) => sys.id === Venus.id);
  if (random < 0.05) return assets.find(({ sys }) => sys.id === Deer.id);
  if (random < 0.075) return assets.find(({ sys }) => sys.id === Truelle.id);
  if (random < 0.1) return assets.find(({ sys }) => sys.id === Borie.id);
  if (random < 0.2) return assets.find(({ sys }) => sys.id === Mill.id);
  if (random < 0.3) return assets.find(({ sys }) => sys.id === Elefant.id);
  if (random < 0.4) return assets.find(({ sys }) => sys.id === King.id);
  if (random < 0.5) return assets.find(({ sys }) => sys.id === Brouette.id);
  if (random < 0.6) return assets.find(({ sys }) => sys.id === Shark.id);
  if (random < 0.7) return assets.find(({ sys }) => sys.id === Duck.id);
  if (random < 0.7) return assets.find(({ sys }) => sys.id === Popeye.id);
  return;
}

function makeCells(length: number, assets: ContentfulAsset[]) {
  const cols = Array.from({ length: COLS });
  const rows = Array.from({
    length:
      ROWS_SAFE_FACTOR *
      Math.floor((length - 2 * WINDOW_PADDING) / CELL_HEIGHT),
  });

  return rows.map((_row, r) => {
    return cols.map((_col, c) => {
      return {
        id: `row-${r}-$col-${c}`,
        scale: Math.max(0.5, Math.min(Math.random(), 0.75)),
        translateX:
          Math.random() > 0.5
            ? Math.floor(50 * Math.random())
            : -1 * Math.floor(50 * Math.random()),
        translateY:
          Math.random() > 0.5
            ? Math.floor(50 * Math.random())
            : -1 * Math.floor(50 * Math.random()),
        flip: Math.random() > 0.5,
        hidden: c > 2 && c < 6,
        png: getRandomPNG(assets),
      };
    });
  });
}

type Props = {
  assets: ContentfulAsset[];
};

export default function RandomBackground({ assets }: Props) {
  const [cells, setCells] = useState<Cell[][]>(makeCells(0, assets));
  const [maxHeight, setMaxheight] = useState(0);
  const pathname = usePathname();

  assets.forEach((asset) => console.log(asset.sys.id, asset.title));

  useEffect(() => {
    const abortController = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCells(makeCells(document.body.scrollHeight, assets));
    setMaxheight(document.body.scrollHeight);
    window.addEventListener(
      "body:scrollHeight",
      (e: CustomEventInit<{ scrollHeight: number }>) => {
        if (!e.detail?.scrollHeight) return;
        setMaxheight(e.detail.scrollHeight);
      },
      { signal: abortController.signal }
    );

    return () => {
      abortController.abort();
    };
  }, [pathname, assets]);

  return (
    <div
      style={{
        maxHeight: maxHeight + 2 * -WINDOW_PADDING,
      }}
      className="absolute top-0 left-0 -z-10 hidden overflow-hidden sm:block portrait:hidden"
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
                    <Image
                      src={cell.png.url}
                      width={cell.png.width}
                      height={cell.png.height}
                      alt="drawings"
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
