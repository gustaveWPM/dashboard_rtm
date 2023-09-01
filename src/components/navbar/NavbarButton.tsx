'use client';

import NavbarButtonStyle from '@/components/_config/_styles/NavbarButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { AtomicNavDataEntity } from '@/types/NavData';
import { ClassName } from '@/types/React';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface NavbarButtonProps extends AtomicNavDataEntity {}

const active: ClassName = { className: NavbarButtonStyle.isActiveClassList };
const inactive: ClassName = { className: NavbarButtonStyle.isNotActiveClassList };

export const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href }) => {
  const globalT = getClientSideI18n();
  const title = globalT(i18nTitle);

  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? active : inactive;
  const target = getLinkTarget(href);

  return <Link {...{ ...classList, href, ...target }}>{title}</Link>;
};

export default NavbarButton;
