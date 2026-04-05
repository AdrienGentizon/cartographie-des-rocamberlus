"use client";
import { ComponentProps, useEffect } from "react";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { hideLoader, showLoader } from "./Loader/Loader";

export default function Link({
  children,
  onClick,
  ...props
}: ComponentProps<typeof NextLink>) {
  const pathname = usePathname();
  const loader =
    typeof document === "undefined"
      ? null
      : document.querySelector<HTMLDivElement>(".loader");

  useEffect(() => {
    hideLoader(loader);

    return () => {
      hideLoader(loader);
    };
  }, [loader]);

  useEffect(() => {
    hideLoader(loader);
  }, [pathname, loader]);

  return (
    <NextLink
      onClick={(e) => {
        if (pathname === props.href) hideLoader(loader);
        showLoader(loader);
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}
