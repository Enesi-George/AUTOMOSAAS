import React from "react"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Lightbulb } from "lucide-react"

const VisionMission = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      {/* Vision Section */}
      <motion.section
        id="vision"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4 md:mb-6">
              <Eye className="h-6 w-6 md:h-8 md:w-8 text-blue-primary mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              To lead Africa's clean mobility revolution, creating a sustainable transportation ecosystem that serves as a model for the world.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-blue-50 rounded-xl p-4 md:p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Continental Leadership</h4>
                <p className="text-sm text-gray-600">Setting the standard for clean transport across Africa</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 md:p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Global Impact</h4>
                <p className="text-sm text-gray-600">Inspiring worldwide adoption of sustainable mobility</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-6 md:p-8 h-64 md:h-96 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-48 md:h-48 border-4 border-blue-primary/20 rounded-full flex items-center justify-center"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 bg-blue-primary rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 md:h-16 md:w-16 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        id="mission"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 md:px-6"
      >
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Mission Text - Always comes first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center mb-4 md:mb-6">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-green-primary mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Bridging transportation and energy through sustainable technology and forward-thinking design, making clean mobility accessible to all.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 bg-green-primary rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
                  <p className="text-sm md:text-base text-gray-600">Pioneering breakthrough technologies in clean energy transport</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Integrity</h4>
                  <p className="text-sm md:text-base text-gray-600">Building trust through transparent and ethical business practices</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 bg-green-primary rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sustainability</h4>
                  <p className="text-sm md:text-base text-gray-600">Ensuring our solutions benefit both people and planet</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
                  <p className="text-sm md:text-base text-gray-600">Empowering local communities through accessible technology</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Cards - Comes after text on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 mt-8 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-4 md:p-8 h-64 md:h-96">
              <div className="grid grid-cols-2 gap-2 md:gap-4 h-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center justify-center"
                >
                  <Target className="h-8 w-8 md:h-12 md:w-12 text-green-primary mb-2 md:mb-4" />
                  <h4 className="font-semibold text-center text-xs md:text-sm">Bridge Energy & Transport</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center justify-center"
                >
                  <Lightbulb className="h-8 w-8 md:h-12 md:w-12 text-blue-primary mb-2 md:mb-4" />
                  <h4 className="font-semibold text-center text-xs md:text-sm">Smart Solutions</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center justify-center"
                >
                  <Heart className="h-8 w-8 md:h-12 md:w-12 text-red-500 mb-2 md:mb-4" />
                  <h4 className="font-semibold text-center text-xs md:text-sm">Community Focus</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center justify-center"
                >
                  <div className="h-8 w-8 md:h-12 md:w-12 bg-gradient-to-br from-green-primary to-blue-primary rounded-full mb-2 md:mb-4"></div>
                  <h4 className="font-semibold text-center text-xs md:text-sm">Sustainable Future</h4>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default VisionMission