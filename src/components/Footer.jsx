import { MessageCircle, Phone, Send } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL, TELEGRAM_URL, waLink } from '../lib/utils'

const LINKS = [
  { label: 'صفحه اصلی', href: '#home' },
  { label: 'محصولات', href: '#products' },
  { label: 'خدمات تعمیرات', href: '#repair' },
  { label: 'مقالات', href: '#articles' },
  { label: 'درباره ما', href: '#about' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 text-navy-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl font-extrabold text-navy-700">
              پ
            </span>
            <span className="text-lg font-extrabold text-white">ماشین‌های اداری پندار</span>
          </a>
          <p className="mt-4 text-sm leading-8 text-navy-200">
            تأمین آسان و مطمئن ملزومات چاپ و ماشین‌های اداری برای شرکت‌ها، ادارات، مدارس و فروشگاه‌ها؛ با امکان استعلام سریع قیمت در واتساپ.
          </p>
        </div>

        <nav aria-label="دسترسی سریع">
          <h2 className="text-sm font-extrabold text-white">دسترسی سریع</h2>
          <ul className="mt-4 space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-[36px] items-center text-sm text-navy-200 transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold text-white">تماس با ما</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="flex min-h-[44px] items-center gap-3 text-navy-100 hover:text-white">
                <Phone className="h-4 w-4 text-navy-300" aria-hidden="true" />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 text-navy-100 hover:text-white">
                <MessageCircle className="h-4 w-4 text-wa" aria-hidden="true" />
                واتساپ
              </a>
            </li>
            <li>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 text-navy-100 hover:text-white">
                <Send className="h-4 w-4 text-sky-300" aria-hidden="true" />
                تلگرام
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-page py-5 text-center text-xs text-navy-300" dir="ltr">
          Copyright © {new Date().getFullYear()} Pendar Office Machines. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
