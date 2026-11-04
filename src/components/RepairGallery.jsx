import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cog, Copy, Droplets, MessageCircle, Printer, ScanLine, Wrench, X } from 'lucide-react'
import { REPAIRS, REPAIR_FILTERS } from '../data/repairs'
import { waLink } from '../lib/utils'

const CATEGORY_ICON = {
  laser: Printer,
  inkjet: Droplets,
  copier: Copy,
  scanner: ScanLine,
}

// Real photo when available, otherwise a branded placeholder with a "sample" badge.
function Thumb({ item, className = '' }) {
  const Icon = CATEGORY_ICON[item.category] ?? Cog

  if (item.image) {
    return <img src={item.image} alt={item.title} loading="lazy" className={`object-cover ${className}`} />
  }

  return (
    <div
      className={`relative grid place-items-center bg-gradient-to-br from-navy-700 to-navy-900 ${className}`}
      role="img"
      aria-label={item.title}
    >
      <Icon className="h-16 w-16 text-white/85" aria-hidden="true" />
      <Wrench className="absolute bottom-3 end-3 h-6 w-6 text-wa" aria-hidden="true" />
      <span className="absolute start-3 top-3 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-navy-100 ring-1 ring-inset ring-white/20">
        نمونه
      </span>
    </div>
  )
}

function Lightbox({ item, onClose }) {
  const dialogRef = useRef(null)

  // Escape closes, Tab is trapped inside the dialog, page scroll is locked.
  useEffect(() => {
    const dialog = dialogRef.current
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialog.querySelectorAll('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
      >
        <div className="relative">
          <Thumb item={item} className="aspect-[4/3] max-h-72 w-full" />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            autoFocus
            className="absolute end-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy-900 shadow-soft transition hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          <span className="eyebrow">{item.device}</span>
          <h3 className="mt-3 text-xl font-extrabold">{item.title}</h3>

          <dl className="mt-5 space-y-4 text-sm leading-8">
            <div>
              <dt className="font-extrabold text-navy-700">مشکل دستگاه</dt>
              <dd className="text-slate-600">{item.issue}</dd>
            </div>
            <div>
              <dt className="font-extrabold text-navy-700">اقدام انجام‌شده</dt>
              <dd className="text-slate-600">{item.work}</dd>
            </div>
            <div>
              <dt className="font-extrabold text-navy-700">نتیجه</dt>
              <dd className="text-slate-600">{item.result}</dd>
            </div>
          </dl>

          <a
            href={waLink(`سلام، دستگاه من مشکلی مشابه «${item.title}» دارد. لطفاً راهنمایی کنید.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-6 w-full sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            مشکل مشابه دارم، مشاوره در واتساپ
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RepairGallery() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const triggerRef = useRef(null)

  const items = useMemo(
    () => (filter === 'all' ? REPAIRS : REPAIRS.filter((repair) => repair.category === filter)),
    [filter],
  )

  const open = (item, event) => {
    triggerRef.current = event.currentTarget
    setSelected(item)
  }

  // Return focus to the card that opened the dialog.
  const close = useCallback(() => {
    setSelected(null)
    triggerRef.current?.focus()
  }, [])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y bg-navy-50/60">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">نمونه‌کارهای تعمیرات</span>
          <h2 id="gallery-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
            نمونه‌ای از تعمیرات انجام‌شده
          </h2>
          <p className="mt-3 text-slate-600">
            مشکلات رایج پرینتر، فتوکپی و اسکنر در ماشین‌های اداری و راه‌حل آن‌ها.
          </p>
        </motion.div>

        <div role="group" aria-label="فیلتر دسته‌بندی" className="mt-8 flex flex-wrap justify-center gap-2">
          {REPAIR_FILTERS.map((option) => {
            const active = filter === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={active}
                className={`relative min-h-[44px] rounded-full px-4 text-sm font-bold ring-1 ring-inset transition-colors ${
                  active ? 'text-white ring-navy-700' : 'bg-white text-slate-600 ring-slate-200 hover:text-navy-700'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-navy-700"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{option.label}</span>
              </button>
            )
          })}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  onClick={(event) => open(item, event)}
                  className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-start shadow-soft transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                >
                  <div className="overflow-hidden">
                    <Thumb
                      item={item}
                      className="h-44 w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="block p-5">
                    <span className="text-xs font-bold text-navy-600">{item.device}</span>
                    <span className="mt-1 block text-base font-extrabold leading-8">{item.title}</span>
                    <span className="mt-1 block text-sm leading-7 text-slate-600">{item.result}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <AnimatePresence>{selected && <Lightbox item={selected} onClose={close} />}</AnimatePresence>
    </section>
  )
}
