/* v8 ignore start */
// Stryker disable all

import type { Href } from '@rtm/shared-types/Next';

export type Author = {
  medias?: {
    instagram?: Href;
    linkedin?: Href;
    twitter?: Href;
    github?: Href;
  };

  profilePictureUrl: Href;
};

export type MediaKey = keyof Required<Required<Author>['medias']>;

// Stryker restore all
/* v8 ignore stop */
