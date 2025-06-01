/**
 * Participant class to manage beer debt and credit
 */
class Participant {
  constructor(id, name, avatarUrl = null) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.beersOwed = 0; // How many beers this person owes others
    this.beersOwedBy = {}; // Track how many beers are owed by specific people
  }

  /**
   * Increases beer debt by one
   * @param {Participant} toParticipant - The participant to whom the beer is owed
   */
  increaseBeerDebt(toParticipant) {
    this.beersOwed += 1;
    
    // Initialize or increment beers owed to specific participant
    if (!this.beersOwedBy[toParticipant.id]) {
      this.beersOwedBy[toParticipant.id] = 1;
    } else {
      this.beersOwedBy[toParticipant.id] += 1;
    }
  }

  /**
   * Decreases beer debt by one (settling up)
   * @param {Participant} toParticipant - The participant to whom the beer debt is reduced
   * @returns {boolean} Whether the settle up was successful
   */
  settleUp(toParticipant) {
    // Check if there's a debt to this specific participant
    if (this.beersOwedBy[toParticipant.id] && this.beersOwedBy[toParticipant.id] > 0) {
      this.beersOwedBy[toParticipant.id] -= 1;
      this.beersOwed -= 1;
      return true;
    }
    return false;
  }

  /**
   * Get total number of beers owed to a specific participant
   * @param {Participant} participant - The participant to check
   * @returns {number} Number of beers owed
   */
  getBeersOwedTo(participant) {
    return this.beersOwedBy[participant.id] || 0;
  }

  /**
   * Reset all beer debts
   */
  resetDebts() {
    this.beersOwed = 0;
    this.beersOwedBy = {};
  }
}

export default Participant;
