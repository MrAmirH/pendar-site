import { motion } from 'framer-motion'
import { ArrowLeft, BadgePercent, Headset, Wrench } from 'lucide-react'
import { waLink } from '../lib/utils'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function PrinterIllustration() {
  return (
    <svg
      viewBox="0 0 420 360"
      role="img"
      aria-label="تصویر مفهومی یک پرینتر اداری"
      className="h-auto w-full max-w-md drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCE6F8" />
        </linearGradient>
        <linearGradient id="tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F5FB0" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      {/* paper out */}
      <rect x="110" y="30" width="200" height="130" rx="8" fill="#FFFFFF" />
      <rect x="130" y="52" width="120" height="8" rx="4" fill="#C9D6EF" />
      <rect x="130" y="72" width="160" height="8" rx="4" fill="#E6ECF8" />
      <rect x="130" y="92" width="140" height="8" rx="4" fill="#E6ECF8" />
      <rect x="130" y="112" width="90" height="8" rx="4" fill="#E6ECF8" />
      {/* body */}
      <rect x="50" y="140" width="320" height="150" rx="22" fill="url(#body)" />
      <rect x="50" y="140" width="320" height="34" rx="17" fill="#C9D6EF" opacity=".6" />
      <rect x="90" y="196" width="240" height="14" rx="7" fill="#0F172A" opacity=".85" />
      {/* panel */}
      <rect x="86" y="228" width="70" height="30" rx="8" fill="#0F172A" />
      <circle cx="108" cy="243" r="5" fill="#25D366" />
      <rect x="118" y="239" width="28" height="8" rx="4" fill="#3F5FB0" />
      <circle cx="320" cy="243" r="7" fill="#25D366" />
      {/* tray */}
      <rect x="85" y="282" width="250" height="46" rx="12" fill="url(#tray)" />
      <rect x="105" y="298" width="210" height="8" rx="4" fill="#FFFFFF" opacity=".35" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
      aria-labelledby="hero-title"
    >
      {/* abstract shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 start-[-8rem] h-[28rem] w-[28rem] rounded-full bg-navy-600/40 blur-3xl" />
        <div className="absolute -bottom-40 end-[-6rem] h-[26rem] w-[26rem] rounded-full bg-navy-500/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container-page grid items-center gap-12 pb-28 pt-14 sm:pt-20 lg:grid-cols-2 lg:gap-8 lg:pb-36 lg:pt-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-navy-100 ring-1 ring-inset ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-wa" aria-hidden="true" />
            تأمین‌کننده ملزومات چاپ برای شرکت‌ها و سازمان‌ها
          </motion.span>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-5 text-3xl font-extrabold leading-[1.45] sm:text-4xl lg:text-5xl lg:leading-[1.4]"
          >
            تأمین آسان و مطمئن ملزومات چاپ و ماشین‌های اداری
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-8 text-navy-100/90 sm:text-lg">
            کارتریج، رول حرارتی، ملزومات صحافی و تجهیزات فروشگاهی را یک‌جا و برای خرید عمده تهیه کنید؛
            و اگر دستگاهتان خراب شد، تعمیر و سرویس سریع را به ما بسپارید.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink('سلام، می‌خواهم استعلام قیمت بگیرم.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa !px-7 !py-3.5 text-base"
            >
              استعلام قیمت
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#repair" className="btn-ghost-light !px-7 !py-3.5 text-base">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              درخواست تعمیر
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-10 grid gap-3 text-sm text-navy-100/90 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4 text-wa" aria-hidden="true" />
              قیمت ویژه خرید عمده و سازمانی
            </li>
            <li className="flex items-center gap-2">
              <Headset className="h-4 w-4 text-wa" aria-hidden="true" />
              مشاوره انتخاب کارتریج مناسب
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-md justify-center"
          aria-hidden="false"
        >
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-navy-500/40 to-transparent blur-2xl" aria-hidden="true" />
          <div className="relative animate-float motion-reduce:animate-none">
            <PrinterIllustration />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
