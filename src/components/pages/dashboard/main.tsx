import ROUTES_ROOTS from '@/config/routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface DashboardMainPageProps {}

export const DashboardMainPage: FunctionComponent<DashboardMainPageProps> = () => {
  return (
    <>
      <h1>Hello there</h1>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default DashboardMainPage;