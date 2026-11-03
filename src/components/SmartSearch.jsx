import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { SUGGESTED_MODELS } from '../data/products'

export default function SmartSearch({ onSearch }) {
  const [value, setValue] = useState('')

  const submit = (q) => {
    const text = q.trim()
    onSearch(text)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      aria-labelledby="search-title"
      className="relative z-10 -mt-16 pb-4 sm:-mt-20"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-5 shadow-lift sm:p-8"
        >
          <h2 id="search-title" className="text-lg font-extrabold text-navy-900 sm:text-xl">
            جستجوی کارتریج بر اساس مدل پرینتر
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            مدل دستگاه را وارد کنید؛ کارتریج سازگار را پیدا می‌کنیم.
          </p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              submit(value)
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <label htmlFor="printer-model" className="sr-only">
                مدل پرینتر
              </label>
              <Search
                className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="printer-model"
                type="search"
                inputMode="search"
                autoComplete="off"
                dir="auto"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="مثلاً P1102 یا LBP6020"
                className="field !ps-12 !py-3.5 text-base"
              />
            </div>
            <button type="submit" className="btn-navy !px-8 !py-3.5 text-base">
              جستجو
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">پرتکرار:</span>
            {SUGGESTED_MODELS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setValue(m)
                  submit(m)
                }}
                className="min-h-[36px] rounded-full border border-slate-200 bg-surface-muted px-3 font-semibold text-navy-700 transition hover:border-navy-300 hover:bg-navy-50"
                dir="ltr"
              >
                {m}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
