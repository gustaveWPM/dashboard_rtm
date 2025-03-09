/* v8 ignore start */
// Stryker disable all

import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { ComponentType } from 'react';

import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

import type { MediaKey, Author } from './types/authors';

export const authors = {
  Gustave: {
    medias: {
      linkedin: 'https://www.linkedin.com/in/terry-a-davis',
      instagram: 'https://www.instagram.com/justinbieber',
      twitter: 'https://twitter.com/realdonaldtrump',
      github: 'https://github.com/gustaveWPM'
    },

    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-54.jpeg'
  },

  Arnaud: {
    profilePictureUrl: '/assets/medias/img/dev/placeholders/placeholder-55.jpeg'
  }
} as const satisfies Record<AuthorName, Author>;

export const AUTHORS_MEDIAS_MAPPING = {
  instagram: InstagramLogoIcon,
  linkedin: LinkedInLogoIcon,
  twitter: TwitterLogoIcon,
  github: GitHubLogoIcon
} as const satisfies Record<MediaKey, ComponentType<IconProps>>;

type AuthorName = string;

// Stryker restore all
/* v8 ignore stop */
