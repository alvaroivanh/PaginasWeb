import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const info = [
  {
    icon: MapPin,
    label: 'Dirección',
    lines: ['Cra 6 #119B-52', 'Usaquén, Bogotá'],
  },
  {
    icon: Phone,
    label: 'Teléfono',
    lines: ['+57 (601) 619 2345', '+57 310 456 7890'],
  },
  {
    icon: Mail,
    label: 'Correo',
    lines: ['reservas@lalenacriolla.com', 'info@lalenacriolla.com'],
  },
]

const hours = [
  { day: 'Lunes a Jueves', time: '12:00 – 22:00' },
  { day: 'Viernes y Sábado', time: '12:00 – 23:00' },
  { day: 'Domingos y Festivos', time: '12:00 – 16:00' },
]

export default function Contact() {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-green">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Encuéntranos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-4 mb-4">
            Ubicación y Contacto
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[400px]"
          >
            <iframe
              title="Ubicación La Leña Criolla"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-74.03!3d4.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDInMDAuMCJOIDc0wrAwMScwMC4wIlc!5e0!3m2!1ses!2sco!4v1700000000000"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Contact cards */}
            <div className="space-y-6 mb-10">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-cream/50 text-sm mb-1">{item.label}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-cream font-medium">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-green-dark/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-gold" size={18} />
                <h3 className="font-display text-lg font-semibold text-cream">
                  Horarios
                </h3>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-cream/60 text-sm">{h.day}</span>
                    <span className="text-cream font-medium text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
