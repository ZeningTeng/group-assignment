import React, { useState } from 'react';
import axios from 'axios';

const CrudPage = () => {
  const [mode, setMode] = useState('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setSearchQuery('');
    setResults([]);
    setEditingItem(null);
    setFormData({});
  };

  const handleCreate = async () => {
    try {
      if (mode === 'user') {
        const response = await axios.post('http://localhost:8000/createU', formData);
      
        setResults([response.data]);
      } else {
        const response = await axios.post('http://localhost:8000/createP', formData);
        setResults([response.data]);
      }
      setFormData({});
    } catch (error) {
      console.error('Create error:', error);
      alert('Error during create');
    }
  };

  const handleSearch = async () => {
    try {
      if (mode === 'user') {
        const response = await axios.get('http://localhost:8000/searchU', { params: { name: searchQuery } });
        setResults(response.data.user ? [response.data.user] : []);
      } else {
        const response = await axios.get('http://localhost:8000/searchP', { params: { name: searchQuery } });
        setResults(response.data.product ? [response.data.product] : []);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error during search');
    }
  };

  const handleUpdate = async () => {
    try {
      let response;
      if (mode === 'user') {
        response = await axios.put('http://localhost:8000/updateU', formData);
      } else {
        response = await axios.put('http://localhost:8000/updateP', formData);
      }
      setResults(results.map(item => item.id === response.data.id ? response.data : item));
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating item');
    }
  };

  const handleDelete = async (name) => {
    try {
      if (mode === 'user') {
        await axios.delete('http://localhost:8000/deleteU', { data: { name } });
      } else {
        await axios.delete('http://localhost:8000/deleteP', { data: { name } });
      }
      setResults(results.filter(item => item.name !== name));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting item');
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>CRUD Page</h2>

      <div>
        <label>
          <input type="radio" value="user" checked={mode === 'user'} onChange={handleModeChange} /> User
        </label>
        <label style={{ marginLeft: 20 }}>
          <input type="radio" value="product" checked={mode === 'product'} onChange={handleModeChange} /> Product
        </label>
      </div>
      <br />

      <div>
        <label>
          {mode === 'user' ? 'Enter username:' : 'Enter product name:'}
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
        <button onClick={handleSearch} style={{ marginLeft: 8 }}>Search</button>
        <button onClick={handleCreate} style={{ marginLeft: 8 }}>Create</button>
      </div>
      <hr />

      <div>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                {mode === 'user' ? (
                  <>
                    <th>Name</th>
                    <th>Email</th>
                  </>
                ) : (
                  <>
                    <th>Product Name</th>
                    <th>Price</th>
                  </>
                )}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map(item => (
                <tr key={item.id}>
                  {mode === 'user' ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.originalPrice}</td>
                    </>
                  )}
                  <td>
                    <button onClick={() => startEditing(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.name)} style={{ marginLeft: 8 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <hr />

      <div>
        <h3>{editingItem ? 'Edit Item' : 'Create New Item'}</h3>
        <div>
          {mode === 'user' ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="text"
                  value={formData.email || ''}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={formData.password || ''}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Type:
                <input
                  type="text"
                  value={formData.type || ''}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                ID:
                <input
                  type="text"
                  value={formData.id || ''}
                  onChange={e => setFormData({ ...formData, id: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Name:
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Original Price:
                <input
                  type="text"
                  value={formData.originalPrice || ''}
                  onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Count:
                <input
                  type="text"
                  value={formData.count || ''}
                  onChange={e => setFormData({ ...formData, count: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Weight:
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={e => setFormData({ ...formData, weight: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Material:
                <input
                  type="text"
                  value={formData.material || ''}
                  onChange={e => setFormData({ ...formData, material: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Image Path:
                <input
                  type="text"
                  value={formData.imagePath || ''}
                  onChange={e => setFormData({ ...formData, imagePath: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <br />
              <label>
                Discounted Price:
                <input
                  type="text"
                  value={formData.discountedPrice || ''}
                  onChange={e => setFormData({ ...formData, discountedPrice: e.target.value })}
                  style={{ marginLeft: 8 }}
                />
              </label>
            </>
          )}
          <br />
          {editingItem ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={handleCreate}>Create</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
