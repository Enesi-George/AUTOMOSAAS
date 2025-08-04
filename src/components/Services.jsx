import React, { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Leaf, Brain, Code, Lightbulb, Settings, Truck, Smartphone, CreditCard, GraduationCap, ShoppingCart, Building } from "lucide-react"
import { Button } from "./ui/Button"
import Modal from "./ui/Modal"

const services = [
{
    icon: <Leaf className="h-12 w-12 text-green-primary" />,
    title: "Green Energy Research",
    description: "Our pioneering research aims to redefine energy efficiency and transform transport in Africa.",
    features: ["Foundational R&D", "Core Research", "Academic Partnerships", "Innovative Methods"],
    detailedDescription: "At AUTOSAAS, our green energy research stands at the heart of our mission to become Africa’s trailblazer in clean, sustainable transportation. We are not just following global trends—we’re determined to set them. Our pioneering work delves into the dynamic relationship between pressure, speed, and flow rate within energy systems. By exploring innovative methods to decouple these interdependencies in closed-loop systems, we aim to redefine the limits of energy efficiency and transform the future of transport—on the continent and beyond.",
    benefits: ["Position as a leader", "Innovative edge", "Sustainability goals alignment", "Enhanced energy efficiency"]
  },
  {
    icon: <Zap className="h-12 w-12 text-blue-primary" />,
    title: "Sustainable Green Energy Implementation",
    description: "Implementing next-gen sustainable energy solutions for real-world transport systems.",
    features: ["Infrastructure Design", "Renewable Energy Integration", "Smart Energy Management", "Community Engagement"],
    detailedDescription: "At AUTOSAAS, our journey starts with green energy. We are pushing the envelope on infrastructure design and renewable energy integration, developing prototypes that incorporate our closed-loop energy principles. Through strategic partnerships, we aim to power fleet operations and begin urban corridor projects. From energy audits to AI-based monitoring tools, our commitment is to provide reliable, eco-efficient transport solutions that redefine boundaries.",
    benefits: ["Eco-efficient transport", "Community and policy engagement", "Scalable and impactful solutions", "Innovative design"]
  },
  {
    icon: <Smartphone className="h-12 w-12 text-purple-600" />,
    title: "Smart Mobility Solutions",
    description: "Merging sustainability with innovation to reshape how Africa moves.",
    features: ["AI-Driven Fleet Management", "Eco-Connected Vehicles", "MaaS Platforms", "Smart Infrastructure"],
    detailedDescription: "At AUTOSAAS, our Smart Mobility Solutions merge sustainability with innovation to reshape how Africa moves. We harness data, technology, and green infrastructure to create transportation systems that are efficient, intelligent, and user-focused. Key solutions include AI-driven fleet management, eco-connected vehicles, and MaaS platforms that unify public transit, ride-sharing, and more.",
    benefits: ["Efficiency and innovation", "User-focused systems", "Integration ease", "Real-time data insights"]
  },
  {
    icon: <Brain className="h-12 w-12 text-indigo-600" />,
    title: "Renewable Energy Consulting Services",
    description: "Empowering Africa to transition into green energy solutions tailored for impact.",
    features: ["Energy Audits", "System Design", "Policy Advisory", "Capacity Building"],
    detailedDescription: "At AUTOSAAS, we don’t just build sustainable systems—we help others do the same. Our Renewable Energy Consulting Services empower governments, businesses, and innovators across Africa to transition into green energy solutions tailored for impact. We offer energy audits, system design and integration, policy advisory, and capacity building to help Africa leapfrog into a clean energy future through collaboration, research, and smart design.",
    benefits: ["Collaborative design", "Regulatory guidance", "Community engagement", "Cutting-edge innovation"]
  },
  {
    icon: <Code className="h-12 w-12 text-orange-600" />,
    title: "Software Development Services (SaaS)",
    description: "Delivering transformative digital solutions with a human-centric approach.",
    features: ["Agentic AI", "Custom Development", "Cloud Solutions", "Enterprise Platforms"],
    detailedDescription: "At AUTOSAAS, we fuse cutting-edge technology with human-centric design to deliver transformative digital solutions. Our services are designed to unlock new levels of efficiency, insight, and innovation for businesses of all sizes. Our Software as a Service offerings include custom software development, agentic AI solutions, and scalable backend systems tailored to meet your needs.",
    benefits: ["Innovative tech solutions", "Tailored experiences", "Operational efficiency", "Future-focused services"],
    saasSolutions: [
      { name: "E-commerce Platforms", description: "Complete online marketplace solutions for transportation services" },
      { name: "E-learning Systems", description: "Driver training and certification platforms" },
      { name: "ERP Solutions", description: "Enterprise resource planning for transportation companies" },
      { name: "CMS Platforms", description: "Content management systems for transport websites" },
      { name: "Payment Automation", description: "Secure, automated payment processing systems" },
      { name: "Customer Relationship Management", description: "CRM systems optimized for transportation businesses" },
      { name: "Inventory Management", description: "Vehicle and parts inventory tracking systems" },
      { name: "Business Intelligence", description: "Advanced analytics and reporting platforms" }
    ]
  }
]

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive transportation solutions spanning sustainable mobility, smart infrastructure, 
            AI-powered optimization, and custom software development for the future of African transportation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => openModal(service)}
              >
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our solutions can drive your organization forward.
          </p>
          <Button 
            size="lg" 
            className="bg-green-primary hover:bg-green-secondary"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={selectedService?.title}
      >
        {selectedService && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              {selectedService.icon}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                <p className="text-gray-600">{selectedService.description}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Detailed Overview</h4>
              <p className="text-gray-600 leading-relaxed">{selectedService.detailedDescription}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits & Outcomes</h4>
              <div className="space-y-2">
                {selectedService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedService.saasSolutions && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">SaaS Solutions</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.saasSolutions.map((solution, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">{solution.name}</h5>
                      <p className="text-sm text-gray-600">{solution.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button 
                onClick={() => {
                  closeModal()
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Services
