import React, { HTMLAttributes } from "react";

export default function H3({
  children,
  style,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      style={{
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
        fontStyle: "italic",
        fontWeight: 100,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}
