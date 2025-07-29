import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Zap, Leaf, Code, Brain } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-6 pt-20"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Driving the Future of {" "}
            <span className="text-green-primary">Clean Transport</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            
            Automatons mobility and software services (AUTOMOSAAS) is revolutionizing Africa's movement
            through sustainable mobility solutions, renewable energy innovation,
            and transformative digital technologies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-green-primary hover:bg-green-secondary"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 text-center shadow-lg "
                >
                  <Zap className="h-12 w-12 text-blue-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Smart Energy
                  </h3>
                  <p className="text-sm text-gray-600">
                    AI-driven energy management
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 text-center shadow-lg "
                >
                  <Leaf className="h-12 w-12 text-green-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Green Future
                  </h3>
                  <p className="text-sm text-gray-600">
                    100% sustainable transport
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 text-center shadow-lg"
                >
                  <Code className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Software as a service (SAAS)
                  </h3>
                  <p className="text-sm text-gray-600  wrap-anywhere ">
                    Transformative digital solution
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 rounded-2xl p-6 text-center shadow-lg "
                >
                  <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Renewable Energy Consulting Services
                  </h3>
                  <p className="text-sm text-gray-600">
                    Transition into green energy solutions tailored for impact.
                  </p>
                </motion.div>
              </div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-8 bg-white/90 rounded-2xl p-2 text-center shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Africa's Future
                </h3>
                <p className="text-gray-600">
                  Leading the continent's clean mobility revolution
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
