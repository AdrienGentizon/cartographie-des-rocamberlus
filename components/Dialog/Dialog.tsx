import React from "react";

interface PropsType {
  style?: React.CSSProperties;
  onClick?: () => void;
  onClose: () => void;
}

export function Dialog({
  style,
  onClose,
  onClick,
  children,
}: React.PropsWithChildren<PropsType>) {
  return (
    <div
      style={{
        position: "fixed",
        inset: "0 0 0 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "hsla(0, 0%, 0%, 0.25)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <dialog
        open
        style={
          style ?? {
            position: "absolute",
            inset: "0 0 0 0",
            borderRadius: "0.25rem",
            background: "rgb(255 255 255 / 1)",
          }
        }
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        {children}
      </dialog>
    </div>
  );
}
