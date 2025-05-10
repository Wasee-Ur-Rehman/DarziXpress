import React, { useState } from 'react';

const PostServiceForm = () => {
  const [service, setService] = useState({
    title: '',
    category: '',
    price: '',
    availability: '',
    provider: '',
    location: '',
    rating: '',
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: value,
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    console.log('Form submitted:', { ...service, thumbnail });
    alert('Service posted successfully!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Post a Service</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Service Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={service.title}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Men's 2-Piece Suit Stitching"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={service.category}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Men's Formal"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (PKR)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={service.price}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 8500"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
          <select
            id="availability"
            name="availability"
            value={service.availability}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled hidden>Select Availability</option>
            <option value="Fixed">Fixed</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="mt-2 block w-full text-sm text-gray-700"
          />
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Preview:</p>
              <img src={preview} alt="Thumbnail Preview" className="mt-1 h-32 rounded-md border object-cover" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Post Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostServiceForm;
