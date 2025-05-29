'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">TickFlow</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                  pathname === route.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  'h-9 px-4 py-2'
                )}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 