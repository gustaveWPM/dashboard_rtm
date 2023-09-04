import RoutesBase from '@/config/routes';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Hello there (Dashboard foo tab)</h1>
      <Link href={RoutesBase.SITEWIDE}>Go back to the homepage</Link>
    </>
  );
}
