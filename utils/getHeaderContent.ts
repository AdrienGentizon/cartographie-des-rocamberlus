import getAssetsCollection from "@/queries/getAssetsCollection";

import getArtists from "../queries/getArtists";
import { NAV_ASSETS } from "./assetsIds";

export default async function getHeaderContent() {
  const { artists } = await getArtists();
  const assets = await getAssetsCollection(Object.values(NAV_ASSETS));

  return {
    artists,
    assets: {
      contact: assets.find(({ sys }) => sys.id === NAV_ASSETS.contact),
      carte: assets.find(({ sys }) => sys.id === NAV_ASSETS.carte),
      accueil: assets.find(({ sys }) => sys.id === NAV_ASSETS.accueil),
    },
  };
}
