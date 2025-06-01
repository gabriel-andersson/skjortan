import React from 'react';
import '../styles/ParticipantCard.css';

/**
 * ParticipantCard component displays information about a single participant
 * and provides buttons for beer debt interaction
 */
const ParticipantCard = ({ 
  participant, 
  currentParticipant,
  onIncreaseBeerDebt, 
  onSettleUp 
}) => {
  // Don't render a card for comparing a participant with themselves
  if (participant.id === currentParticipant?.id) {
    return null;
  }

  const beersOwed = currentParticipant?.getBeersOwedTo(participant) || 0;
  const canSettleUp = beersOwed > 0;

  return (
    <div className="participant-card card animate-fade-in">
      <div className="participant-info">
        <div className="participant-avatar">
          {participant.avatarUrl ? (
            <img src={participant.avatarUrl} alt={participant.name} />
          ) : (
            <div className="avatar-placeholder shirt-pattern">
              {participant.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h3 className="participant-name">{participant.name}</h3>
      </div>
      
      <div className="beer-counter">
        <div className="beer-icons">
          {Array.from({ length: beersOwed }).map((_, index) => (
            <span key={index} role="img" aria-label="Beer" className="beer-icon">
              🍺
            </span>
          ))}
          {beersOwed === 0 && (
            <span className="no-beers">No beers owed</span>
          )}
        </div>
        <div className="beer-count">
          <span className="count-number">{beersOwed}</span>
          <span className="count-label">beers owed</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button
          className="button button-primary"
          onClick={() => onIncreaseBeerDebt(currentParticipant.id, participant.id)}
        >
          I Owe a Beer
        </button>
        
        <button
          className="button button-success"
          onClick={() => onSettleUp(currentParticipant.id, participant.id)}
          disabled={!canSettleUp}
        >
          Settle Up
        </button>
      </div>
    </div>
  );
};

export default ParticipantCard;
