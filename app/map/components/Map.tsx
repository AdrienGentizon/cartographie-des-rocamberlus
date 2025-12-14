"use client";
import { ComponentRef, useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { ContentfulLocation } from "@/utils/types";

import { hideLoader, showLoader } from "../../../components/Link/Loader/Loader";
import { useStorageContext } from "../../../components/contexts/StorageContext";
import createMap from "../../../mapping/createMap";

interface PropsType {
  locations: ContentfulLocation[];
}

export default function Map({ locations }: PropsType) {
  const router = useRouter();
  const pathname = usePathname();
  const { readArticles } = useStorageContext();
  const mapRef = useRef<ComponentRef<"div">>(null);
  const loader =
    typeof document === "undefined"
      ? null
      : document.querySelector<HTMLDivElement>(".loader");

  const [hoveredLocation, setHoveredLocation] = useState<
    ContentfulLocation | undefined
  >(undefined);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = createMap({
      mapRef: mapRef.current,
      locations: locations.filter(
        (location: ContentfulLocation) =>
          location.locationGpsCoordinates?.lon &&
          location.locationGpsCoordinates?.lat
      ),
      readArticles,
      mapCenter: undefined,
      onSelectedLocation: (location: ContentfulLocation) => {
        showLoader(loader);
        router.push(`/article/${location.sys.id}`);
      },
      onHoveringLocation: setHoveredLocation,
    });
    return () => map?.dispose();
  }, [loader, locations, readArticles, router]);

  useEffect(() => {
    return () => {
      hideLoader(loader);
    };
  }, [loader]);

  useEffect(() => {
    hideLoader(loader);
  }, [pathname, loader]);

  return (
    <div
      id="map"
      className="purpl absolute mt-4 w-full max-w-2xl rounded-lg border-4 border-black bg-black"
      ref={mapRef}
    >
      <dialog
        className={`absolute top-0 z-40 mt-4 rounded p-2 shadow-xl ${
          hoveredLocation ? "visible opacity-100" : "invisible opacity-0"
        } transition-opacity duration-300 ease-in-out`}
        open
      >
        {hoveredLocation && (
          <p className="font-thin">{hoveredLocation.title}</p>
        )}
      </dialog>
    </div>
  );
}
