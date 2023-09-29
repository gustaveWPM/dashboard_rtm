import ROUTES_ROOTS from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { i18ns } from '../i18n';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const BASE = getSlashEnvelope(ROUTES_ROOTS.DASHBOARD);

export const DASHBOARD_ROUTES: DashboardRoutes = {
  MAIN_PAGE: ROUTES_ROOTS.DASHBOARD,
  FOO_PAGE: BASE + 'foo',
  BAR_PAGE: BASE + 'bar'
};

const dashboard = i18ns.dashboard;
export const DASHBOARD_ROUTES_TITLES: DashboardRoutesTitles = {
  MAIN_PAGE: `${dashboard}.pages-titles.main`,
  FOO_PAGE: `${dashboard}.pages-titles.foo`,
  BAR_PAGE: `${dashboard}.pages-titles.bar`
};

export default DASHBOARD_ROUTES;
