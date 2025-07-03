import React from "react"
import { motion } from "framer-motion"
import { CheckSquare, Zap, Rocket } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-8 w-8 text-green-500" />,
    title: "Innovative by Design",
    description: "We blend creativity with technical depth, building solutions that are both groundbreaking and practical."
  },
  {
    icon: <Rocket className="h-8 w-8 text-blue-500" />,
    title: "Agile Delivery",
    description: "Our rapid development cycles and commitment to continuous improvement ensure we deliver value quickly and efficiently."
  },
  {
    icon: <CheckSquare className="h-8 w-8 text-purple-500" />,
    title: "Future-Focused",
    description: "We design technologies that not only meet your current needs but also evolve with your vision for the future."
  }
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advantages of partnering with a team that is dedicated to innovation, agility, and your long-term success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-white rounded-full shadow-md mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
