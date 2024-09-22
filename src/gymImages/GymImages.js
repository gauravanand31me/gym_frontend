import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GymImages.css';
import Header from '../components/Header';

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images`, {
        headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }, // Replace document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") with the actual login ID or get it from state/context
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append('images', file);
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1"), // Replace document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") with the actual login ID or get it from state/context
        },
      });
      fetchImages();
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images/${imageId}`, {
        headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }, // Replace document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") with the actual login ID or get it from state/context
      });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="gallery-container">
      <Header />
      <h1 className="gallery-header">Gym Image Gallery</h1>
      <label className="upload-button">
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="upload-input"
        />
        <span>Upload New Images</span>
      </label>
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.imageUrl} alt={`Gym Image ${image.id}`} />
              <button className="delete-button" onClick={() => handleImageDelete(image.id)}>✖</button>
            </div>
          ))
        ) : (
          <div className="no-images">No images available. Upload some to get started!</div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
