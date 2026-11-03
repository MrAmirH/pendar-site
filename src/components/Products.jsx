import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, PackageSearch, Printer, Receipt, BookMarked, X } from 'lucide-react'
import { FEATURED_COUNT, PRODUCTS } from '../data/products'
import { normalize, waLink } from '../lib/utils'

const ICONS = {
  'تجهیزات فروشگاهی': Receipt,
  'ملزومات صحافی': BookMarked,
}

function ProductCard({ product, index }) {
  const Icon = ICONS[product.tag] || Printer
  const compat =
    product.compatText ||
    `سازگار با ${product.models.slice(0, 3).join('، ')}${product.models.length > 3 ? ' و …' : ''}`

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index, 7) * 0.04, ease: 'easeOut' }}
      className="h-full"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
        {/* image placeholder */}
        <div
          className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100"
          role="img"
          aria-label={`تصویر ${product.title}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(#9DB3E0 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          <span className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white text-navy-700 shadow-soft transition duration-300 group-hover:scale-105">
            <Icon className="h-10 w-10" aria-hidden="true" />
          </span>
          <span className="absolute start-3 top-3 rounded-full bg-navy-900 px-2.5 py-1 text-[11px] font-bold text-white" dir="auto">
            {product.brand}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-semibold text-navy-500">{product.tag}</span>
          <h3 className="mt-1 text-base font-extrabold text-navy-900">{product.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-600" dir="auto">
            {compat}
          </p>
          <a
            href={waLink(`سلام، لطفاً قیمت «${product.title}» را اعلام کنید.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-4 w-full"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            استعلام قیمت در واتساپ
          </a>
        </div>
      </article>
    </motion.li>
  )
}

export default function Products({ query, onClear }) {
  const q = normalize(query)

  const results = useMemo(() => {
    if (!q) return PRODUCTS.slice(0, FEATURED_COUNT)
    return PRODUCTS.filter((p) =>
      normalize([p.title, p.code, p.brand, p.tag, ...p.models, p.compatText || ''].join(' ')).includes(q)
    )
  }, [q])

  return (
    <section id="products" aria-labelledby="products-title" className="section-y bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">{q ? 'نتایج جستجو' : 'محصولات ویژه'}</span>
            <h2 id="products-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
              {q ? (
                <>
                  نتایج برای «<span dir="auto" className="text-navy-700">{query.trim()}</span>»
                </>
              ) : (
                'پرفروش‌ترین کارتریج‌ها و ملزومات'
              )}
            </h2>
            <p className="mt-2 text-sm text-slate-600" aria-live="polite">
              {q
                ? `${results.length.toLocaleString('fa-IR')} محصول سازگار پیدا شد.`
                : 'برای قیمت روز و موجودی، روی دکمه واتساپ هر محصول بزنید.'}
            </p>
          </div>
          {q && (
            <button type="button" onClick={onClear} className="btn border border-slate-300 bg-white text-navy-900 hover:bg-surface-alt">
              <X className="h-4 w-4" aria-hidden="true" />
              پاک کردن جستجو
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-slate-300 bg-surface-muted p-8 text-center"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700">
              <PackageSearch className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">مدلی با این نام پیدا نشد</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              ممکن است کارتریج این مدل موجود باشد ولی در لیست نمایشی نیامده باشد. مدل دستگاه را در واتساپ برای ما بفرستید.
            </p>
            <a
              href={waLink(`سلام، دنبال کارتریج پرینتر مدل ${query.trim()} هستم. موجود دارید؟`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              پرسش درباره این مدل در واتساپ
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
