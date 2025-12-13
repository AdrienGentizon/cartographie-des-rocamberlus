"use client";
import React, { useState } from "react";

import Image from "next/image";

import CustomBorderDiv from "../../../../components/CustomBorderDiv/CustomBorderDiv";
import { ContentfulAsset } from "../../../../types";
import PreviewScrollBar from "./PreviewScrollBar";
import SlideShow from "./SlideShow";

interface PropsType {
  assets: ContentfulAsset[];
  icons: {
    references: ContentfulAsset | undefined;
    webography: ContentfulAsset | undefined;
    media: ContentfulAsset | undefined;
    gallery: ContentfulAsset | undefined;
  };
}

export default function AssetsGallery({ assets = [], icons }: PropsType) {
  const [selectedAsset, setSelectedAsset] = useState<
    ContentfulAsset | undefined
  >(undefined);

  if (assets.length === 0) return <></>;

  return (
    <div className="assets-gallery">
      {icons.gallery ? (
        <Image
          src={icons.gallery.url}
          style={{
            width: "8rem",
            margin: "0 auto",
            padding: "1.5rem 0 0.5rem 0",
          }}
          width={icons.gallery.width}
          height={icons.gallery.height}
          alt={icons.gallery.description ?? icons.gallery.title ?? ""}
        />
      ) : (
        <h4
          style={{
            padding: "2rem 0 1rem 0",
            fontSize: "1.25rem",
            textTransform: "none",
            fontWeight: 200,
          }}
        >
          Galerie
        </h4>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "min-content 1fr min-content",
          gridTemplateColumns: "700px",
          placeItems: "center",
          justifyContent: "center",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            padding: "0 1rem",
            maxWidth: "100%",
          }}
        >
          <CustomBorderDiv
            style={{
              display: "flex",
              maxWidth: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 1rem",
              cursor: "pointer",
            }}
          >
            <PreviewScrollBar
              assets={assets}
              setSelectedAsset={setSelectedAsset}
            />
            {selectedAsset !== undefined && (
              <SlideShow
                assets={assets}
                initialAsset={selectedAsset}
                onClose={() => setSelectedAsset(undefined)}
              />
            )}
          </CustomBorderDiv>
        </div>
      </div>
    </div>
  );
}
