'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const CLOCK_TYPES = {
  BASIC: 'basic',
  FLIP: 'flip',
  DIGITAL: 'digital',
  COMIC: 'comic',
} as const;

export type ClockType = typeof CLOCK_TYPES[keyof typeof CLOCK_TYPES];

export function ClockTypeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = (searchParams.get('type') as ClockType) || CLOCK_TYPES.BASIC;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-2 p-4">
      {Object.entries(CLOCK_TYPES).map(([key, value]) => (
        <Button
          key={value}
          variant={currentType === value ? 'default' : 'outline'}
          onClick={() => {
            router.push(`/?${createQueryString('type', value)}`);
          }}
          className={cn(
            'transition-colors',
            currentType === value && 'bg-primary text-primary-foreground'
          )}
        >
          {key.charAt(0) + key.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  );
} 