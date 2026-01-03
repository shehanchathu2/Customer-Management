import api from "./api.js";
import { useEffect, useState } from "react";

export default function CustomerTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customer");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await api.delete(`/customer/${id}`);
      setData(data.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting customer.");
    }
  };

  // Open edit modal
  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  // Handle modal input changes
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer({ ...editingCustomer, [name]: value });
  };

  // Update customer
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customer/${editingCustomer.id}`, editingCustomer);
      setData(
        data.map((c) => (c.id === editingCustomer.id ? editingCustomer : c))
      );
      setIsModalOpen(false);
      setEditingCustomer(null);
      alert("Customer updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating customer.");
    }
  };

  if (loading) return <p style={styles.loading}>Loading customers...</p>;
  if (data.length === 0) return <p style={styles.loading}>No customers found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Customer List</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Date of Birth</th>
            <th style={styles.th}>NIC</th>
            <th style={styles.th}>Edit</th>
            <th style={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id} style={styles.tr}>
              <td style={styles.td}>{c.name}</td>
              <td style={styles.td}>{c.dateOfBirth}</td>
              <td style={styles.td}>{c.nic}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => openEditModal(c)}
                >
                  Edit
                </button>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteCustomer(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Customer</h3>
            <form onSubmit={handleUpdate} style={styles.modalForm}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editingCustomer.name}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
              </label>

              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editingCustomer.dateOfBirth}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
              </label>

              <label>
                NIC:
                <input
                  type="text"
                  name="nic"
                  value={editingCustomer.nic}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
              </label>

              <div style={styles.modalButtons}>
                <button type="submit" style={styles.button}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={styles.deleteButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    backgroundColor: "black",
    textAlign: "left",
  },
  tr: {
    transition: "background-color 0.2s",
    cursor: "default",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "16px",
    color: "#555",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
};
