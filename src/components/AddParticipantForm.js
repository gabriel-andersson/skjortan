import React, { useState } from 'react';
import '../styles/AddParticipantForm.css';

/**
 * Form component for adding new participants to the app
 */
const AddParticipantForm = ({ onAddParticipant }) => {
  const [name, setName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim()) {
      onAddParticipant(name.trim());
      setName('');
      setIsFormVisible(false);
    }
  };

  if (!isFormVisible) {
    return (
      <div className="add-participant-button-container">
        <button 
          className="button button-primary add-participant-button"
          onClick={() => setIsFormVisible(true)}
        >
          <span className="add-icon">+</span> Add New Participant
        </button>
      </div>
    );
  }

  return (
    <div className="add-participant-form-container card animate-slide-up">
      <h3>Add New Participant</h3>
      <form onSubmit={handleSubmit} className="add-participant-form">
        <div className="form-group">
          <label htmlFor="participant-name" className="form-label">Name</label>
          <input
            type="text"
            id="participant-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter participant name"
            autoFocus
          />
        </div>
        <div className="form-buttons">
          <button 
            type="button" 
            className="button"
            onClick={() => setIsFormVisible(false)}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="button button-primary"
            disabled={!name.trim()}
          >
            Add Participant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParticipantForm;
