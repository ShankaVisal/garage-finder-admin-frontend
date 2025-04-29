// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [garages, setGarages] = useState([]);
//   const [form, setForm] = useState({ name: "", latitude: "", longitude: "", phone: "" });
//   const [editingIndex, setEditingIndex] = useState(null);

//   // Fetch all garages
//   const fetchGarages = () => {
//     axios.get("https://garage-admin-backend.onrender.com/garages").then((res) => {
//       if (Array.isArray(res.data)) {
//         setGarages(res.data);
//       } else {
//         console.error("Unexpected response:", res.data);
//         setGarages([]);
//       }
//     });
//   };

//   useEffect(() => {
//     fetchGarages();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (editingIndex !== null) {
//       axios.put(`https://garage-admin-backend.onrender.com/garages/${editingIndex}`, form).then(() => {
//         fetchGarages(); // Refresh after update
//         resetForm();
//       });
//     } else {
//       axios.post("https://garage-admin-backend.onrender.com/garages", form).then(() => {
//         fetchGarages(); // Refresh after add
//         resetForm();
//       });
//     }
//   };

//   const handleDelete = (index) => {
//     axios.delete(`https://garage-admin-backend.onrender.com/garages/${index}`).then(() => {
//       fetchGarages(); // Refresh after delete
//     });
//   };

//   const handleEdit = (garage, index) => {
//     setForm(garage);
//     setEditingIndex(index);
//   };

//   const resetForm = () => {
//     setForm({ name: "", latitude: "", longitude: "", phone: "" });
//     setEditingIndex(null);
//   };

//   return (
    
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Garage Admin Panel</h1>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" />
//         <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className="border p-2" />
//         <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className="border p-2" />
//         <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2" />
//       </div>
//       <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
//         {editingIndex !== null ? "Update Garage" : "Add Garage"}
//       </button>
//       {editingIndex !== null && (
//         <button onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
//           Cancel
//         </button>
//       )}

//       <table className="table-auto w-full mt-6 border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Latitude</th>
//             <th className="p-2 border">Longitude</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {garages.map((garage, index) => (
//             <tr key={index} className="text-center">
//               <td className="border p-2">{garage.name}</td>
//               <td className="border p-2">{garage.latitude}</td>
//               <td className="border p-2">{garage.longitude}</td>
//               <td className="border p-2">{garage.phone}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleEdit(garage, index)}
//                   className="text-blue-600 hover:underline mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {garages.length === 0 && (
//             <tr>
//               <td colSpan="5" className="text-center text-gray-500 p-4">No garages available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [garages, setGarages] = useState([]);
  const [form, setForm] = useState({ name: "", latitude: "", longitude: "", phone: "" });
  const [editingIndex, setEditingIndex] = useState(null);

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
    const url = `https://garage-admin-backend.onrender.com/garages${editingIndex !== null ? `/${editingIndex}` : ""}`;
    const method = editingIndex !== null ? "put" : "post";

    axios[method](url, form).then(() => {
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
    setForm(garage);
    setEditingIndex(index);
  };

  const resetForm = () => {
    setForm({ name: "", latitude: "", longitude: "", phone: "" });
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <h1>Garage Admin Panel</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          placeholder="Latitude"
        />
        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          placeholder="Longitude"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
      </form>

      <div className="actions">
        <button type="button" onClick={handleSubmit} className="primary">
          {editingIndex !== null ? "Update Garage" : "Add Garage"}
        </button>
        {editingIndex !== null && (
          <button type="button" onClick={resetForm} className="secondary">
            Cancel
          </button>
        )}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((garage, index) => (
              <tr key={index}>
                <td>{garage.name}</td>
                <td>{garage.latitude}</td>
                <td>{garage.longitude}</td>
                <td>{garage.phone}</td>
                <td className="table-actions">
                  <button onClick={() => handleEdit(garage, index)} className="edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {garages.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  No garages available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
