import { motion, AnimatePresence } from 'framer-motion';
import { X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '/scholar-01.png';

const ScholarshipModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  
  const handleLearnMore = () => {
    onClose()
    navigate('/scholarship')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <img
                  src={Logo}
                  alt="Students celebrating graduation"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">AUTOSAAS Initiative</h3>
                  <p className="text-sm opacity-90">Scholarship Opportunity</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Transform your future with our scholarship program. Pursue your master's degree in Europe or America with full funding support.
                </p>
                
                <button
                  onClick={handleLearnMore}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Learn More & Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ScholarshipModal;