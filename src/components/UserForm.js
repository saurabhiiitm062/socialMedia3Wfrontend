import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
    images: [],
  });
  const API_ROUTES =
    "https://server-aslpopwc0-saurabhiiitm062s-projects.vercel.app/";

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialHandle", formData.socialHandle);

    Array.from(formData.images).forEach((file) => {
      data.append("images", file);
    });

    try {
      // Make API request to upload data
      await axios.post(`${API_ROUTES}api/submit`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Submission Successful!");
      setFormData({ name: "", socialHandle: "", images: [] });
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        placeholder="Enter your name"
        onChange={handleInputChange}
        className="form-input"
        required
      />
      <label htmlFor="socialHandle" className="form-label">
        Social Media Handle
      </label>
      <input
        type="text"
        id="socialHandle"
        name="socialHandle"
        value={formData.socialHandle}
        placeholder="Enter your social handle"
        onChange={handleInputChange}
        className="form-input"
        required
      />

      <label htmlFor="images" className="form-label">
        Upload Images
      </label>
      <input
        type="file"
        id="images"
        name="images"
        multiple
        onChange={handleFileChange}
        className="file-input"
        accept="image/*"
        required
      />

      {/* Show image previews */}
      {formData.images.length > 0 && (
        <div className="image-previews">
          {Array.from(formData.images).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)} //preview URL for each image
              alt={`Preview ${index}`}
              className="image-preview"
            />
          ))}
        </div>
      )}

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
}

export default UserForm;
