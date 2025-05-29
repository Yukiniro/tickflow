'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { GithubLink } from './github-link';
import { TimeFormatToggle } from './time-format-toggle';
import { useTime } from '@/hooks/use-time';

const routes = [
  {
    name: '基础时钟',
    path: '/basic',
  },
  {
    name: '翻页时钟',
    path: '/flip',
  },
  {
    name: '数字手表',
    path: '/digital',
  },
  {
    name: '漫画字体',
    path: '/comic',
  },
] as const;

export function Nav() {
  const pathname = usePathname();
  const { is24Hour, toggleTimeFormat, mounted } = useTime();

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-semibold tracking-tight">TickFlow</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-6 mr-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === route.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {route.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <TimeFormatToggle is24Hour={is24Hour} onToggle={toggleTimeFormat} />
            <ThemeToggle />
            <GithubLink />
          </div>
        </div>
      </div>
    </nav>
  );
} 