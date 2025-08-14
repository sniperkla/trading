import { NextResponse } from 'next/server'
import { SUPPORTED, DEFAULT_LANG } from './i18n'

const botUserAgents = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandex',
  'sogou',
  'exabot',
  'facebot',
  'ia_archiver',
]

// Helper: get language from Accept-Language header
function getLangFromAcceptLanguage(header) {
  if (!header) return DEFAULT_LANG
  const lower = header.toLowerCase()
  if (lower.includes('th')) return 'th'
  if (lower.includes('ru')) return 'ru'
  if (lower.includes('zh')) return 'zh'
  if (lower.includes('hi')) return 'hi'
  return 'en'
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const locales = ['en', 'th', 'hi', 'ru', 'zh']

  // Skip redirect for bots
  const ua = request.headers.get('user-agent')?.toLowerCase() || ''
  if (botUserAgents.some((bot) => ua.includes(bot))) {
    return NextResponse.next()
  }

  // If already on a locale path, do nothing
  if (locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  // Get user's preferred language from Accept-Language header
  const acceptLang = request.headers.get('accept-language')
  const lang = getLangFromAcceptLanguage(acceptLang)

  // Otherwise, redirect to detected locale
  return NextResponse.redirect(new URL(`/${lang}${pathname === '/' ? '' : pathname}`, request.url))
}

export const config = {
  matcher: [
    /*
      Match all paths except for:
      - /_next
      - /static
      - /api
      - /favicon.ico
      - already prefixed with a supported lang
    */
    '/((?!_next|static|api|favicon.ico|en|th|zh|hi|ru).*)',
    '/', // Add this line to match the root path explicitly
  ],
}