import { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  name: "",
  latitude: "",
  longitude: "",
  phone: "",
  garageType: "",
  services: "",
  address: "",
  description: ""
};

export default function App() {
  const [garages, setGarages] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch all garages
  const fetchGarages = () => {
    axios.get("https://garage-admin-backend.onrender.com/garages").then((res) => {
      if (Array.isArray(res.data)) {
        setGarages(res.data);
      } else {
        console.error("Unexpected response:", res.data);
        setGarages([]);
      }
    });
  };

  useEffect(() => {
    fetchGarages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert services string to array
    const data = {
      ...form,
      services: form.services
        ? form.services.split(",").map((s) => s.trim()).filter(Boolean)
        : []
    };
    const url = `https://garage-admin-backend.onrender.com/garages${editingIndex !== null ? `/${editingIndex}` : ""}`;
    const method = editingIndex !== null ? "put" : "post";
    axios[method](url, data).then(() => {
      fetchGarages();
      resetForm();
    });
  };

  const handleDelete = (index) => {
    axios.delete(`https://garage-admin-backend.onrender.com/garages/${index}`).then(() => {
      fetchGarages();
    });
  };

  const handleEdit = (garage, index) => {
    setForm({
      ...garage,
      services: Array.isArray(garage.services) ? garage.services.join(", ") : ""
    });
    setEditingIndex(index);
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Garage Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2"
        />
        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="border p-2"
        />
        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="border p-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2"
        />
        <input
          name="garageType"
          value={form.garageType}
          onChange={handleChange}
          placeholder="Garage Type"
          className="border p-2"
        />
        <input
          name="services"
          value={form.services}
          onChange={handleChange}
          placeholder="Services (comma separated)"
          className="border p-2"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 col-span-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 col-span-2"
        />
        <div className="col-span-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
            {editingIndex !== null ? "Update Garage" : "Add Garage"}
          </button>
          {editingIndex !== null && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Latitude</th>
              <th className="p-2 border">Longitude</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Garage Type</th>
              <th className="p-2 border address-column">Services</th>
              <th className="p-2 border address-column">Address</th>
              <th className="p-2 border description-column">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((garage, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{garage.name}</td>
                <td className="border p-2">{garage.latitude}</td>
                <td className="border p-2">{garage.longitude}</td>
                <td className="border p-2">{garage.phone}</td>
                <td className="border p-2">{garage.garageType}</td>
                <td className="border p-2">{Array.isArray(garage.services) ? garage.services.join(", ") : ""}</td>
                <td className="border p-2 w-72 break-words">{garage.address}</td>
                <td className="border p-2 w-96 break-words">{garage.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(garage, index)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {garages.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 p-4">No garages available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
