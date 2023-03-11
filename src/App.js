import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from "./pages/AdminLogin";

// #03989e main
// #a6a6a6 secondary

export default function App() {
  return (
    <div className="flex items-center justify-center"
      style={{ minHeight: '100vh' }}>
      <div className="w-max" style={{ maxWidth: '800px' }}>
        {/* <Signup /> */}
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}