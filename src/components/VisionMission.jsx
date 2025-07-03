import React from "react"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Lightbulb } from "lucide-react"

const VisionMission = () => {
  return (
    <div className="py-20 bg-white">
      {/* Vision Section */}
      <motion.section
        id="vision"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-blue-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To lead Africa's clean mobility revolution, creating a sustainable transportation ecosystem that serves as a model for the world.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Continental Leadership</h4>
                <p className="text-sm text-gray-600">Setting the standard for clean transport across Africa</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
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
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border-4 border-blue-primary/20 rounded-full flex items-center justify-center"
              >
                <div className="w-32 h-32 bg-blue-primary rounded-full flex items-center justify-center">
                  <Eye className="h-16 w-16 text-white" />
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
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative lg:order-2"
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 h-96">
              <div className="grid grid-cols-2 gap-4 h-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-center"
                >
                  <Target className="h-12 w-12 text-green-primary mb-4" />
                  <h4 className="font-semibold text-center">Bridge Energy & Transport</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-center"
                >
                  <Lightbulb className="h-12 w-12 text-blue-primary mb-4" />
                  <h4 className="font-semibold text-center">Smart Solutions</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-center"
                >
                  <Heart className="h-12 w-12 text-red-500 mb-4" />
                  <h4 className="font-semibold text-center">Community Focus</h4>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-center"
                >
                  <div className="h-12 w-12 bg-gradient-to-br from-green-primary to-blue-primary rounded-full mb-4"></div>
                  <h4 className="font-semibold text-center">Sustainable Future</h4>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:order-1"
          >
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-green-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Bridging transportation and energy through sustainable technology and forward-thinking design, making clean mobility accessible to all.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-primary rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
                  <p className="text-gray-600">Pioneering breakthrough technologies in clean energy transport</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-primary rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Integrity</h4>
                  <p className="text-gray-600">Building trust through transparent and ethical business practices</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-primary rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sustainability</h4>
                  <p className="text-gray-600">Ensuring our solutions benefit both people and planet</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-primary rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
                  <p className="text-gray-600">Empowering local communities through accessible technology</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default VisionMission
