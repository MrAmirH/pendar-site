export const PHONE_DISPLAY = '09126886277'
export const PHONE_TEL = '+989126886277'
export const WA_NUMBER = '989126886277'
export const TELEGRAM_URL = 'https://t.me/+989126886277'

export const waLink = (text = '') =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const FA = '۰۱۲۳۴۵۶۷۸۹'
const AR = '٠١٢٣٤٥٦٧٨٩'

export const toEnDigits = (s = '') =>
  s
    .replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)))

/** Lower-case, Latin digits, no spaces/dashes — so "p 1102" matches "P1102". */
export const normalize = (s = '') =>
  toEnDigits(s)
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\s\-_/.‌]+/g, '')
