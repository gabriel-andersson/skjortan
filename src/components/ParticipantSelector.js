import React from 'react';
import '../styles/ParticipantSelector.css';

/**
 * Component for selecting the current active participant
 */
const ParticipantSelector = ({ 
  participants, 
  currentParticipantId, 
  onSelectParticipant 
}) => {
  if (!participants || participants.length === 0) {
    return null;
  }

  return (
    <div className="participant-selector">
      <div className="selector-header">
        <h3>Select Current Participant</h3>
        <p className="selector-subtitle">
          Choose who is using the app right now to track beer debts
        </p>
      </div>
      
      <div className="participant-list">
        {participants.map(participant => (
          <div 
            key={participant.id}
            className={`participant-item ${participant.id === currentParticipantId ? 'active' : ''}`}
            onClick={() => onSelectParticipant(participant.id)}
          >
            <div className="participant-avatar">
              {participant.avatarUrl ? (
                <img src={participant.avatarUrl} alt={participant.name} />
              ) : (
                <div className="avatar-placeholder shirt-pattern">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="participant-details">
              <span className="participant-name">{participant.name}</span>
              <span className="participant-stats">
                {participant.beersOwed} beers owed
              </span>
            </div>
            {participant.id === currentParticipantId && (
              <div className="current-indicator">
                <span role="img" aria-label="Current">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantSelector;
