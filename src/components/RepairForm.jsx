import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Loader2, MessageCircle, ShieldCheck, Wrench } from 'lucide-react'
import { toEnDigits, waLink } from '../lib/utils'

const DEVICE_TYPES = [
  'پرینتر لیزری',
  'پرینتر جوهرافشان',
  'کپی و اسکنر / مولتی‌فانکشن',
  'دستگاه فکس',
  'پرینتر حرارتی / لیبل',
  'سایر دستگاه‌های اداری',
]

const INITIAL = { name: '', phone: '', device: '', issue: '' }

function validate(v) {
  const errors = {}
  if (v.name.trim().length < 3) errors.name = 'نام را حداقل با ۳ حرف وارد کنید.'
  const phone = toEnDigits(v.phone).replace(/[\s-]/g, '')
  if (!/^(\+98|0098|98|0)?9\d{9}$/.test(phone) && !/^0\d{10}$/.test(phone)) {
    errors.phone = 'شماره تماس معتبر وارد کنید؛ مثل 09123456789.'
  }
  if (!v.device) errors.device = 'نوع دستگاه را انتخاب کنید.'
  if (v.issue.trim().length < 10) errors.issue = 'مشکل را کمی بیشتر توضیح دهید (حداقل ۱۰ حرف).'
  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy-900">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function RepairForm() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [ticket, setTicket] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`rf-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus('loading')
    // Simulated request — replace with a real API call when you have a backend.
    setTimeout(() => {
      setTicket(`PN-${Math.floor(10000 + Math.random() * 90000)}`)
      setSubmitted(values)
      setValues(INITIAL)
      setStatus('success')
    }, 1200)
  }

  const reset = () => {
    setStatus('idle')
    setSubmitted(null)
    setErrors({})
  }

  const aria = (key) => ({
    'aria-invalid': errors[key] ? 'true' : 'false',
    'aria-describedby': errors[key] ? `rf-${key}-error` : undefined,
  })

  const errClass = (key) => (errors[key] ? '!border-red-400 focus:!ring-red-200' : '')

  return (
    <section id="repair" aria-labelledby="repair-title" className="section-y">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <span className="eyebrow">خدمات تعمیرات</span>
            <h2 id="repair-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
              دستگاه خراب شده؟ درخواست تعمیر ثبت کنید
            </h2>
            <p className="mt-3 leading-8 text-slate-600">
              مشکل را برای ما بنویسید؛ کارشناس فنی با شما تماس می‌گیرد، هزینه و زمان تقریبی را اعلام می‌کند و هماهنگی بعدی را انجام می‌دهد.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                [Wrench, 'تعمیر و سرویس انواع پرینتر، کپی و فکس'],
                [Clock, 'پیگیری سریع درخواست‌ها'],
                [ShieldCheck, 'اعلام شفاف هزینه قبل از شروع کار'],
              ].map(([Icon, text]) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-navy-900">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lift sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-4 text-center"
                  >
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-wa-soft text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold">درخواست شما ثبت شد</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      کد پیگیری شما{' '}
                      <strong className="rounded-md bg-navy-50 px-2 py-0.5 text-navy-700" dir="ltr">
                        {ticket}
                      </strong>{' '}
                      است. برای سرعت بیشتر می‌توانید جزئیات را در واتساپ هم برای ما بفرستید.
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <a
                        href={waLink(
                          `سلام، درخواست تعمیر ${ticket}\nنام: ${submitted?.name}\nتلفن: ${submitted?.phone}\nدستگاه: ${submitted?.device}\nمشکل: ${submitted?.issue}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wa"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        ارسال جزئیات در واتساپ
                      </a>
                      <button type="button" onClick={reset} className="btn border border-slate-300 bg-white hover:bg-surface-alt">
                        ثبت درخواست جدید
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-5"
                    aria-busy={status === 'loading'}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="rf-name" label="نام" error={errors.name}>
                        <input
                          id="rf-name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={set('name')}
                          placeholder="نام و نام خانوادگی یا نام شرکت"
                          className={`field ${errClass('name')}`}
                          {...aria('name')}
                        />
                      </Field>
                      <Field id="rf-phone" label="شماره تماس" error={errors.phone}>
                        <input
                          id="rf-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          dir="ltr"
                          value={values.phone}
                          onChange={set('phone')}
                          placeholder="09123456789"
                          className={`field text-start ${errClass('phone')}`}
                          {...aria('phone')}
                        />
                      </Field>
                    </div>

                    <Field id="rf-device" label="نوع دستگاه" error={errors.device}>
                      <select
                        id="rf-device"
                        value={values.device}
                        onChange={set('device')}
                        className={`field ${errClass('device')} ${values.device ? '' : 'text-slate-400'}`}
                        {...aria('device')}
                      >
                        <option value="" disabled>
                          انتخاب کنید…
                        </option>
                        {DEVICE_TYPES.map((d) => (
                          <option key={d} value={d} className="text-navy-900">
                            {d}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="rf-issue" label="شرح مشکل" error={errors.issue}>
                      <textarea
                        id="rf-issue"
                        rows={4}
                        value={values.issue}
                        onChange={set('issue')}
                        placeholder="مدل دستگاه و مشکل را بنویسید؛ مثلاً: پرینتر HP M1132 کاغذ را می‌کشد ولی چاپ کمرنگ است."
                        className={`field resize-y ${errClass('issue')}`}
                        {...aria('issue')}
                      />
                    </Field>

                    <button type="submit" disabled={status === 'loading'} className="btn-navy w-full !py-3.5 text-base">
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          در حال ثبت…
                        </>
                      ) : (
                        'ثبت درخواست'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
