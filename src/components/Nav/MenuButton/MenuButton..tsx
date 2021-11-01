import React from "react";

import { Menu } from "@headlessui/react";

import { ReactComponent as MenuIcon } from "./assets/svg/menu-icon.svg";

export function MenuButton() {
  return (
    <Menu.Button className={`text-gray-600 flex  justify-end`}>
      <MenuIcon className="text-gray-600" />
    </Menu.Button>
  );
}
