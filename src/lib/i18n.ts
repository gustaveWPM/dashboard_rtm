import { LanguageFlag } from '@/config/i18n';
import { fallbackLng as DEFAULT_LANGUAGE, languages as LANGUAGES } from '@/i18n/settings';
import PostBase from '@/types/BlogPostAbstractions';
import { Path } from '@/types/Next';
import { gsub, indexOfNthOccurrence } from './str';

const isValidLanguageFlag = (key: string): boolean => LANGUAGES.includes(key);

function getBlogPostLanguageFlagFromStr(sourceFileDir: string): LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) {
    return DEFAULT_LANGUAGE;
  }

  const envelopeBeginSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 3);

  if (envelopeBeginSlashIndex !== -1) {
    const langFlag =
      envelopeEndSlashIndex === -1
        ? sourceFileDir.substring(envelopeBeginSlashIndex + 1)
        : sourceFileDir.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    if (isValidLanguageFlag(langFlag)) return langFlag as LanguageFlag;
  }
  return DEFAULT_LANGUAGE;
}

function getBlogPostLanguageFlagFromPostObj(post: PostBase): LanguageFlag {
  const { sourceFileDir } = post._raw;
  return getBlogPostLanguageFlagFromStr(sourceFileDir);
}

export function getBlogPostPathWithoutI18nPart(post: PostBase): Path {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  return gsub(post.url, `/${langFlag}/`, '/');
}

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

export function getPathnameWithoutI18nPart(pathname: string): Path {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);
  const pathnameWithouti18n = secondSlashIndex === -1 ? '/' : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameI18nPart(pathname: string): LanguageFlag {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);
  const pathnameI18nPart = secondSlashIndex === -1 ? pathname.substring(1) : pathname.substring(1, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nPart)) return DEFAULT_LANGUAGE;
  return pathnameI18nPart as LanguageFlag;
}