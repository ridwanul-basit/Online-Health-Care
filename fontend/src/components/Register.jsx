import React, { use } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';

const SignUp = () => {
  const { createUser, googleLogin } = use(AuthContext); // ✅ add googleLogin from context

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...restFormData } = Object.fromEntries(formData.entries());

    // create user in firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        const userProfile = {
          unique_id: user?.uid,
          email,
          ...restFormData,
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };

        // send to backend
        saveUserToDB(userProfile);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      });
  };

  // ✅ Google login handler
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        const userProfile = {
          unique_id: user?.uid,
          email: user?.email,
          name: user?.displayName,
          photo: user?.photoURL,
          accountType: "ordinary", // default if not chosen
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };

        // send to backend
        saveUserToDB(userProfile);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      });
  };

  // ✅ Reusable function to save to MongoDB
  const saveUserToDB = (userProfile) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        {/* Email Sign Up Form */}
        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input input-bordered" placeholder="Name" required />

          <label className="label">Address</label>
          <input type="text" name="address" className="input input-bordered" placeholder="Address" />

          <label className="label">Phone</label>
          <input type="text" name="phone" className="input input-bordered" placeholder="Phone Number" />

          <label className="label">Photo URL</label>
          <input type="text" name="photo" className="input input-bordered" placeholder="Photo URL" />

          <label className="label">Account Type</label>
          <select name="accountType" className="select select-bordered" required>
            <option value="ordinary">Ordinary Account</option>
            <option value="business">Business Account</option>
          </select>

          <label className="label">Email</label>
          <input type="email" name="email" className="input input-bordered" placeholder="Email" required />

          <label className="label">Password</label>
          <input type="password" name="password" className="input input-bordered" placeholder="Password" required />

          <button className="btn btn-neutral mt-4 w-full">Sign Up</button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        <div className="text-center mt-4">
          <button className="btn bg-white text-black border-[#e5e5e5] w-4/5"  onClick={handleGoogleLogin}>
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Signup with Google
</button>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
