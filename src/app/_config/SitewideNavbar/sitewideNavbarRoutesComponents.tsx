import NavbarElement from '@/app/_components/_hoc/navbar/NavbarElement';
import getComputedNavData from '@/app/_lib/misc/getComputedNavData';
import sitewideNavbarDropdownsConfig from './dropDownsConfig';
import sitewideNavbarRoutes, { sitewideNavbarRoutesTitles } from './routesImpl';

const computedNavData = getComputedNavData(sitewideNavbarRoutes, sitewideNavbarRoutesTitles, sitewideNavbarDropdownsConfig);
export const navbarElements = computedNavData.map(({ getTitle: title, getPath: href, embeddedEntities }) => (
  <NavbarElement key={`navbar-btn-${title}${href}`} {...{ title, href, embeddedEntities }} />
));

export default navbarElements;
