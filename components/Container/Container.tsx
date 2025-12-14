import { ReactNode, Suspense } from "react";

import { ContentfulAsset } from "../../utils/types";
import { BackGroundRandom } from "./BackGroundRandom/BackGroundRandom";

function Div({ children }: { children: ReactNode }) {
  return (
    <div
      className="container w-full max-w-dvw"
      style={{
        backgroundColor: "rgb(255 255 255 / 1)",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        boxShadow:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
      }}
    >
      {children}
    </div>
  );
}

export default function Container({
  assets,
  children,
}: {
  assets: ContentfulAsset[];
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<Div>{children}</Div>}>
      <BackGroundRandom assets={assets}>
        <Div>{children}</Div>
      </BackGroundRandom>
    </Suspense>
  );
}
