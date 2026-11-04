import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import SmartSearch from './components/SmartSearch'
import Categories from './components/Categories'
import Products from './components/Products'
import RepairForm from './components/RepairForm'
import RepairGallery from './components/RepairGallery'
import AboutArticles from './components/AboutArticles'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { waLink } from './lib/utils'

export default function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:shadow-lift"
      >
        پرش به محتوای اصلی
      </a>

      <Header />

      <main id="main">
        <Hero />
        <SmartSearch onSearch={setQuery} />
        <Categories />
        <Products query={query} onClear={() => setQuery('')} />
        <RepairForm />
        <RepairGallery />
        <AboutArticles />
        <FAQ />
      </main>

      <Footer />

      {/* floating WhatsApp button (mobile) */}
      <a
        href={waLink('سلام، می‌خواهم سفارش بدهم.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="سفارش در واتساپ"
        className="fixed bottom-5 start-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-navy-900 shadow-lift transition hover:bg-wa-dark active:scale-95 lg:hidden"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  )
}
