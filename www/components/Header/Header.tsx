import { ContentfulAsset } from "../../utils/types";
import Nav from "./Nav/Nav";
import Title from "./Title/Title";

export default function Header({
  title,
  mainTitlePicture,
  assets,
}: {
  title?: string;
  mainTitlePicture?: { url: string; width: number; height: number } | null;
  assets: {
    contact?: ContentfulAsset;
    carte?: ContentfulAsset;
    accueil?: ContentfulAsset;
  };
}) {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title title={title} mainTitlePicture={mainTitlePicture} />
      <Nav assets={assets} />
    </header>
  );
}
