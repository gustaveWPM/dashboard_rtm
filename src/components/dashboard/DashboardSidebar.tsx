'use client';

import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import dashboardRoutes, { dashboardRoutesTitles } from '@/config/DashboardSidebar/routesImpl';
import dashboardRoutesSidebarComponents from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import { computeHTMLElementHeight, computeHTMLElementWidth } from '@/lib/html';
import Link from 'next/link';
import { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import NavbarConfig from '../_config/_styles/Navbar';

interface DashboardSidebarProps {}

const mainBoxId: string = DashboardSidebarDynamicRenderingConfig.mainBoxId;
const sidebarIconClass: string = DashboardSidebarDynamicRenderingConfig.iconClass;
const sidebarIconSeparatorClass: string = DashboardSidebarDynamicRenderingConfig.iconSeparatorClass;

function sidebarBtnsGenerator(separatorWidth: number) {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className={'relative top-2 m-auto' + ' ' + sidebarIconSeparatorClass} style={{ width: separatorWidth }} />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [dashboardRoutesSidebarComponents[k2], dashboardRoutes[k2], dashboardRoutesTitles[k2]];
    const title = globalT(i18nPath);

    return (
      <div key={`sidebar-btn-component-${k}`} className="flex flex-col items-center m-2">
        <Link {...{ title, href }} className={sidebarIconClass}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </div>
    );
  });
}

function DashboardSidebarImpl() {
  const sidebarInstanceRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState<number>(-1);
  const [dynamicPaddingBottom, setDynamicPaddingBottom] = useState(0);
  const [dynamicSeparatorWidth, setDynamicSeparatorWidth] = useState<number>(-1);
  const [dynamicLeft, setDynamicLeft] = useState<string>('100vw');

  useEffect(
    () => {
      const sidebarFirstIconInstance = document.querySelector(`.${sidebarIconClass}`);
      const mainBoxInstance = document.querySelector(`#${mainBoxId}`) as HTMLElement;
      const navbarInstance: HTMLElement | null =
        NavbarConfig.navbarId !== null ? (document.querySelector(`#${NavbarConfig.navbarId}`) as HTMLElement) : null;

      if (!sidebarFirstIconInstance) {
        console.error("DashboardSidebar: Unable to retrieve any sidebar icon! The sidebar won't be displayed.");
        return;
      }

      if (!mainBoxInstance) {
        console.error("DashboardSidebar: Unable to retrieve your <main> element! The sidebar won't be displayed.");
        return;
      }

      if (!navbarInstance && navbarInstance !== null) {
        console.error(
          "DashboardSidebar: Unable to retrieve your navbar element! If you don't have any navbar, set the navbarId value to `null`. The sidebar won't be displayed."
        );
        return;
      }

      const computedPaddingBottom = navbarInstance ? computeHTMLElementHeight(navbarInstance) : 0;
      const computedIconWidth = computeHTMLElementWidth(sidebarFirstIconInstance as HTMLElement);
      const computedSeparatorWidth = computedIconWidth * DashboardSidebarDynamicRenderingConfig.iconSeparatorWidthFactor;
      const computedWidth = computedIconWidth * DashboardSidebarDynamicRenderingConfig.iconWidthFactor;
      if (mainBoxInstance) {
        mainBoxInstance.classList.add('transition-[margin-left]');
        mainBoxInstance.style.marginLeft = `${computedWidth}` + 'px';
      }
      setDynamicSeparatorWidth(computedSeparatorWidth);
      setDynamicWidth(computedWidth);
      setDynamicLeft('0');
      setDynamicPaddingBottom(computedPaddingBottom);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      sidebarInstanceRef,
      DashboardSidebarDynamicRenderingConfig.sidebarIconSizeInPx,
      DashboardSidebarDynamicRenderingConfig.iconWidthFactor,
      DashboardSidebarDynamicRenderingConfig.iconSeparatorWidthFactor
    ]
  );

  return (
    <aside
      ref={sidebarInstanceRef}
      className="w-0 transition-[width] overflow-y-auto fixed h-screen border-r-[1px] bg-black flex flex-col"
      style={{ width: dynamicWidth, left: dynamicLeft, paddingBottom: dynamicPaddingBottom }}
    >
      <div className="flex flex-col h-fit [&>*:first-child]:mt-5">{sidebarBtnsGenerator(dynamicSeparatorWidth)}</div>
    </aside>
  );
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => (
  <I18nProviderClient>
    <DashboardSidebarImpl />
  </I18nProviderClient>
);

export default DashboardSidebar;
