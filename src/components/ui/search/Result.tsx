import type { AnchorHTMLAttributes as ReactAnchorHTMLAttributes, KeyboardEventHandler } from 'react';
import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { LinkProps } from 'next/link';

import hrefAndPathnameExactMatch from '@/lib/notPortable/str/hrefAndPathnameExactMatch';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';
import cn from '@/lib/portable/tailwind/cn';
import { forwardRef } from 'react';
import Link from 'next/link';

import { CardContent, CardHeader, CardTitle, Card } from '../Card';

interface ResultProps extends Partial<WithClassname> {
  navigationMenuItemProps?: {
    onKeyDown?: KeyboardEventHandler<HTMLAnchorElement>;
    className?: string;
    key: string;
  };
  metaTitle: string;
  excerpt: string;
  href: AppPath;
}

const Result = forwardRef<HTMLAnchorElement, Omit<ReactAnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & ResultProps & LinkProps>(
  ({ navigationMenuItemProps, className, metaTitle, excerpt, href, ...props }, ref) => {
    const currentPathname = usePathname();
    const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

    const inner = (
      <Link
        className={cn(
          'search-menu-result-link',
          'flex h-fit w-full flex-col transition-transform duration-300 hover:delay-0 hover:duration-100 focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125',
          {
            'pointer-events-none opacity-50': exactMatch
          },
          className
        )}
        aria-current={exactMatch ? 'page' : undefined}
        href={href}
        ref={ref}
        {...props}
      >
        <Card className="h-fit overflow-hidden rounded shadow-lg transition-[box-shadow] duration-300 hover:shadow-xl focus:shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between" titleType="h3">
              {metaTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          </CardContent>
        </Card>
      </Link>
    );

    if (navigationMenuItemProps === undefined) return inner;

    return (
      <NavigationMenu.Item className={navigationMenuItemProps.className} key={navigationMenuItemProps.key}>
        <NavigationMenu.Link onKeyDown={navigationMenuItemProps.onKeyDown} asChild>
          {inner}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  }
);

Result.displayName = 'Result';

export default Result;
