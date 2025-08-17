import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
import Error from "./Error";

const DoctorsPage = () => {
  const { user, loading } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    education: [],
    speciality: "",
    experience: "",
    registration: "",
    availability: [],
    fee: "",
    hospital: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch doctors added by the current user
  useEffect(() => {
    if (!user?.uid) return;

    fetch(`http://localhost:3000/doctors?uid=${user.uid}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Fetch doctors failed:", err));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      education: [],
      speciality: "",
      experience: "",
      registration: "",
      availability: [],
      fee: "",
      hospital: "",
    });
    setEditingDoctorId(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const url = editingDoctorId
        ? `http://localhost:3000/doctors/${editingDoctorId}`
        : "http://localhost:3000/doctors";

      const method = editingDoctorId ? "PUT" : "POST";

      const bodyData = editingDoctorId
        ? { ...formData, uid: user.uid } // include uid for ownership check
        : { ...formData, createdBy: user.uid };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: editingDoctorId ? "Doctor updated!" : "Doctor added!",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
        // Refresh doctors list
        const updatedDoctorsRes = await fetch(
          `http://localhost:3000/doctors?uid=${user.uid}`
        );
        const updatedDoctors = await updatedDoctorsRes.json();
        setDoctors(updatedDoctors);
        resetForm();
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name,
      image: doctor.image,
      education: doctor.education.join(","),
      speciality: doctor.speciality,
      experience: doctor.experience,
      registration: doctor.registration,
      availability: doctor.availability.join(","),
      fee: doctor.fee,
      hospital: doctor.hospital,
    });
    setEditingDoctorId(doctor._id);
    setIsEditing(true);
  };

  const handleDelete = (doctorId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/doctors/${doctorId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid }), // ownership check
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Delete failed");
          Swal.fire("Deleted!", "Doctor has been deleted.", "success");
          setDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  if (loading) return <Loading />;
  if (!user) return <Error />;

  return (
    <div className="container mx-auto p-4 md:min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Doctors</h1>

     <form onSubmit={handleSubmit} className="space-y-4">
  <div className="flex gap-4">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Doctor Name"
      required
    />
    <input
      type="text"
      name="speciality"
      value={formData.speciality}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Speciality"
      required
    />
  </div>

  <div className="flex gap-4">
    <input
      type="text"
      name="experience"
      value={formData.experience}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Experience"
    />
    <input
      type="text"
      name="registration"
      value={formData.registration}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Registration Number"
    />
  </div>

  <div className="flex gap-4">
    <input
      type="text"
      name="hospital"
      value={formData.hospital}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Hospital Name"
    />
    <input
      type="number"
      name="fee"
      value={formData.fee}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Consultation Fee"
    />
  </div>

  <div className="flex gap-4">
    <input
      type="url"
      name="image"
      value={formData.image}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Photo URL"
    />
    <input
      type="text"
      name="availability"
      value={formData.availability}
      onChange={handleInputChange}
      className="input input-bordered flex-1"
      placeholder="Availability (Comma separated)"
    />
  </div>

  <button type="submit" className="btn btn-primary w-full">
    {isEditing ? "Update Doctor" : "Add Doctor"}
  </button>
</form>


      <h2 className="text-2xl font-semibold mb-4">Your Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="card bg-base-100 shadow-md p-4">
            <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover mb-2 rounded-md"/>
            <h3 className="text-xl font-bold">{doc.name}</h3>
            <p><strong>Speciality:</strong> {doc.speciality}</p>
            <p><strong>Education:</strong> {doc.education.join(", ")}</p>
            <p><strong>Experience:</strong> {doc.experience}</p>
            <p><strong>Registration:</strong> {doc.registration}</p>
            <p><strong>Availability:</strong> {doc.availability.join(", ")}</p>
            <p><strong>Fee:</strong> {doc.fee}</p>
            <p><strong>Hospital:</strong> {doc.hospital}</p>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-primary flex-1" onClick={() => handleEdit(doc)}>
                Edit
              </button>
              <button className="btn btn-error flex-1" onClick={() => handleDelete(doc._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
