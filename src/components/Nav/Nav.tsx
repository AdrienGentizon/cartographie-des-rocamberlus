import React from 'react';

import { Menu, Transition } from '@headlessui/react';
import { MenuButton } from './MenuButton/MenuButton.';
import { CONTACT_URL, MAP_URL } from '../../routes';
import NavTitle from './NavTitle/NavTitle';
import MenuItem from './MenuItem/MenuItem';

export default function Nav() {
  return (
    <Menu as="nav" className="sticky top-0 flex flex-col">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between w-full bg-white px-2">
            <NavTitle />
            <MenuButton />
          </div>
          <Transition
            show={open}
            enter="transform transition duration-100 ease-in"
            enterFrom="opacity-0 bg-opacity-0"
            enterTo="opacity-100 bg-opacity-100"
            leave="transform transition duration-150 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col w-full text-gray-600 text-sm"
          >
            <Menu.Items as="ul" className="bg-white px-2">
              <MenuItem url={MAP_URL} title="Carte" />
              <MenuItem url={CONTACT_URL} title="Contact" />
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
