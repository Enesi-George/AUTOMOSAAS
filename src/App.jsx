import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./page/Homepage";
import ScholarshipPage from "./page/Scholarship";
import Navbar from "./components/Navbar";
import { NotFound } from "./page/NotFound";

const App = () => {
  return (
    <Router>
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/scholarship" element={<ScholarshipPage />} /> */}
          {/* <Route path="/apply" element={<ScholarshipPage />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
