import React, { use, useState, useEffect, useContext } from "react";
import { updateProfile, updateEmail, deleteUser } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
import Error from "./Error";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user info from backend
  useEffect(() => {
    if (user?.uid) {
      fetch(`http://localhost:3000/users/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            photoURL: data.photoURL || "",
            accountType: data.accountType || "ordinary",
            address: data.address || "",
            phone: data.phone || "",
            creationTime: data.creationTime || "",
            lastSignInTime: data.lastSignInTime || "",
          });
        })
        .catch((err) => console.error("Profile fetch failed:", err));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !formData) return;

    setIsSubmitting(true);
    try {
      // Update Firebase profile
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      // Update backend
      await fetch(`http://localhost:3000/users/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      Swal.fire({
        icon: "success",
        title: "Profile updated!",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: error.message,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!user) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3000/users/${user.uid}`, {
            method: "DELETE",
          });

          await deleteUser(user);

          Swal.fire("Deleted!", "Your account has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  if (loading) return <Loading />;
  if (!user) return <Error />;
  if (!formData) return <Loading />;

  return (
    <div className="container mx-auto p-4 md:min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-lg w-full">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>

          {!isEditing ? (
            <>
              <div className="mb-6 space-y-2">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Account Type:</strong> {formData.accountType}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Creation Time:</strong> {formData.creationTime}</p>
                <p><strong>Last Sign In:</strong> {formData.lastSignInTime}</p>
                <p>
                  <strong>Photo:</strong>{" "}
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mt-2"
                    />
                  ) : "Not set"}
                </p>
              </div>
              <div className="flex gap-4">
                <button className="btn btn-primary flex-1" onClick={() => setIsEditing(true)}>
                  Update
                </button>
                <button className="btn btn-error flex-1" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleInputChange}
                className="input input-bordered"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                defaultValue={formData.email}
                onChange={handleInputChange}
                className="input input-bordered"
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                defaultValue={formData.address}
                onChange={handleInputChange}
                className="input input-bordered"
                placeholder="Address"
              />
              <input
                type="tel"
                name="phone"
                defaultValue={formData.phone}
                onChange={handleInputChange}
                className="input input-bordered"
                placeholder="Phone"
              />
              <input
                type="url"
                name="photoURL"
                defaultValue={formData.photoURL}
                onChange={handleInputChange}
                className="input input-bordered"
                placeholder="Photo URL"
              />
              <select
                name="accountType"
                defaultValue={formData.accountType}
                onChange={handleInputChange}
                className="select select-bordered"
              >
                <option value="ordinary">Ordinary Account</option>
                <option value="business">Business Account</option>
              </select>

              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button type="button" className="btn btn-secondary flex-1" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
