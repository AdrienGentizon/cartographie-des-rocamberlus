"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Article, Context, ReadArticle, Storage } from "../../types";

const initialStorage: Storage = {
  readArticles: [],
};

const storageKey = "rocamberlus";

const initialContext: Context = {
  readArticles: [],
  addReadArticle: () => {},
};

const StorageContext = createContext<Context>(initialContext);

export default function StorageProvider({ children }: { children: ReactNode }) {
  const [readArticles, setReadArticles] = useState<ReadArticle[]>([]);

  const addReadArticle = (article: Article) => {
    if (readArticles.find(({ id }) => id === article.sys.id)) return;
    const updatedReadArticles: ReadArticle[] = [
      ...readArticles.filter(({ id }) => id !== article.sys.id),
      { id: article.sys.id, lastRead: Date.now() },
    ];
    writeStorage.current(updatedReadArticles);
    setReadArticles(updatedReadArticles);
  };

  const isValidReadArticle = (
    readArticle: unknown
  ): readArticle is ReadArticle => {
    return (
      typeof (readArticle as ReadArticle).id === "string" &&
      typeof (readArticle as ReadArticle).lastRead === "number"
    );
  };

  const isValidStorage = (storage: unknown): storage is Storage => {
    return (storage as Storage).readArticles !== undefined;
  };

  const sanitizeStorage = (storage: string): Storage => {
    try {
      const parsedStorage = JSON.parse(storage) as unknown;
      if (!isValidStorage(parsedStorage)) return initialStorage;
      const readArticles =
        parsedStorage.readArticles.filter(isValidReadArticle);
      return {
        readArticles,
      };
    } catch (error) {
      console.error(error);
      return initialStorage;
    }
  };

  const readStorage = useRef((): Storage => {
    try {
      const currentSessionStorage = localStorage.getItem(storageKey);
      if (currentSessionStorage) {
        return sanitizeStorage(currentSessionStorage);
      }
      return initialStorage;
    } catch (error) {
      console.error(error);
      return initialStorage;
    }
  });

  const writeStorage = useRef((readArticles: ReadArticle[]) => {
    try {
      const storage: Storage = {
        readArticles,
      };
      const sanitizedStorage = sanitizeStorage(JSON.stringify(storage));
      localStorage.setItem(
        storageKey,
        JSON.stringify(sanitizedStorage, null, 2)
      );
    } catch (error) {
      localStorage.setItem(storageKey, JSON.stringify(initialStorage, null, 2));
      console.error(error);
    }
  });

  const value: Context = { readArticles, addReadArticle };

  useEffect(() => {
    const currentStorage = readStorage.current();
    setReadArticles(currentStorage.readArticles);
  }, []);

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export const useStorageContext = () => useContext(StorageContext);
