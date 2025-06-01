/**
 * Manager class for handling a collection of participants and their beer debts
 */
import Participant from './Participant';

class ParticipantManager {
  constructor() {
    this.participants = [];
    this.nextId = 1;
  }

  /**
   * Add a new participant
   * @param {string} name - Participant name
   * @param {string} avatarUrl - Optional avatar URL
   * @returns {Participant} The newly created participant
   */
  addParticipant(name, avatarUrl = null) {
    const participant = new Participant(this.nextId++, name, avatarUrl);
    this.participants.push(participant);
    return participant;
  }

  /**
   * Remove a participant
   * @param {number} id - Participant ID
   * @returns {boolean} Whether the participant was removed
   */
  removeParticipant(id) {
    const initialLength = this.participants.length;
    this.participants = this.participants.filter(p => p.id !== id);
    return initialLength !== this.participants.length;
  }

  /**
   * Get a participant by ID
   * @param {number} id - Participant ID
   * @returns {Participant|null} The participant or null if not found
   */
  getParticipant(id) {
    return this.participants.find(p => p.id === id) || null;
  }

  /**
   * Record that one participant owes a beer to another
   * @param {number} fromId - ID of the participant who owes the beer
   * @param {number} toId - ID of the participant who is owed the beer
   * @returns {boolean} Whether the transaction was successful
   */
  recordBeerDebt(fromId, toId) {
    const fromParticipant = this.getParticipant(fromId);
    const toParticipant = this.getParticipant(toId);
    
    if (!fromParticipant || !toParticipant) {
      return false;
    }
    
    fromParticipant.increaseBeerDebt(toParticipant);
    return true;
  }

  /**
   * Settle up a beer debt between participants
   * @param {number} fromId - ID of the participant who owes the beer
   * @param {number} toId - ID of the participant who is owed the beer
   * @returns {boolean} Whether the settle up was successful
   */
  settleUp(fromId, toId) {
    const fromParticipant = this.getParticipant(fromId);
    const toParticipant = this.getParticipant(toId);
    
    if (!fromParticipant || !toParticipant) {
      return false;
    }
    
    return fromParticipant.settleUp(toParticipant);
  }

  /**
   * Get all participants
   * @returns {Array<Participant>} All participants
   */
  getAllParticipants() {
    return [...this.participants];
  }

  /**
   * Save participants to localStorage
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem('skjortan-participants', JSON.stringify(this.participants));
      localStorage.setItem('skjortan-nextId', this.nextId.toString());
    } catch (error) {
      console.error('Failed to save participants to localStorage:', error);
    }
  }

  /**
   * Load participants from localStorage
   * @returns {boolean} Whether loading was successful
   */
  loadFromLocalStorage() {
    try {
      const participantsData = localStorage.getItem('skjortan-participants');
      const nextIdData = localStorage.getItem('skjortan-nextId');
      
      if (!participantsData) {
        return false;
      }
      
      // Parse the stored data
      const parsedData = JSON.parse(participantsData);
      
      // Recreate participant objects with proper methods
      this.participants = parsedData.map(data => {
        const participant = new Participant(data.id, data.name, data.avatarUrl);
        participant.beersOwed = data.beersOwed;
        participant.beersOwedBy = data.beersOwedBy;
        return participant;
      });
      
      if (nextIdData) {
        this.nextId = parseInt(nextIdData, 10);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to load participants from localStorage:', error);
      return false;
    }
  }

  /**
   * Reset all data and remove from localStorage
   */
  reset() {
    this.participants = [];
    this.nextId = 1;
    try {
      localStorage.removeItem('skjortan-participants');
      localStorage.removeItem('skjortan-nextId');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

export default ParticipantManager;
