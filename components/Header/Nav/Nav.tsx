import { CONTACT_URL, HOME_URL, MAP_URL } from "../../../utils/routes";
import { ContentfulAsset } from "../../../utils/types";
import MenuItem from "./MenuItem/MenuItem";

export default function Nav({
  assets: { contact, carte, accueil },
}: {
  assets: {
    contact?: ContentfulAsset;
    carte?: ContentfulAsset;
    accueil?: ContentfulAsset;
  };
}) {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="pt-2 lg:pt-8"
    >
      <ul
        className="main-navigation"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3rem",
          width: "100%",
          height: "100%",
        }}
      >
        <MenuItem url={HOME_URL} title="Accueil" asset={accueil} />
        <MenuItem url={MAP_URL} title="Carte" asset={carte} />
        <MenuItem url={CONTACT_URL} title="Contact" asset={contact} />
      </ul>
    </nav>
  );
}
