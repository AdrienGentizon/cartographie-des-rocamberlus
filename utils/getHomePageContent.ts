import getAssetFromId from "../queries/getAssetFromId";
import getHomePage from "../queries/getHomePage";
import { ASSETS, TITLES } from "./assetsIds";

export default async function getHomePageContent() {
  const { homePage, error } = await getHomePage();
  const { image: brouette } = await getAssetFromId(ASSETS.brouette);
  const { image: truelle } = await getAssetFromId(ASSETS.truelle);
  const { image: tertiary } = await getAssetFromId(TITLES.tertiary, {
    size: -1,
  });
  return { homePage, error, brouette, tertiary, truelle };
}
