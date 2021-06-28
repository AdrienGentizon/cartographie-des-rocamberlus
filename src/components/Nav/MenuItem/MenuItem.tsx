import React from 'react';

import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  url: string;
  title: string;
}

export default function MenuItem({ url, title }: MenuItemProps) {
  return (
    <Menu.Item as="li">
      <Link to={url}>{title}</Link>
    </Menu.Item>
  );
}
