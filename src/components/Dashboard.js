import React, { useState, useEffect } from 'react';
import ParticipantSelector from './ParticipantSelector';
import ParticipantCard from './ParticipantCard';
import AddParticipantForm from './AddParticipantForm';
import ParticipantManager from '../models/ParticipantManager';
import '../styles/Dashboard.css';

/**
 * Main dashboard component that brings together all the app functionality
 */
const Dashboard = () => {
  const [participantManager] = useState(() => new ParticipantManager());
  const [participants, setParticipants] = useState([]);
  const [currentParticipantId, setCurrentParticipantId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load participants from localStorage on component mount
  useEffect(() => {
    const loadedSuccessfully = participantManager.loadFromLocalStorage();
    
    // If no participants were loaded from localStorage, add some demo participants
    if (!loadedSuccessfully && participantManager.getAllParticipants().length === 0) {
      participantManager.addParticipant('Alice');
      participantManager.addParticipant('Bob');
      participantManager.addParticipant('Charlie');
      participantManager.saveToLocalStorage();
    }
    
    const allParticipants = participantManager.getAllParticipants();
    setParticipants(allParticipants);
    
    // Set the current participant to the first one if available
    if (allParticipants.length > 0 && !currentParticipantId) {
      setCurrentParticipantId(allParticipants[0].id);
    }
  }, [participantManager, currentParticipantId, refreshTrigger]);

  // Get the current participant object
  const currentParticipant = participantManager.getParticipant(currentParticipantId);

  // Handle adding a new participant
  const handleAddParticipant = (name) => {
    const newParticipant = participantManager.addParticipant(name);
    participantManager.saveToLocalStorage();
    
    // If this is the first participant, set them as current
    if (participants.length === 0) {
      setCurrentParticipantId(newParticipant.id);
    }
    
    // Refresh the participants list
    setRefreshTrigger(prev => prev + 1);
  };

  // Handle increasing beer debt
  const handleIncreaseBeerDebt = (fromId, toId) => {
    participantManager.recordBeerDebt(fromId, toId);
    participantManager.saveToLocalStorage();
    setRefreshTrigger(prev => prev + 1);
  };

  // Handle settling up a beer debt
  const handleSettleUp = (fromId, toId) => {
    participantManager.settleUp(fromId, toId);
    participantManager.saveToLocalStorage();
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Beer Debt Tracker</h2>
          <p className="tagline">Keep track of who owes who a beer!</p>
        </div>
        
        <ParticipantSelector
          participants={participants}
          currentParticipantId={currentParticipantId}
          onSelectParticipant={setCurrentParticipantId}
        />
        
        {currentParticipant && (
          <div className="current-participant-info">
            <div className="participant-banner">
              <div className="current-participant-avatar">
                {currentParticipant.avatarUrl ? (
                  <img src={currentParticipant.avatarUrl} alt={currentParticipant.name} />
                ) : (
                  <div className="avatar-placeholder shirt-pattern">
                    {currentParticipant.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="current-participant-details">
                <h3>Hello, {currentParticipant.name}!</h3>
                <p>
                  You currently owe <strong>{currentParticipant.beersOwed}</strong> beers in total.
                </p>
              </div>
            </div>
            
            <div className="beer-debt-cards">
              {participants.map(participant => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  currentParticipant={currentParticipant}
                  onIncreaseBeerDebt={handleIncreaseBeerDebt}
                  onSettleUp={handleSettleUp}
                />
              ))}
            </div>
          </div>
        )}
        
        <AddParticipantForm onAddParticipant={handleAddParticipant} />
      </div>
    </div>
  );
};

export default Dashboard;
