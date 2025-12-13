import React, { HTMLAttributes } from "react";

export const customBorderCssProperties: React.CSSProperties = {
  borderWidth: 8,
  borderImageOutset: 0,
  borderImageSource: "url(/picture-frame.png)",
  borderImageSlice: 16,
  borderImageRepeat: "round",
  borderImageWidth: 1.5,
};

export default function CustomBorderDiv({
  children,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        ...customBorderCssProperties,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
