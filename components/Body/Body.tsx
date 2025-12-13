import React from "react";

interface PropsType {
  children: React.ReactNode;
}

export default function Body({ children }: PropsType) {
  return (
    <div
      style={{
        overflowX: "hidden",
        maxWidth: "100%",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}
