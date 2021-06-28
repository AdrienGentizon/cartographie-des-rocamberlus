import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_URL } from '../../routes';
import BurgerButton from './BurgerButton/BurgerButton';
import Navbar from './Navbar/Navbar';

interface HeaderProps {
  isOnTop?: boolean;
}

export default function Header({ isOnTop }: HeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onUserBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsCollapsed((prevState) => !prevState);
  };

  if (isOnTop || !isCollapsed)
    return (
      <header className="Header Header--is-on-top">
        <Link to={HOME_URL} className="link link--no-decoration">
          <h2 className="Header__logo">Carte Brute</h2>
        </Link>
        <Navbar isCollapsed={isCollapsed} />
        <BurgerButton onClick={onUserBtnClick} />
      </header>
    );

  return (
    <header className="Header">
      <Link to={HOME_URL} className="link link--no-decoration">
        <h2 className="Header__logo">Carte Brute</h2>
      </Link>
      <Navbar isCollapsed={isCollapsed} />
      <BurgerButton onClick={onUserBtnClick} />
    </header>
  );
}

export function HeaderWithIntersectionObserver() {
  const [isOnTop, setIsOnTop] = useState(false);

  const intersectionObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      const [entry] = entries;
      setIsOnTop(!entry.isIntersecting);
    };

    const intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback
    );

    if (intersectionObserverRef.current)
      intersectionObserver.observe(intersectionObserverRef.current);
  }, [intersectionObserverRef]);

  return (
    <>
      <Header isOnTop={isOnTop} />

      <div
        className="intersection-observer"
        ref={intersectionObserverRef}
      ></div>
    </>
  );
}
