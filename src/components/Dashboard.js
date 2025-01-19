import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [showImages, setShowImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("authToken");
  const API_ROUTES ="https://server-r06px22ny-saurabhiiitm062s-projects.vercel.app/";

  useEffect(() => {
    if (!token) {
      console.error("No authorization token found.");
      return;
    }

    axios
      .get(`${API_ROUTES}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data, "data received");
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        if (error.response && error.response.status === 403) {
          alert("You do not have permission to view users.");
        }
      });

    const eventSource = new EventSource(`${API_ROUTES}events`);
    eventSource.onmessage = function (event) {
      const updatedUsers = JSON.parse(event.data);
      setUsers(updatedUsers);
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  const toggleImages = (userId, images) => {
    setSelectedImage(null);
    setShowImages((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleImageClick = (imagePath) => {
    window.open(`${API_ROUTES}/${imagePath}`, "_blank");
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Handle</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>@{user.socialHandle}</td>
                <td>
                  <button
                    onClick={() => toggleImages(user._id, user.images)}
                    className="show-images-btn"
                  >
                    {showImages[user._id] ? "Hide Images" : "Show Images"}
                  </button>

                  {showImages[user._id] && (
                    <div className="user-images">
                      {user.images.map((img, index) => {
                        const imagePath = img.replace("public/uploads/", "");
                        return (
                          <div
                            key={index}
                            className="image-thumbnail-container"
                          >
                            <img
                              src={`${API_ROUTES}${imagePath}`}
                              alt={`User ${user.name}`}
                              className="user-image-thumbnail"
                              onClick={() => handleImageClick(imagePath)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${API_ROUTES}${selectedImage}`}
              alt="Selected"
              className="image-modal-img"
            />
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
