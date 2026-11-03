import { motion } from 'framer-motion'
import { Building2, GraduationCap, Store, Briefcase } from 'lucide-react'

const AUDIENCES = [
  { icon: Building2, title: 'شرکت‌ها', text: 'تأمین منظم ملزومات چاپ با امکان خرید عمده.' },
  { icon: Briefcase, title: 'ادارات', text: 'کارتریج و سرویس دستگاه‌های اداری با هماهنگی سریع.' },
  { icon: GraduationCap, title: 'مدارس', text: 'تأمین اقتصادی ملزومات چاپ و تکثیر.' },
  { icon: Store, title: 'فروشگاه‌ها', text: 'رول حرارتی و تجهیزات صندوق و کارتخوان.' },
]

const ARTICLES = [
  {
    title: 'چطور کارتریج سازگار با پرینتر را پیدا کنیم؟',
    text: 'کد کارتریج معمولاً روی خود کارتریج یا داخل درب پرینتر نوشته شده است. اگر کد را نمی‌دانید، مدل دقیق دستگاه کافی است.',
  },
  {
    title: 'نشانه‌های نیاز به شارژ یا تعویض کارتریج',
    text: 'چاپ کمرنگ، خط‌های عمودی و لکه‌های تکرارشونده معمولاً نشانه تمام شدن تونر یا فرسودگی درام هستند.',
  },
  {
    title: 'انتخاب رول حرارتی مناسب برای فیش‌پرینتر',
    text: 'قبل از خرید، عرض رول (۵۷ یا ۸۰ میلی‌متر) و قطر آن را با مشخصات دستگاه تطبیق دهید.',
  },
]

export default function AboutArticles() {
  return (
    <>
      <section id="about" aria-labelledby="about-title" className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">درباره ما</span>
            <h2 id="about-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
              شریک تأمین شما در حوزه چاپ و ماشین‌های اداری
            </h2>
            <p className="mt-3 leading-8 text-slate-600">
              پندار با تمرکز بر خرید ساده و مطمئن، ملزومات چاپ و خدمات تعمیر را برای کسب‌وکارها در دسترس می‌کند؛ بدون پیچیدگی، با پاسخ‌گویی مستقیم.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-slate-200 bg-surface-muted p-6"
              >
                <Icon className="h-7 w-7 text-navy-700" aria-hidden="true" />
                <h3 className="mt-4 font-extrabold">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-slate-600">{text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="articles" aria-labelledby="articles-title" className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">مقالات</span>
            <h2 id="articles-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
              نکته‌هایی برای خرید و نگهداری بهتر
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <h3 className="text-base font-extrabold leading-8">{a.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{a.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
