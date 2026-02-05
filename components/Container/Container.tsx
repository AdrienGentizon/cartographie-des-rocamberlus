import { ReactNode, Suspense } from "react";

import { ContentfulAsset } from "../../utils/types";
import RandomBackground from "./RandomBackground/RandomBackground";

function Container({ children }: { children: ReactNode }) {
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

export default function Wrapper({
  assets,
  children,
}: {
  assets: ContentfulAsset[];
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<Container>{children}</Container>}>
      <Container>{children}</Container>
      <RandomBackground assets={assets}></RandomBackground>
    </Suspense>
  );
}
