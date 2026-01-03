import api from './api.js';
import { useState } from "react";

export default function CustomerForm() {
  const [form, setForm] = useState({ name: "", dateOfBirth: "", nic: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      await api.post("/customer", form);
      alert("Customer saved successfully!");
        setForm({ name: "", dateOfBirth: "", nic: "" }); // reset form
        
        if (onSave) onSave();
    } catch (err) {
      console.error(err);
      alert("Error saving customer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add Customer</h2>

      <label style={styles.label}>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          style={styles.input}
          required
        />
      </label>

      <label style={styles.label}>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={form.dob}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </label>

      <label style={styles.label}>
        NIC:
        <input
          type="text"
          name="nic"
          value={form.nic}
          onChange={handleChange}
          placeholder="Enter NIC"
          style={styles.input}
          required
        />
      </label>

      <button type="submit" style={styles.button}>Save</button>
    </form>
  );
}

// Simple inline styles
const styles = {
  form: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold"
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
