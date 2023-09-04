import NotFoundInner from '@/components/pagesInner/Notfound';
import { getPathnameI18nFlag } from '@/lib/i18n';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LanguageFlag } from '@/types/i18n';

export default function NotFoundPage() {
  const pathname = getServerSidePathnameWorkaround();
  const lng: LanguageFlag = getPathnameI18nFlag(pathname);

  return <NotFoundInner {...{ i18nProps: { [i18nTaxonomy.LANG_FLAG]: lng } }} />;
}
