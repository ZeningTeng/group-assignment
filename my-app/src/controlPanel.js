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


  const handleSearch = async () => {
    try {
      if (mode === 'user') {
      
        const response = await axios.get('http://localhost:8000/searchU', {
          params: { name:searchQuery },
        });
        const result = response.data.user;
const resultArray = result ? [result] : [];
setResults(resultArray);
      } else if (mode === 'product') {
      
        const response = await axios.get('http://localhost:8000/searchP', {
          params: { name: searchQuery },
        });
           const result = response.data.product;
const resultArray = result ? [result] : [];
setResults(resultArray);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error during search');
    }
  };



  const handleUpdate = async () => {
    try {
      if (mode === 'user') {
        const response = await axios.put(
          `http://localhost:8000/api/users/${editingItem.id}`,
          formData
        );
        const updatedItems = results.map(item =>
          item.id === editingItem.id ? response.data : item
        );
        setResults(updatedItems);
      } else if (mode === 'product') {
        const response = await axios.put(
          `http://localhost:8000/api/products/${editingItem.id}`,
          formData
        );
        const updatedItems = results.map(item =>
          item.id === editingItem.id ? response.data : item
        );
        setResults(updatedItems);
      }
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
      } else if (mode === 'product') {
        await axios.delete(`http://localhost:8000/api/products/`);
      }
      const filtered = results.filter(item => item.name !== name);
      setResults(filtered);
    
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
          <input
            type="radio"
            value="user"
            checked={mode === 'user'}
            onChange={handleModeChange}
          />
          User
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="product"
            checked={mode === 'product'}
            onChange={handleModeChange}
          />
          Product
        </label>
      </div>
      <br />

      <div>
        {mode === 'user' ? (
          <div>
            <label>
              Enter username:
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
        ) : (
          <div>
            <label>
              Enter product name:
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
        )}
        <button onClick={handleSearch}>Search</button>
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
                    <th>name</th>
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
              {results.map((item) => (
                <tr key={item.name}>
               
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
                    <button onClick={() => handleDelete(item.name)}>Delete</button>
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
                Username:
                <input
                  type="text"
                  value={formData.username || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="text"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Product Name:
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </label>
            </>
          )}
          <br />
          {editingItem ? (
            <button onClick={handleUpdate}>Update</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
