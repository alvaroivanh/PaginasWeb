import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Send, X, MessageCircle } from 'lucide-react'
import { ladoBCategories, formatCOP } from '../data/ladob-menu'

/* ─── Logo Component ─── */
function LadoBLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none ${className}`}>
      <div className="font-[800] uppercase tracking-[0.15em] leading-none" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <span className="text-[1em]">LADO</span>
      </div>
      <div className="font-[800] uppercase leading-[0.8] -mt-[0.05em]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <span className="text-[2.4em]">B</span>
      </div>
    </div>
  )
}

/* ─── WhatsApp Icon ─── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ─── Typing Dots ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-black/40 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/* ─── Chatbot Lado B ─── */
function ChatbotLadoB() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hola! Soy el asistente de Lado B Hamburguesas. ¿Qué quieres saber? Puedo ayudarte con el menú, precios, ubicación o pedidos.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg = { role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat-ladob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })) }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Ups, algo falló. Escríbenos al WhatsApp: +57 315 690 4000' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 w-[340px] max-w-[calc(100vw-3rem)] bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: '460px' }}
          >
            <div className="bg-black px-5 py-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <LadoBLogo className="text-white text-[8px]" />
                <span className="text-white/50 text-xs">Asistente</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors" aria-label="Cerrar">
                <X size={16} />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3.5 py-2 text-sm leading-relaxed rounded-2xl ${msg.role === 'user' ? 'bg-black text-white rounded-br-sm' : 'bg-gray-100 text-black/80 rounded-bl-sm'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && <div className="flex justify-start"><div className="bg-gray-100 rounded-2xl rounded-bl-sm"><TypingDots /></div></div>}
            </div>
            <div className="border-t border-black/5 p-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Pregunta algo..."
                  className="flex-1 px-3.5 py-2.5 bg-gray-50 rounded-full text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-black/10"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white disabled:opacity-20 active:scale-95 transition-all"
                  aria-label="Enviar"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg shadow-black/15 hover:bg-black/85 transition-colors"
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={18} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────── */
export default function LadoB() {
  const [activeCategory, setActiveCategory] = useState(ladoBCategories[0].id)
  const current = ladoBCategories.find((c) => c.id === activeCategory)!

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="block">
            <LadoBLogo className="text-[6px] text-black" />
          </a>
          <div className="hidden sm:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-black/50">
            <a href="#menu-section" className="hover:text-black transition-colors">Menú</a>
            <a href="#ubicacion" className="hover:text-black transition-colors">Ubicación</a>
            <a
              href="https://wa.me/573156904000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors tracking-normal normal-case text-xs font-semibold"
            >
              <WhatsAppIcon size={14} />
              Pedir
            </a>
          </div>
          <a
            href="https://wa.me/573156904000"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center gap-1.5 bg-black text-white px-3.5 py-2 rounded-full text-xs font-semibold"
          >
            <WhatsAppIcon size={14} />
            Pedir
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="top" className="pt-16">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
          {/* Big logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <LadoBLogo className="text-[28px] sm:text-[40px] md:text-[56px] text-black" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 w-12 h-px bg-black/15"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-black/40 text-sm md:text-base font-light tracking-wide max-w-md"
          >
            Hamburguesas artesanales. Opciones plant-based.
            <br />
            Puente Largo, Bogotá.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex gap-3"
          >
            <a
              href="#menu-section"
              className="px-7 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/85 active:scale-95 transition-all"
            >
              Ver menú
            </a>
            <a
              href="https://wa.me/573156904000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3 border border-black/15 text-black text-sm font-semibold rounded-full hover:border-black/30 active:scale-95 transition-all"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* ── Menu ── */}
      <section id="menu-section" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight">
            Menú
          </h2>
          <p className="mt-2 text-black/35 text-sm">
            Precios en COP. Combos incluyen papas + bebida.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {ladoBCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-black/[0.03] text-black/50 hover:bg-black/[0.06] hover:text-black/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {current.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group border border-black/[0.06] rounded-xl p-5 hover:border-black/15 transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-[700] text-[15px] text-black group-hover:text-black/80 transition-colors truncate">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black/10 text-black/40 rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-black/35 text-[13px] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="flex-shrink-0 text-[15px] font-[700] text-black tabular-nums">
                    {formatCOP(item.price)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Order CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/573156904000?text=Hola!%20Quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/85 active:scale-95 transition-all"
          >
            <WhatsAppIcon size={16} />
            Hacer pedido por WhatsApp
          </a>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* ── Info ── */}
      <section id="ubicacion" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-[800] uppercase tracking-tight mb-10">
            Info
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-black/25 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-1">Dirección</p>
                <p className="text-sm font-medium">Puente Largo</p>
                <p className="text-sm text-black/50">Bogotá D.C., Colombia</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="text-black/25 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-1">Horarios</p>
                <p className="text-sm font-medium">12:15 — 22:00</p>
                <p className="text-sm text-black/50">Varía según el día</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="text-black/25 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-1">Contacto</p>
                <p className="text-sm font-medium">315 690 4000</p>
                <p className="text-sm text-black/50">WhatsApp / Llamadas</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://wa.me/573156904000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-full text-sm font-medium hover:border-black/25 transition-colors"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
            <a
              href="https://queresto.com/ladobhamburguesas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-full text-sm font-medium hover:border-black/25 transition-colors"
            >
              Menú completo en QueResto
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <LadoBLogo className="text-[5px] text-black/30" />
          <p className="text-[11px] text-black/20 tracking-wide">
            &copy; {new Date().getFullYear()} Lado B Hamburguesas. Bogotá, Colombia.
          </p>
        </div>
      </footer>

      <ChatbotLadoB />
    </div>
  )
}
