import React, { HTMLAttributes } from "react";

export function Main({
  children,
  className,
  ...props
}: React.PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <main
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "0 auto auto auto",
        width: "100%",
        minHeight: "100%",
      }}
      {...props}
    >
      {children}
    </main>
  );
}
