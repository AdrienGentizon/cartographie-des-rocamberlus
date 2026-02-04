import getAssetsCollection from "@/queries/getAssetsCollection";

import { NAV_ASSETS } from "./assetsIds";

export default async function getHeaderContent() {
  const assets = await getAssetsCollection(Object.values(NAV_ASSETS));

  return {
    assets: {
      contact: assets.find(({ sys }) => sys.id === NAV_ASSETS.contact),
      carte: assets.find(({ sys }) => sys.id === NAV_ASSETS.carte),
      accueil: assets.find(({ sys }) => sys.id === NAV_ASSETS.accueil),
    },
  };
}
