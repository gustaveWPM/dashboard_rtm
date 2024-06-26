/* v8 ignore start */
// Stryker disable all

'use client';

import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { I18nProviderClient } from '@/i18n/client';
import Loader from '@/components/ui/Loader';

export interface I18nProviderProps extends WithChildren {
  locale: LanguageFlag;
}

const I18nProvider: FunctionComponent<I18nProviderProps> = ({ children, locale }) => (
  <I18nProviderClient fallback={<Loader />} locale={locale}>
    {children}
  </I18nProviderClient>
);

export default I18nProvider;

// Stryker restore all
/* v8 ignore stop */
