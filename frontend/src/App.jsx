import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./pages/ErrorBoundry";
import Summary from "./pages/Summary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary/>}/>
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
