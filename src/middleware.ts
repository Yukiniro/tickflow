import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配除了以下路径之外的所有路径名：
  // - 以 `/api`, `/trpc`, `/_next` 或 `/_vercel` 开头的路径
  // - 包含点号的路径（例如 `favicon.ico`）
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}; 