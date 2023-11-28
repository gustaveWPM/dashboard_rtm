'use client';

import ROUTES_ROOTS from '##/config/routes';
import SidebarButtonStyle from '@/components/config/styles/sidebar/SidebarButtonStyle';
import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import type { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import { hrefMatchesPathname } from '@/lib/str';
import { cn, getBreakpoint } from '@/lib/tailwind';
import { useMediaQuery } from '@react-hook/media-query';
import { computeHTMLElementHeight, computeHTMLElementWidth, getDirection } from '@rtm/shared-lib/src/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/src/react';
import type { AppPath } from '@rtm/shared-types/src/Next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import DashboardSidebarCollapseButton from './DashboardSidebarCollapseButton';

interface DashboardSidebarProps {}

const { isActiveClassList, isNotActiveClassList } = SidebarButtonStyle;

function sidebarBtnsGenerator(currentPathname: AppPath): ReactNode[] {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="m-auto my-2 hidden w-5/6 lg:block" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2], DASHBOARD_ROUTES[k2], DASHBOARD_ROUTES_TITLES[k2]];
    const title = globalT(i18nPath);

    const sidebarButtonClassName = hrefMatchesPathname(href, currentPathname, ROUTES_ROOTS.DASHBOARD) ? isActiveClassList : isNotActiveClassList;

    return (
      <li key={`${k}-sidebar-btn-component`}>
        <Link title={title} href={href} className={cn('flex w-fit max-w-full flex-col rounded-lg', sidebarButtonClassName)}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </li>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  const wasCollapsed = useRef<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(wasCollapsed.current);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const currentLocale = useCurrentLocale();
  const currentPathname = usePathname();

  useEffect(() => {
    const sidebarInstance = getRefCurrentPtr(sidebarRef);
    if (!sidebarInstance) return;

    const EFFECT_CLASSES = ['transition-all', 'duration-300'];

    function applyUncollapsedStyles() {
      sidebarInstance.style.marginLeft = '0';
      sidebarInstance.style.marginRight = '0';
      sidebarInstance.style.marginTop = '0';
      wasCollapsed.current = false;
    }

    function applyCollapsedStyles() {
      const direction = getDirection();
      if (isLargeScreen) {
        sidebarInstance.style.marginTop = '0';
        if (direction === 'rtl') {
          sidebarInstance.style.marginRight = '-' + computeHTMLElementWidth(sidebarInstance) + 'px';
          sidebarInstance.style.marginLeft = '0';
        } else {
          sidebarInstance.style.marginLeft = '-' + computeHTMLElementWidth(sidebarInstance) + 'px';
          sidebarInstance.style.marginRight = '0';
        }
      } else {
        sidebarInstance.style.marginLeft = '0';
        sidebarInstance.style.marginTop = '-' + computeHTMLElementHeight(sidebarInstance) + 'px';
      }
      wasCollapsed.current = true;
    }

    if (!isCollapsed) {
      if (!wasCollapsed.current) sidebarInstance.classList.remove(...EFFECT_CLASSES);
      else sidebarInstance.classList.add(...EFFECT_CLASSES);

      applyUncollapsedStyles();
      return;
    }

    if (wasCollapsed.current) sidebarInstance.classList.remove(...EFFECT_CLASSES);
    else sidebarInstance.classList.add(...EFFECT_CLASSES);
    applyCollapsedStyles();
  }, [isCollapsed, sidebarRef, isLargeScreen, currentLocale]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={'z-20 w-full justify-center border-t-[1px] border-muted-foreground bg-black dark:bg-card lg:w-fit lg:border-0'}
      >
        <nav className="py-4 lg:overflow-y-auto lg:px-[22px]">
          <ul className={cn('flex flex-wrap justify-center gap-2 lg:block')} role="menu">
            {sidebarBtnsGenerator(currentPathname)}
          </ul>
        </nav>
      </aside>
      <DashboardSidebarCollapseButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </>
  );
};

export default DashboardSidebar;
