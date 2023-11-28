import type I18nTaxonomy from '##/config/taxonomies/i18n';
import type NotFoundTaxonomy from '##/config/taxonomies/notfound';
import type { LanguageFlag } from '##/types/hell/i18n';
import type { ReactNode } from 'react';

export interface I18nParams {
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
}

export interface I18nPageProps {
  params: I18nParams;
}

export interface I18nComponentProps {
  i18nProps: I18nParams;
}

export interface LayoutBaseProps extends I18nPageProps {
  children: ReactNode;
}

export type NotFoundCatchallParams = {
  params: { [NotFoundTaxonomy.NOT_FOUND]: unknown[] };
};
