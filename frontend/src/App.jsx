import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '/components/Navbar';
import Header from '/components/Header';
import About from '/components/About';
import Footer from '/components/Footer';
import Login from '/pages/Login';
import Signup from '/pages/Signup';
import SymptomForm from '/components/SymptomForm';
import Profile from '/pages/Profile';
import { AuthProvider } from '/context/AuthContext';

// Layout component for common structure
const Layout = ({ children }) => (
  <>
    <Navbar />
    <Header />
    {children}
    <About />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages with layout */}
          <Route
            path="/"
            element={
              <Layout>
                <></> {/* You can add homepage content here later */}
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <SymptomForm />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />

          {/* Auth pages without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
