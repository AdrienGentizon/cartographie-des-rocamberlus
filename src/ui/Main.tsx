import React, { ReactNode } from "react";

interface PropsType {
  children?: ReactNode;
  fullWidth?: boolean;
}

export default function Main({ children, fullWidth }: PropsType) {
  return (
    <main
      className={`flex flex-col text-center mx-auto mb-auto max-w-2xl w-full min-h-full ${
        fullWidth ? "" : "px-2"
      }`}
    >
      {children}
    </main>
  );
}
