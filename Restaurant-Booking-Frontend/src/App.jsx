import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Book a Table</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
