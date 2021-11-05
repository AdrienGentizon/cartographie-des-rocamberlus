import React, { useEffect, useRef } from "react";

import { Menu, Transition } from "@headlessui/react";
import { MenuButton } from "./MenuButton/MenuButton.";
import { CONTACT_URL, MAP_URL } from "../../routes";
import NavTitle from "./NavTitle/NavTitle";
import MenuItem from "./MenuItem/MenuItem";
import { useState } from "react";

export default function Nav() {
  const [isOnTop, setIsOnTop] = useState(false);
  const intersectionObserverRef = useRef<HTMLDivElement>(null);

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsOnTop(!entry.isIntersecting);
  };

  useEffect(() => {
    const intersectionObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      intersectionCallback,
      intersectionObserverOptions
    );

    if (intersectionObserverRef.current)
      observer.observe(intersectionObserverRef.current);
  }, [intersectionObserverRef]);

  return (
    <>
      <Menu as="nav" className="sticky lg:relative top-0 flex flex-col z-50">
        {({ open }) => (
          <>
            <div
              className={`
              flex items-center justify-between w-full px-2
              transition duration-100 ease-in-out
            ${isOnTop ? "shadow-sm border-b bg-white" : ""}
            ${open ? "bg-white" : ""}`}
            >
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
            >
              <Menu.Items
                as="ul"
                className="px-2 flex flex-col w-full text-gray-600
                text-md gap-1 py-2 shadow-sm border-b border-gray-200 bg-white"
              >
                <MenuItem url={MAP_URL} title="Carte" />
                <MenuItem url={CONTACT_URL} title="Contact" />
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      <div ref={intersectionObserverRef}></div>
    </>
  );
}
