import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurant from './Pages/Restaurant';
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";
import Home from "./Pages/Home";
import AuthForm from "./Components/Login/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="login" element={<AuthForm/>}/>
        <Route path="contact" element={<Contact />} />
        <Route path="restaurant/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;