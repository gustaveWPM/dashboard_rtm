/* v8 ignore start */
// Stryker disable all
import type { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import type { PagesFromCodegenSchema } from '@rtm/generated/Pages';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { DefaultLanguage } from '##/config/i18n';

type PageAdapter<P extends PagesFromCodegenSchema> = P extends { head: LanguageFlag }
  ? P extends { head: DefaultLanguage }
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        url: P['url'] extends `/${DefaultLanguage}/${infer _}` ? P['url'] : `/${DefaultLanguage}${P['url']}`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        path: P['path'] extends `${infer _}/${typeof INDEX_TOKEN}` ? typeof INDEX_TOKEN : P['path'];
        root: P['head'] extends DefaultLanguage ? '/' : P['head'];
        lang: DefaultLanguage;
      }
    : {
        path: P['pathWithoutHead'] extends `${infer Head}/${typeof INDEX_TOKEN}` ? Head : P['pathWithoutHead'];
        root: P['nestingLevelTwo'] extends '' ? '/' : P['nestingLevelTwo'];
        lang: P['head'];
        url: P['url'];
      }
  : {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      url: P['url'] extends `/${DefaultLanguage}/${infer _}` ? P['url'] : `/${DefaultLanguage}${P['url']}`;
      path: P['path'] extends `${infer Head}/${typeof INDEX_TOKEN}` ? Head : P['path'];
      root: P['path'] extends `${P['head']}/${typeof INDEX_TOKEN}` ? '/' : P['head'];
      lang: DefaultLanguage;
    };

export default PageAdapter;
// Stryker restore all
/* v8 ignore stop */
