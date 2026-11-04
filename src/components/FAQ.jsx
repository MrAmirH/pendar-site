import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { FAQS } from '../data/faq'
import { waLink } from '../lib/utils'

function FaqItem({ item, index, isOpen, onToggle, baseId, buttonRef }) {
  const buttonId = `${baseId}-btn`
  const panelId = `${baseId}-panel`

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`rounded-2xl border border-s-4 bg-white transition-all duration-300 hover:shadow-lift ${
        isOpen
          ? 'border-navy-200 border-s-navy-600 shadow-lift'
          : 'border-slate-200 border-s-slate-200 shadow-soft'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          ref={buttonRef}
          type="button"
          data-faq-trigger
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex min-h-[56px] w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-start text-sm font-extrabold sm:text-base"
        >
          <span>{item.q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-navy-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-8 text-slate-600">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const uid = useId()
  const listRef = useRef(null)

  // FAQPage structured data for search engine rich results.
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  // Arrow / Home / End keys move focus between question buttons.
  const handleKeyDown = (event) => {
    const triggers = Array.from(listRef.current.querySelectorAll('[data-faq-trigger]'))
    const current = triggers.indexOf(document.activeElement)
    if (current === -1) return

    const targets = {
      ArrowDown: (current + 1) % triggers.length,
      ArrowUp: (current - 1 + triggers.length) % triggers.length,
      Home: 0,
      End: triggers.length - 1,
    }
    if (!(event.key in targets)) return
    event.preventDefault()
    triggers[targets[event.key]].focus()
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y border-t border-slate-200 bg-white">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">سوالات متداول</span>
          <h2 id="faq-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
            پاسخ پرسش‌های رایج شما
          </h2>
          <p className="mt-3 text-slate-600">پاسخ سؤالتان را پیدا نکردید؟ مستقیم از ما بپرسید.</p>
        </motion.div>

        <ul ref={listRef} onKeyDown={handleKeyDown} className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQS.map((item, index) => (
            <FaqItem
              key={item.q}
              item={item}
              index={index}
              baseId={`${uid}-${index}`}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ul>

        <div className="mt-8 text-center">
          <a
            href={waLink('سلام، یک سؤال دارم.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            پرسش در واتساپ
          </a>
        </div>
      </div>
    </section>
  )
}
