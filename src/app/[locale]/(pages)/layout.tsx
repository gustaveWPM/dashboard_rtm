import type { LayoutBaseProps } from '@/types/Next';

import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <PagesHtmlElement params={params}>{children}</PagesHtmlElement>;
}
