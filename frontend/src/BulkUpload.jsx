import api from "./api.js";
import { useState } from "react";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/customer/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
        setFile(null);
        if (onUpload) onUpload();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Bulk Upload Customers</h2>

      <form onSubmit={upload} style={styles.form}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        {file && <p style={styles.filename}>Selected file: {file.name}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

// Inline styling
const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  filename: {
    fontSize: "14px",
    color: "#555"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  }
};
