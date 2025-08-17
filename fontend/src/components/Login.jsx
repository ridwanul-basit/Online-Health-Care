import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from './AuthProvider';


const Login = () => {
  const { signIn, setUser, resetPassword } = use(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Google login popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Google login was cancelled. Please try again.';
      default:
        return errorCode || 'An error occurred. Please try again.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn(email, password);
      const user = result.user;
      setUser(user);
      Swal.fire({
        icon: 'success',
        title: 'Welcome',
        text: 'Logged in successfully!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate(location.state ? location.state : '/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: getErrorMessage(error.code),
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter your email address.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    const result = await resetPassword(email);
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: result.message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: getErrorMessage(result.message.includes('user-not-found') ? 'auth/user-not-found' : result.message),
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Handle Google Login
 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    setUser(user);
    Swal.fire({
      icon: 'success',
      title: 'Welcome',
      text: 'Logged in with Google successfully!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    navigate(location.state ? location.state : '/');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: getErrorMessage(error.code),
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
};

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center md:min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="text-2xl font-bold text-center">Login With Your Email</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div>
              <p className="pt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-secondary hover:underline"
                >
                  Forgot Password?
                </button>
              </p>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>
        <div className="text-center mt-4">
          <button className="btn bg-white text-black border-[#e5e5e5] w-4/5"  onClick={handleGoogleLogin}>
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
          
        </div>
        <p className="text-center pt-5">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-secondary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;