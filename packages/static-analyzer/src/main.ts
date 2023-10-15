import path from 'path';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX } from './config';
import { BUGTRACKER_URL, DOC_URL, STATIC_ANALYSIS_DONE } from './config/vocab';
import ArgumentsValidatorError from './errors/exceptions/ArgumentsValidatorError';
import BuilderError from './errors/exceptions/BuilderError';
import FeedbackError from './errors/exceptions/FeedbackError';
import { foldFeedbacks } from './lib/feedbacksMerge';
import retrieveI18nBlogCategoriesJSONMetadatas from './metadatas-builders/retrieveI18nBlogCategoriesJSONMetadatas';
import retrieveMetadatas from './metadatas-builders/retrieveMetadatas';
import declaredBlogArchitectureValidator from './validators/architectureMatching';
import validateArgumentsThenReturnRetrievedValuesFromArgs from './validators/arguments';
import declaredI18nValidator from './validators/i18nMatching';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError];

const moveToCallerDirectory = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX));

/**
 * @throws {FeedbackError}
 */
function processStaticAnalysis() {
  moveToCallerDirectory();
  try {
    const retrievedValuesFromArgs = validateArgumentsThenReturnRetrievedValuesFromArgs();
    const { POSTS_FOLDER, I18N_LOCALES_SCHEMA_FILEPATH, BLOG_CONFIG_FILEPATH } = retrievedValuesFromArgs;
    const [metadatasFromSys, declaredMetadatas] = retrieveMetadatas(retrievedValuesFromArgs);
    const i18nBlogCategoriesJSON = retrieveI18nBlogCategoriesJSONMetadatas(I18N_LOCALES_SCHEMA_FILEPATH);

    const blogArchitectureValidatorFeedback = declaredBlogArchitectureValidator(metadatasFromSys, declaredMetadatas, BLOG_CONFIG_FILEPATH);

    const sysBlogSlugsValidatorFeedback = sysBlogSlugsValidator(POSTS_FOLDER);

    let localesValidatorFeedback = '';
    if (!retrievedValuesFromArgs.SKIP_LOCALES_INFOS) {
      const localesFolder = path.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
      localesValidatorFeedback = localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
    }

    const i18nValidatorFeedback = declaredI18nValidator(metadatasFromSys, i18nBlogCategoriesJSON, I18N_LOCALES_SCHEMA_FILEPATH);

    const feedbacks = foldFeedbacks(
      blogArchitectureValidatorFeedback,
      sysBlogSlugsValidatorFeedback,
      localesValidatorFeedback,
      i18nValidatorFeedback
    );
    if (feedbacks) throw new FeedbackError(feedbacks);

    console.log(STATIC_ANALYSIS_DONE);
  } catch (error) {
    const isErrorHandled = HANDLED_ERRORS_TYPES.some((errorType) => error instanceof errorType);

    if (isErrorHandled) {
      const msg = (error as Error).message + (!(error instanceof FeedbackError) ? '\n' : '');
      console.error(msg);
    } else {
      console.error('Unhandled error!' + '\n' + error + '\n\n' + `RTFM: ${DOC_URL}` + '\n' + `Bugtracker: ${BUGTRACKER_URL}` + '\n');
    }

    process.exit(1);
  }
}

processStaticAnalysis();
