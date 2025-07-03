import React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "./ui/Button"

const ContactFooter = () => {
  return (
    <div className="bg-gray-light py-20 pb-0">
      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">
            Get in touch with us for more information about our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form className="bg-white p-8 rounded-xl shadow-md">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary"
                  required
                ></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-500">
                Send Message
              </Button>
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <div className="flex items-center space-x-4">
              <MapPin className="h-8 w-8 text-green-primary" />
              <div>
                <h4 className="font-semibold text-lg text-gray-900">
                  Our Office
                </h4>
                <p className="text-gray-600">1234 Main Street, Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-8 w-8 text-blue-primary" />
              <div>
                <h4 className="font-semibold text-lg text-gray-900">Email Us</h4>
                <p className="text-gray-600">info@ticketertransports.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-8 w-8 text-red-500" />
              <div>
                <h4 className="font-semibold text-lg text-gray-900">
                  Call Us
                </h4>
                <p className="text-gray-600">+254 712 345678</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Ticketer Transportations</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Pioneering the future of sustainable transportation in Africa through innovative 
                energy solutions and smart mobility systems.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 cursor-pointer transition-colors">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-colors">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer transition-colors">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Fleet Management Solutions
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Electric Vehicle Infrastructure
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Smart Mobility Platforms
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Sustainable Transport Consulting
                  </a>
                </li>
            
                <li>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors">
                    Software as a Service (SaaS)
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    1234 Main Street, Nairobi, Kenya
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    info@ticketertransports.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    +254 712 345678
                  </span>
                </div>
              </div>
              <Button 
                className="mt-4 bg-green-600 hover:bg-green-500 text-white"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2025 Ticketer Transportations. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactFooter

