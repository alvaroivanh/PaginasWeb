import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  personas: string
  notas: string
}

const initialForm: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  fecha: '',
  hora: '',
  personas: '2',
  notas: '',
}

const hours = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
]

export default function Reservations() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reservas" className="lena-reservas py-24 md:py-32 bg-cream relative overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Tu Mesa Te Espera
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mt-4 mb-4">
            Reservaciones
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-warm-gray text-lg max-w-md mx-auto">
            Reserva tu experiencia gastronómica y déjanos preparar todo para recibirte
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-black/5"
            >
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark/70 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark/70 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) => update('telefono', e.target.value)}
                  placeholder="+57 300 123 4567"
                  className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200"
                />
              </div>

              {/* Date, Time, Persons */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-dark/70 mb-2">
                    <Calendar size={14} className="text-gold" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.fecha}
                    onChange={(e) => update('fecha', e.target.value)}
                    className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-dark/70 mb-2">
                    <Clock size={14} className="text-gold" />
                    Hora
                  </label>
                  <select
                    required
                    value={form.hora}
                    onChange={(e) => update('hora', e.target.value)}
                    className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 appearance-none"
                  >
                    <option value="">--</option>
                    {hours.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-dark/70 mb-2">
                    <Users size={14} className="text-gold" />
                    Personas
                  </label>
                  <select
                    value={form.personas}
                    onChange={(e) => update('personas', e.target.value)}
                    className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 appearance-none"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-dark/70 mb-2">
                  Notas especiales <span className="text-warm-gray/60">(opcional)</span>
                </label>
                <textarea
                  value={form.notas}
                  onChange={(e) => update('notas', e.target.value)}
                  rows={3}
                  placeholder="Alergias, celebración especial, preferencia de ubicación..."
                  className="w-full px-4 py-3 bg-cream/50 border border-cream-dark rounded-xl text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold text-dark font-semibold text-base rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98]"
              >
                Confirmar Reserva
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-12 shadow-lg shadow-black/5 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="mx-auto text-green mb-6" size={64} strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-dark mb-3">
                ¡Reserva Confirmada!
              </h3>
              <p className="text-warm-gray text-lg mb-8 max-w-sm mx-auto">
                Hemos recibido tu reserva. Te enviaremos una confirmación a <strong className="text-dark">{form.email}</strong>
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm) }}
                className="px-8 py-3 border border-gold text-gold font-medium rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Hacer otra reserva
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
