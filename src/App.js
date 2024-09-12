import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceList from './components/ResourceList';
import CreateResourceForm from './components/CreateResourceForm';

function App() {
  const [resources, setResources] = useState([]);

  // Fetch resources from the API
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await axios.get('https://projectapi-1-bhhn.onrender.com/api/resource/');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    }

    fetchResources();
  }, []);

  // Add new resource
  const addResource = async (newResource) => {
    try {
      const response = await axios.post('https://projectapi-1-bhhn.onrender.com/api/resource/', newResource);
      setResources([...resources, response.data]);
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Product Management</h1>
      <CreateResourceForm addResource={addResource} />
      <ResourceList resources={resources} setResources={setResources} />
    </div>
  );
}

export default App;
