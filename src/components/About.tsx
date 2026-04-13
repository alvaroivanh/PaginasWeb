import { motion } from 'framer-motion'
import { Flame, Heart, Leaf } from 'lucide-react'

const values = [
  {
    icon: Flame,
    title: 'Fuego Ancestral',
    text: 'Cocinamos con leña como lo hacían nuestras abuelas, respetando los tiempos y sabores de la tierra.',
  },
  {
    icon: Heart,
    title: 'Pasión Criolla',
    text: 'Cada plato es una carta de amor a las regiones de Colombia y sus tradiciones culinarias.',
  },
  {
    icon: Leaf,
    title: 'Del Campo a la Mesa',
    text: 'Ingredientes frescos de productores locales, apoyando la agricultura colombiana sostenible.',
  },
]

export default function About() {
  return (
    <section id="nosotros" className="lena-about py-24 md:py-32 bg-cream transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20 md:mb-28">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Interior del restaurante La Leña Criolla"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-left-8 bg-green text-cream px-6 py-4 rounded-xl shadow-xl"
            >
              <span className="font-display text-3xl font-bold text-gold">15+</span>
              <p className="text-sm text-cream/80 mt-0.5">Años de tradición</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              Nuestra Historia
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mt-4 mb-6 leading-tight">
              Una tradición que{' '}
              <span className="text-terracota italic">arde</span> en cada plato
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              La Leña Criolla nació en 2010 de la mano de la familia Herrera,
              con un sueño sencillo: llevar los sabores más auténticos de la
              cocina colombiana a la mesa bogotana, cocinados como se debe —a
              fuego lento y con el alma.
            </p>
            <p className="text-warm-gray text-lg leading-relaxed">
              Desde nuestra cocina en el corazón de Usaquén, seleccionamos los
              mejores ingredientes de cada región, honrando las recetas que han
              pasado de generación en generación.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <v.icon className="text-gold" size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold text-dark mb-3">
                {v.title}
              </h3>
              <p className="text-warm-gray leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
