import NavbarButton from '@/app/_components/NavbarButton';
import getComputedNavData from '@/app/_lib/getComputedNavData';
import sitewideNavbarDropdownsConfig from './dropDownsConfig';
import sitewideNavbarRoutes, { sitewideNavbarRoutesTitles } from './routesImpl';

const computedNavData = getComputedNavData(sitewideNavbarRoutes, sitewideNavbarRoutesTitles, sitewideNavbarDropdownsConfig);
export const navbarElements = computedNavData.map(({ getTitle: title, getPath: href }) => (
  <NavbarButton key={`navbar-btn-${title}${href}`} {...{ title, href }} />
));

export default navbarElements;
