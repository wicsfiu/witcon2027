import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

import About from './pages/About';
import Home from './pages/Home';
import Registration from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
