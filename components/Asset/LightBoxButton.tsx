"use client";
import { useRef } from "react";

import { ContentfulAsset } from "../../utils/types";
import { ContentfulImage } from "../ContentfulImage/ContentfulImage";
import styles from "./Asset.module.css";

interface PropsType {
  asset: ContentfulAsset;
  dialogLabel: string;
}

function LightboxCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Fermer"
      style={{
        color: "hsla(0, 100%, 100%, 1)",
        fontSize: "1.125rem",
        lineHeight: 1,
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        cursor: "pointer",
        background: "black",
        borderRadius: "100%",
        width: "2rem",
        height: "2rem",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      &times;
    </button>
  );
}

export default function LightBoxButton({ asset, dialogLabel }: PropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = () => dialogRef.current?.showModal();
  const closeLightbox = () => dialogRef.current?.close();
  const closeOnBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) closeLightbox();
  };

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        aria-label="Voir l'image en entier"
        className="absolute inset-0 cursor-pointer"
      />
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} m-auto border-none bg-transparent p-0`}
        onClick={closeOnBackdropClick}
        aria-label={dialogLabel}
      >
        <div className="relative inline-block">
          <LightboxCloseButton onClose={closeLightbox} />
          <ContentfulImage
            className="max-h-[90vh] max-w-[90vw] object-contain"
            asset={asset}
            width={asset.width}
            height={asset.height}
            sizes="100vw"
          />
        </div>
      </dialog>
    </>
  );
}
