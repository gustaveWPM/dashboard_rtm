/* v8 ignore start */
// Stryker disable all

import type { LayoutMinimalProps } from '@rtm/shared-types/Next';

import { MAIN_CLS } from '@/components/config/styles/main';
import cn from '@/lib/portable/tailwind/cn';

export default function SignUpLayout({ children }: LayoutMinimalProps) {
  return <main className={cn('flex flex-1 items-center justify-center', MAIN_CLS)}>{children}</main>;
}

// Stryker restore all
/* v8 ignore stop */
