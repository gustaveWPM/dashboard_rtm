import DashboardSidebarDesktop from '@/components/dashboard/DashboardSidebarDesktop';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { setStaticParamsLocale } from 'next-international/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <div className="flex flex-1 overflow-y-auto">
      <DashboardSidebarDesktop />
      <main className="flex flex-col w-full h-full p-0" id="main-box-id">
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
