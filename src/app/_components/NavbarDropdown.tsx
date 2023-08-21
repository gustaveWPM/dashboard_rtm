'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';
import { hrefMatchesPathname } from '../_lib/hrefPathnameMatching';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '../_types/NavData';
import NavbarDropdownButtonStyle, {
  navbarDropdownComponentProps,
  navbarDropdownInnerButtonsClassList
} from './_config/_styles/NavbarDropdownButtonStyle';

interface NavbarButtonProps {
  href: string;
  title: NavDataRouteTitleGetter;
  embeddedEntities: EmbeddedEntities;
}

const activeCls = { className: NavbarDropdownButtonStyle.isActiveClassList };
const inactiveCls = { className: NavbarDropdownButtonStyle.isNotActiveClassList };

function menuItemsGenerator(embeddedEntities: EmbeddedEntities) {
  return embeddedEntities.map(({ getPath: href, getTitle }) => {
    const title = getTitle();

    return (
      <MenuItem key={href + title} className="p-0">
        <Link className={navbarDropdownInnerButtonsClassList} {...{ title, href }}>
          {title}
        </Link>
      </MenuItem>
    );
  });
}

const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ href, title, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) || openMenu ? activeCls : inactiveCls;

  return (
    <Menu {...navbarDropdownComponentProps} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div {...classList}>
          {title()}
          <ChevronDownIcon className={`transition-all relative top-1 ml-1 h-5 w-5 ${openMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;