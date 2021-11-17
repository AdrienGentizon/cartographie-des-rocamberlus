import React, { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  align?: "left" | "justify";
}
export function H1({ children }: PropsType) {
  return <h1 className="text-3xl p-4 uppercase font-thin">{children}</h1>;
}

export function H2({ children }: PropsType) {
  return <h2 className="text-xl p-6 font-thin italic">{children}</h2>;
}

export function P({ children, align }: PropsType) {
  return (
    <p
      className={`text-sm text-left py-4 font-light lg:font-light leading-loose ${
        align ? `text-${align}` : ""
      }`}
    >
      {children}
    </p>
  );
}
