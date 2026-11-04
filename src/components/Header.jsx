import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MessageCircle, X } from 'lucide-react'
import { waLink } from '../lib/utils'

const NAV = [
  { label: 'صفحه اصلی', href: '#home' },
  { label: 'محصولات', href: '#products' },
  { label: 'خدمات تعمیرات', href: '#repair' },
  { label: 'نمونه‌کارها', href: '#gallery' },
  { label: 'مقالات', href: '#articles' },
  { label: 'درباره ما', href: '#about' },
  { label: 'سوالات متداول', href: '#faq' },
  { label: 'تماس با ما', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'border-slate-200/70 bg-white/75 shadow-glass'
          : 'border-transparent bg-white/55'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <a href="#home" className="flex items-center gap-3" aria-label="ماشین‌های اداری پندار - صفحه اصلی">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 text-xl font-extrabold text-white shadow-soft">
            پ
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold text-navy-900">پندار</span>
            <span className="block text-[11px] font-medium text-slate-500">ماشین‌های اداری</span>
          </span>
        </a>

        <nav aria-label="منوی اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-navy-50 hover:text-navy-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink('سلام، می‌خواهم سفارش بدهم.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa !px-4"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">سفارش در واتساپ</span>
            <span className="sm:hidden">واتساپ</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            className="grid h-11 w-11 place-items-center rounded-xl text-navy-900 transition hover:bg-navy-50 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="منوی موبایل"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/90 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page grid gap-1 py-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-navy-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
