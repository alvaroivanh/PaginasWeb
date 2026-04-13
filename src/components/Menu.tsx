import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuCategories, formatCOP } from '../data/menu'

export default function MenuSection() {
  const [active, setActive] = useState(menuCategories[0].id)
  const activeCategory = menuCategories.find((c) => c.id === active)!

  return (
    <section id="menu" className="py-24 md:py-32 bg-dark">
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
            Nuestra Carta
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-4 mb-4">
            El Menú
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-cream/50 text-lg max-w-lg mx-auto">
            Sabores que cuentan la historia de Colombia en cada bocado
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat.id
                  ? 'text-dark'
                  : 'text-cream/60 hover:text-cream hover:bg-white/5'
              }`}
            >
              {active === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-4"
          >
            {activeCategory.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group relative bg-dark-light/50 border border-white/5 rounded-xl p-6 hover:border-gold/20 hover:bg-dark-light/80 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-terracota/20 text-terracota-light rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-cream/40 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="font-display text-xl font-semibold text-gold">
                      {formatCOP(item.price)}
                    </span>
                  </div>
                </div>
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
