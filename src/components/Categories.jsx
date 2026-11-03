import { motion } from 'framer-motion'
import { BookMarked, Printer, Receipt, Wrench, ArrowLeft } from 'lucide-react'
import { waLink } from '../lib/utils'

const CATEGORIES = [
  {
    title: 'کارتریج و مواد مصرفی',
    desc: 'کارتریج لیزری و جوهرافشان، تونر و درام برای برندهای مختلف.',
    icon: Printer,
    href: '#products',
  },
  {
    title: 'شارژ و تعمیر پرینتر',
    desc: 'شارژ کارتریج، سرویس و رفع عیب انواع پرینتر و دستگاه‌های اداری.',
    icon: Wrench,
    href: '#repair',
  },
  {
    title: 'ملزومات صحافی',
    desc: 'فنر، طلق، مقوا و لوازم صحافی برای دفاتر و مراکز تکثیر.',
    icon: BookMarked,
    href: waLink('سلام، درباره ملزومات صحافی استعلام قیمت می‌خواهم.'),
    external: true,
  },
  {
    title: 'تجهیزات فروشگاهی و رول حرارتی',
    desc: 'رول فیش، لیبل و ملزومات صندوق و کارتخوان برای فروشگاه‌ها.',
    icon: Receipt,
    href: waLink('سلام، درباره رول حرارتی و تجهیزات فروشگاهی استعلام قیمت می‌خواهم.'),
    external: true,
  },
]

export default function Categories() {
  return (
    <section id="services" aria-labelledby="cat-title" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">دسته‌بندی خدمات</span>
          <h2 id="cat-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
            هر آنچه دفتر شما برای چاپ نیاز دارد
          </h2>
          <p className="mt-3 text-slate-600">
            از ملزومات مصرفی تا تعمیرات تخصصی؛ همه در یک تأمین‌کننده.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.li
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              >
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-navy-700 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold text-navy-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy-700">
                    مشاهده
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
