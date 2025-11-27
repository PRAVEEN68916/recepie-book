// ==================== Signup.js ====================
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Hide toast after 2 seconds
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(
        () => setToast({ show: false, message: '', type: '' }),
        2000
      );
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (!email || password.length < 6) {
        setToast({
          show: true,
          message: 'Password must be at least 6 characters.',
          type: 'danger',
        });
      } else if (password !== confirmPassword) {
        setToast({
          show: true,
          message: 'Passwords do not match.',
          type: 'danger',
        });
      } else {
        const joinDate = new Date().toLocaleString('en-IN', {
          month: 'long',
          year: 'numeric',
        });

        const newUser = {
          firstName: fname,
          lastName: lname,
          email,
          phone,
          bio: 'Book lover and avid reader',
          favoriteGenre: 'Fiction',
          joinDate,
          password, // demo only; never store plain passwords in real apps
        };

        // For auth
        localStorage.setItem('user', JSON.stringify(newUser));

        // For profile page
        localStorage.setItem('userProfile', JSON.stringify(newUser));

        setToast({
          show: true,
          message: 'Signup successful! You can now log in.',
          type: 'success',
        });

        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
      }
    }, 1000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: 'linear-gradient(135deg, #000428, #004e92)' }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ width: '100%', maxWidth: 500 }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light shadow-sm"
              onClick={() => navigate('/')}
            >
              <FaHome size={18} />
            </button>
          </div>

          <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Name fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Password + Confirm Password */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="At least 6 characters"
                  />
                  <span
                    className="input-group-text bg-white"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Submit'}
            </button>

            {/* Login Redirect */}
            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link
                to="/login"
                className="text-decoration-none fw-semibold text-primary"
              >
                Log in
              </Link>
            </div>
          </form>

          {/* Toast Message */}
          {toast.show && (
            <div
              className={`toast show align-items-center text-bg-${toast.type} border-0 mt-3 w-100`}
              style={{ zIndex: 999 }}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;