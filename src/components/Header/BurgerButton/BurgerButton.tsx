import { MouseEvent } from 'react';

interface BurgerButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function BurgerButton({ onClick }: BurgerButtonProps) {
  return (
    <button
      className={`Header__burger-button btn--transparent btn--no-border`}
      onClick={onClick}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
}
