import React, { useState } from "react";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      alert(result.message);
      setFormData({ name: "", description: "", file: null });
    } catch (error) {
      console.error("Error uploading model:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Upload 3D Model</h2>
      <input
        type="text"
        name="name"
        placeholder="Model Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Model Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="modelUrl"
        placeholder="3D Model URL (GLB/GLTF)"
        value={formData.modelUrl}
        onChange={handleChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
