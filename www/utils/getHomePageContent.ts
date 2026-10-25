import getAssetsCollection from "@/queries/getAssetsCollection";

import getHomePage from "../queries/getHomePage";
import { ASSETS, TITLES } from "./assetsIds";

export default async function getHomePageContent() {
  const { homePage, error } = await getHomePage();
  const assets = await getAssetsCollection([
    ASSETS.brouette,
    ASSETS.truelle,
    TITLES.tertiary,
  ]);

  return {
    homePage,
    error,
    brouette: assets.find(({ sys }) => sys.id === ASSETS.brouette),
    tertiary: assets.find(({ sys }) => sys.id === TITLES.tertiary),
    truelle: assets.find(({ sys }) => sys.id === ASSETS.truelle),
  };
}
