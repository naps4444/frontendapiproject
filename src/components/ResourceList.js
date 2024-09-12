import React, { useState } from 'react';
import axios from 'axios';

function ResourceList({ resources, setResources }) {
  // State to track which resource is being edited
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // Function to delete a resource by ID
  const deleteResource = async (id) => {
    try {
      // Make a DELETE request to the backend
      await axios.delete(`https://projectapi-1-bhhn.onrender.com/api/resource/${id}`);
      
      // Update the state to remove the deleted resource
      const updatedResources = resources.filter((resource) => resource._id !== id);
      setResources(updatedResources);
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  // Function to update a resource by ID
  const updateResource = async (id) => {
    try {
      const updatedResource = {
        name: editedName,
        description: editedDescription,
      };

      // Make a PUT request to update the resource in the backend
      await axios.put(`https://projectapi-1-bhhn.onrender.com/api/resource/${id}`, updatedResource);

      // Update the state with the updated resource
      const updatedResources = resources.map((resource) =>
        resource._id === id ? { ...resource, name: editedName, description: editedDescription } : resource
      );
      setResources(updatedResources);

      // Reset editing states
      setEditingResourceId(null);
      setEditedName('');
      setEditedDescription('');
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  // Function to handle click on "Edit" button
  const handleEditClick = (resource) => {
    setEditingResourceId(resource._id);
    setEditedName(resource.name);
    setEditedDescription(resource.description);
  };

  return (
    <div className="mt-8 w-10/12 lg:w-8/12 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Product</h2>
      {resources.length === 0 ? (
        <p>No product available. Add a new product!</p>
      ) : (
        <ul className="space-y-4">
          {resources.map((resource) => (
            <li key={resource._id} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                {/* Displaying resource details or edit form */}
                {editingResourceId === resource._id ? (
                  <div>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                    <button
                      onClick={() => updateResource(resource._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold">{resource.name}</h3>
                    <p>{resource.description}</p>
                  </div>
                )}
              </div>

              {/* Edit and Delete buttons */}
              <div className="flex space-x-2 px-2 lg:px-4">
                {editingResourceId !== resource._id && (
                  <button
                    onClick={() => handleEditClick(resource)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteResource(resource._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResourceList;
