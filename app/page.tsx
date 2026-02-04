import Image from "next/image";

import H3 from "../components/H3/H3";
import Header from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import getHeaderContent from "../utils/getHeaderContent";
import getHomePageContent from "../utils/getHomePageContent";
import { ContentfulAsset } from "../utils/types";

function Separator({
  asset,
  flip,
}: {
  asset: ContentfulAsset | undefined;
  flip: boolean;
}) {
  if (!asset) return <div className="mx-auto w-2 border-b border-gray-500" />;
  return (
    <Image
      src={asset.url}
      alt={asset.description ?? asset.title ?? ""}
      width={asset.width}
      height={asset.height}
      style={{
        width: "56px",
        margin: "0 auto",
        transform: flip ? `rotateY(180deg)` : undefined,
      }}
    />
  );
}

export default async function HomePage() {
  const header = await getHeaderContent();
  const { homePage, error, brouette, tertiary, truelle } =
    await getHomePageContent();

  const getArticleContent = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
    values: {
      tag: "img" | "p";
      value: string;
    }[] = []
  ) => {
    for (const item of items) {
      if (item.nodeType === "embedded-asset-block")
        values.push({ tag: "img", value: item.data.target.sys.id });
      if (item.nodeType === "text" && item.value) {
        if (item.value === "") continue;
        values.push({
          tag: "p",
          value: item.value.replaceAll("\n", ""),
        });
      }
      if (item.content) {
        getArticleContent(item.content, values);
      }
    }
    return values;
  };
  const homeContent = getArticleContent(homePage?.mainText?.json.content ?? []);

  if (error || !homePage) return <p>Error!</p>;

  return (
    <>
      <Header
        title={homePage?.title === null ? undefined : homePage?.title}
        mainTitlePicture={homePage?.mainTitlePicture}
        assets={header.assets}
        asSearch
      />
      <Main>
        <section className="px-4 pb-8">
          <div className="pt-8 pb-0 lg:px-24">
            {tertiary ? (
              <>
                <h2 className="sr-only">{homePage.mainTextTitle}</h2>
                <Image
                  src={tertiary.url}
                  alt={homePage.mainTextTitle ?? "site description"}
                  width={tertiary.width}
                  height={tertiary.height}
                  priority
                />
              </>
            ) : (
              <H3>{homePage.mainTextTitle}</H3>
            )}
          </div>
          {brouette && (
            <Image
              className="mx-auto max-h-40 object-contain"
              alt="dessin d'une brouette"
              src={brouette.url}
              width={brouette.width}
              height={brouette.height}
            />
          )}
          <div>
            {homeContent.map(({ tag, value }, n) => {
              if (tag === "p") {
                return (
                  <span key={`home-p-${n}`}>
                    <p className="py-4 text-justify text-sm font-light lg:text-base lg:font-extralight">
                      {value}
                    </p>
                    {n < homeContent.length - 2 && (
                      <Separator asset={truelle} flip={(n & 1) === 0} />
                    )}
                  </span>
                );
              }

              return <></>;
            })}
          </div>
        </section>
      </Main>
    </>
  );
}
