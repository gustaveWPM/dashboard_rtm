import type { Quantity } from '@rtm/shared-types/Numbers';

// eslint-disable-next-line no-magic-numbers
const shouldShowTagsCommandWidget = (tagsAmount: Quantity): boolean => tagsAmount > 1;

export default shouldShowTagsCommandWidget;
