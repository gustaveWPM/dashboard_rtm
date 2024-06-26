/* v8 ignore start */
// Stryker disable all

'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import cn from '@/lib/portable/tailwind/cn';
import { forwardRef } from 'react';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
  // eslint-disable-next-line no-magic-numbers
>(({ align = 'center', sideOffset = 4, className, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      sideOffset={sideOffset}
      align={align}
      ref={ref}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { PopoverTrigger, PopoverContent, PopoverAnchor, Popover };

// Stryker restore all
/* v8 ignore stop */
