import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageCategory } from '@/types/LandingPage';
import type { Index } from '@rtm/shared-types/Numbers';

import {
  throwIfForbiddenToUseIndexErrorLpCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithIndexSuffix,
  LANDING_PAGES_FOLDER
} from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageCategoryFromStr(flattenedPath: string): UnknownLandingPageCategory {
  // eslint-disable-next-line no-magic-numbers
  const categBuilder = (flattenedPath: string, firstSlashIndex: Index) => flattenedPath.substring(0, firstSlashIndex);

  const firstSlashIndex = flattenedPath.indexOf('/');

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildLandingPageCategoryFromLpObj(lp: DocumentToCompute): UnknownLandingPageCategory {
  const { sourceFilePath, flattenedPath } = lp._raw;

  throwIfForbiddenToUseIndexErrorLpCtx(sourceFilePath);

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(transformedFlattenedPath, LANDING_PAGES_FOLDER);
  const landingPageCategory = buildLandingPageCategoryFromStr(path);
  return landingPageCategory;
}

const buildLandingPageCategory = (lp: DocumentToCompute): UnknownLandingPageCategory => buildLandingPageCategoryFromLpObj(lp);

export default buildLandingPageCategory;
