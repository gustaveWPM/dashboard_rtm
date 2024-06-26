/* v8 ignore start */
// Stryker disable all

import type { PxValue, Count } from '@rtm/shared-types/Numbers';
import type { ButtonProps } from '@/components/ui/Button';
import type { ComponentProps, ReactElement } from 'react';

import { DotsHorizontalIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { DropdownMenuTrigger, DropdownMenu } from '@radix-ui/react-dropdown-menu';
import getRefCurrentPtr from '@rtm/shared-lib/portable/react/getRefCurrentPtr';
import { buttonVariants } from '@/components/ui/Button';
import { forwardRef, useState, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import cn from '@/lib/portable/tailwind/cn';
import { i18ns } from '##/config/i18n';
import Link from 'next/link';

import { DropdownMenuContent } from './DropdownMenu';

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return <nav className={cn('mx-auto flex w-full justify-center', className)} aria-label={scopedT('pagination')} role="navigation" {...props} />;
};
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(({ className, ...props }, ref) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li className={className} ref={ref} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = ComponentProps<typeof Link> & {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'>;

const PaginationLink = ({ size = 'icon', className, isActive, ...props }: PaginationLinkProps) => (
  <Link
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return (
    <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label={scopedT('prev')} size="default" {...props}>
      <ChevronLeftIcon className="h-5 w-5 rtl:hidden" />
      <ChevronRightIcon className="h-5 w-5 ltr:hidden" />
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => {
  const scopedT = useScopedI18n(i18ns.vocab);

  return (
    <PaginationLink className={cn('h-8 gap-1 px-3', className)} aria-label={scopedT('next')} size="default" {...props}>
      <ChevronRightIcon className="h-5 w-5 rtl:hidden" />
      <ChevronLeftIcon className="h-5 w-5 ltr:hidden" />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  dropdownContentClassName,
  pageNumberIndicator,
  isBottomWidget,
  dropdownItems,
  className,
  ...props
}: {
  dropdownContentClassName?: string;
  dropdownItems: ReactElement[];
  pageNumberIndicator?: Count;
  isBottomWidget?: boolean;
} & ComponentProps<'button'>) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line no-magic-numbers
  if (dropdownItems.length === 0) return null;

  const onOpenChange = (opened: boolean) => setIsOpened(opened);

  return (
    <DropdownMenu onOpenChange={onOpenChange} open={isOpened}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md border-none font-bold hover:bg-accent hover:text-accent-foreground',
            {
              'bg-accent text-accent-foreground': isOpened
            },
            className
          )}
          {...props}
        >
          {pageNumberIndicator !== undefined ? <span>{pageNumberIndicator}</span> : <DotsHorizontalIcon className="h-4 w-4" />}
          <span className="sr-only">{scopedT('more-pages')}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          if (isBottomWidget) setIsOpened(false);
          if (!(e.target instanceof HTMLAnchorElement)) return;

          const SCROLL_OFFSET_Y: PxValue = 35;
          const dropdownContentInstance = getRefCurrentPtr(dropdownContentRef);
          if (!dropdownContentInstance) return;
          const targetTitle = e.target.title;

          let newActivePageNodeIndex = 0;
          const links = dropdownContentInstance.querySelectorAll('a');
          for (let i = 0; i < links.length; i++) {
            if (links[i].title === targetTitle) break;
            newActivePageNodeIndex++;
          }

          let scrollDist = 0;
          for (let i = 0; i < newActivePageNodeIndex; i++) scrollDist += links[i].getBoundingClientRect().height;
          dropdownContentInstance.scrollTo({ top: scrollDist - SCROLL_OFFSET_Y, behavior: 'smooth' });
        }}
        onAnimationEnd={() => {
          if (!isOpened) return;
          const dropdownContentInstance = getRefCurrentPtr(dropdownContentRef);
          if (!dropdownContentInstance) return;

          const SCROLL_OFFSET_Y: PxValue = 4;

          let activePageNodeIndex = 0;
          const links = dropdownContentInstance.querySelectorAll('a');
          for (let i = 0; i < links.length; i++) {
            if (links[i].getAttribute('aria-current') === 'page') break;
            activePageNodeIndex++;
          }

          let scrollDist = 0;
          for (let i = 0; i < activePageNodeIndex; i++) scrollDist += links[i].getBoundingClientRect().height;
          // eslint-disable-next-line no-magic-numbers
          if (activePageNodeIndex !== 0) scrollDist += SCROLL_OFFSET_Y;
          dropdownContentInstance.scrollTo({ behavior: 'smooth', top: scrollDist });
        }}
        className={cn('max-h-[228px] w-fit overflow-y-auto', dropdownContentClassName, {
          'max-h-[210px] overflow-y-auto': pageNumberIndicator
        })}
        onCloseAutoFocus={(e) => {
          if (isBottomWidget) e.preventDefault();
        }}
        ref={dropdownContentRef}
      >
        {dropdownItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

export { PaginationPrevious, PaginationEllipsis, PaginationContent, PaginationLink, PaginationItem, PaginationNext, Pagination };

// Stryker restore all
/* v8 ignore stop */
