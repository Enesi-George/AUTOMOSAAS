import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  FileText,
  Brain,
  RefreshCw,
  Award,
  DollarSign,
  Handshake,
  Mail,
  Phone,
  Instagram,
  MapPin,
  Facebook,
} from "lucide-react";
import ScholarBanner from "/scholar-01.png";
import StudentStudying from "/scholar-02.jpg";
import HandShake from "/handshake.jpeg";
import { Link } from "react-router-dom";
import ScholarshipForm from "./components/ScholarshipForm";

const ScholarshipPage = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="scholarship-hero"
        className="relative h-screen flex items-center justify-center"
      >
        <img
          src={ScholarBanner}
          alt="Diverse students in graduation gowns"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Empowering Nigeria's Future Leaders
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Apply for the AUTOSAAS Initiative Scholarship and pursue your
            master's degree in Europe or America.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() =>
              document
                .getElementById("apply")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg"
          >
            Apply Now
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={StudentStudying}
                alt="Student studying"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                About the AUTOSAAS Initiative
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  We are proud to present our give-back-to-community and youth
                  empowerment program—the AUTOSAAS Initiative.
                </p>
                <p>
                  Our mission is to empower aspiring Nigerian students by
                  providing access to quality higher education through
                  need-based scholarships.
                </p>
                <p>
                  We are committed to breaking financial and systemic barriers
                  that hinder academic excellence, fostering a new generation of
                  leaders equipped to transform Nigeria's future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Scholarship Details
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Eligibility Criteria</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Age: 18 years and above</li>
                <li>
                  • Academic: BSc or HND from accredited Nigerian institution
                </li>
                <li>• Must meet entry criteria of partner institutions</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Application Process</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Apply through official online portal</li>
                <li>• Deadlines months before sessions</li>
                <li>• No documents needed initially</li>
                <li>• Shortlisted candidates provide proof</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <Brain className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Selection Process</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• General knowledge assessments</li>
                <li>• Logic-based evaluations</li>
                <li>• Merit-based selection</li>
                <li>• Matched with preferred institutions</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <RefreshCw className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Renewal Terms</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Based on academic performance</li>
                <li>• Continued commitment required</li>
                <li>• Personal development focus</li>
                <li>• Societal contribution expected</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Strategy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Funding & Enrollment Fee
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We cover tuition, visa processing, logistics, and institutional
            incentives to ensure your educational journey is fully supported.
          </p>
        </div>
      </section>

      {/* Award & Disbursement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Award & Disbursement
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Scope of Sponsorship</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Tuition and academic fees
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" /> Visa,
                  travel, and accommodation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Welfare support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Institutional bonuses and admin fees
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <DollarSign className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Disbursement Strategy</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Upfront payments to institutions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Student allocation-based funding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Transparent coordination
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />{" "}
                  Efficient processing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Handshake className="w-16 h-16 text-green-600 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Institutional Partnerships
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  We seek strategic partnerships with universities to facilitate
                  seamless enrollment, visa processing, and logistics.
                </p>
                <p>
                  We offer co-branding opportunities and cover all related
                  expenses—including incentives for designated school agents.
                </p>
                <p>
                  Let's elevate your institution's profile as a champion of
                  educational equity in Nigeria.
                </p>
              </div>
            </div>

            <div>
              <img
                src={HandShake}
                alt="University campus handshake"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-20">
        <ScholarshipForm />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Contact Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Link to={"mailto:autosaasinfo@gmail.com"}>
              <Mail className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>autosaasinfo@gmail.com</p>
            </Link>

            <div>
              <Phone className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p>+2348159450874</p>
            </div>

            <div>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p>Nigeria</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-12">
            <Link
              to={"https://www.instagram.com/automosaas/ "}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-8 h-8 text-green-400 hover:text-white cursor-pointer transition-colors" />
            </Link>
            <Link
              to={
                "https://www.facebook.com/people/Automatons-Mobility-and-Software-Services/61579161457339/?sk=about"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-8 h-8 text-green-400 hover:text-white cursor-pointer transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipPage;
