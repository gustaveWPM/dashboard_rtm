'use client';

import Link from 'next/link';
import { FunctionComponent, ReactElement } from 'react';
import dashboardRoutes, { dashboardRoutesTitles } from '../dashboard/_config/routesImpl';
import dashboardRoutesSidebarComponents from '../dashboard/_config/utils/IconsMapping';
import { DashboardRoutes, DashboardRoutesSidebarReactElements, DashboardRoutesTitles } from '../dashboard/_config/utils/RoutesMapping';

interface SidebarProps {}

function sidebarBtnsGenerator() {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="relative right-0.5 w-10 m-auto" />;

  return keys.map((k): ReactElement => {
    const href = dashboardRoutes[k as keyof DashboardRoutes];
    const title = dashboardRoutesTitles[k as keyof DashboardRoutesTitles]();
    const btnComponent = dashboardRoutesSidebarComponents[k as keyof DashboardRoutesSidebarReactElements];

    return (
      <div key={`sidebar-btn-component-${k}`}>
        <Link {...{ title, href }}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </div>
    );
  });
}

const Sidebar: FunctionComponent<SidebarProps> = () => (
  <aside className="fixed w-20 h-screen border-r-[1px] p-4 bg-black flex flex-col">{sidebarBtnsGenerator()}</aside>
);

export default Sidebar;
