import React, { useState } from 'react';
import { useLinkedList } from '../../../../context/LinkedListContext';
import './Controls.css';

const Controls = () => {
  const { 
    state, 
    initializeList, 
    insertAtHead, 
    insertAtTail, 
    insertAtPosition,
    deleteHead,
    deleteTail,
    deleteAtPosition,
    searchNode,
    setListType,
    resetVisualization
  } = useLinkedList();
  
  const [initialValues, setInitialValues] = useState('10,20,30');
  const [insertValue, setInsertValue] = useState('');
  const [insertPosition, setInsertPosition] = useState(0);
  const [deletePosition, setDeletePosition] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleInitialize = (e) => {
    e.preventDefault();
    const values = initialValues.split(',').map((value) => value.trim());
    const numericValues = values.filter(val => val !== '').map(val => parseInt(val) || val);
    initializeList(numericValues);
    resetVisualization();
  };

  const handleInsert = (e, position) => {
    e.preventDefault();
    const value = insertValue.trim();
    if (value) {
      const numericValue = parseInt(value) || value;
      resetVisualization();
      
      if (position === 'head') {
        insertAtHead(numericValue);
      } else if (position === 'tail') {
        insertAtTail(numericValue);
      } else {
        insertAtPosition(numericValue, parseInt(insertPosition));
      }
      
      setInsertValue('');
    }
  };

  const handleDelete = (e, position) => {
    e.preventDefault();
    resetVisualization();
    
    if (position === 'head') {
      deleteHead();
    } else if (position === 'tail') {
      deleteTail();
    } else {
      deleteAtPosition(parseInt(deletePosition));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim();
    if (value) {
      const numericValue = parseInt(value) || value;
      resetVisualization();
      searchNode(numericValue);
      setSearchValue('');
    }
  };

  const handleListTypeChange = (e) => {
    setListType(e.target.value);
  };

  return (
    <div className="controls-container">
      <div className="controls-grid">
        {/* List Type Selection */}
        <div className="control-group">
          <label className="control-label">List Type</label>
          <select
            value={state.listType}
            onChange={handleListTypeChange}
            className="select-input"
          >
            <option value="singly">Singly Linked List</option>
            <option value="doubly">Doubly Linked List</option>
            <option value="circular">Circular Linked List</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Initialize List</label>
          <form onSubmit={handleInitialize} className="input-with-button">
            <input
              type="text"
              value={initialValues}
              onChange={(e) => setInitialValues(e.target.value)}
              placeholder="Enter values (comma separated)"
              className="text-input"
            />
            <button
              type="submit"
              className="primary-button"
            >
              Create
            </button>
          </form>
        </div>
      </div>

      <div className="operations-grid">
        {/* operations */}
        <div className="operation-card">
          <h3 className="operation-title">Insert Operations</h3>
          
          <div className="operation-controls">
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Value to insert"
              className="text-input full-width"
            />
            
            <div className="button-grid">
              <button
                onClick={(e) => handleInsert(e, 'head')}
                className="secondary-button"
              >
                Insert at Head
              </button>
              
              <button
                onClick={(e) => handleInsert(e, 'tail')}
                className="secondary-button"
              >
                Insert at Tail
              </button>
            </div>
            
            <div className="input-with-button">
              <input
                type="number"
                value={insertPosition}
                onChange={(e) => setInsertPosition(e.target.value)}
                min="0"
                placeholder="Position"
                className="number-input"
              />
              <button
                onClick={(e) => handleInsert(e, 'position')}
                className="secondary-button flex-grow"
              >
                Insert at Position
              </button>
            </div>
          </div>
        </div>

        <div className="operation-card">
          <h3 className="operation-title">Delete Operations</h3>
          
          <div className="operation-controls">
            <div className="button-grid">
              <button
                onClick={(e) => handleDelete(e, 'head')}
                className="accent-button"
              >
                Delete Head
              </button>
              
              <button
                onClick={(e) => handleDelete(e, 'tail')}
                className="accent-button"
              >
                Delete Tail
              </button>
            </div>
            
            <div className="input-with-button">
              <input
                type="number"
                value={deletePosition}
                onChange={(e) => setDeletePosition(e.target.value)}
                min="0"
                placeholder="Position"
                className="number-input"
              />
              <button
                onClick={(e) => handleDelete(e, 'position')}
                className="accent-button flex-grow"
              >
                Delete at Position
              </button>
            </div>
          </div>
        </div>

        {/* search*/}
        <div className="operation-card">
          <h3 className="operation-title">Search Operation</h3>
          
          <form onSubmit={handleSearch} className="input-with-button">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Value to search"
              className="text-input"
            />
            <button
              type="submit"
              className="primary-button"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Controls;