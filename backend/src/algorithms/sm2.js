class SM2Algorithm {
    // Static default values
    static INITIAL_EASE_FACTOR = 2.5;
    static MINIMUM_EASE_FACTOR = 1.3;
  
    /**
     * Calculate new review data after a card review
     * @param {Object} currentData - Current card review state
     * @param {number} rating - User's performance rating (0-5)
     * @returns {Object} Updated card review data
     */
    static calculateReview(currentData, rating) {
      // Validate input
      if (rating < 0 || rating > 5) {
        throw new Error('Rating must be between 0 and 5');
      }
  
      // Clone current data to avoid mutation
      const newData = { ...currentData };
  
      // Adjust ease factor
      newData.easeFactor = this.calculateEaseFactor(
        newData.easeFactor || this.INITIAL_EASE_FACTOR, 
        rating
      );
  
      // Handle repetition and interval logic
      if (rating < 3) {
        // Card forgotten - reset repetitions
        newData.repetitions = 0;
        newData.currentInterval = 1;
      } else {
        // Successful recall
        newData.repetitions = (newData.repetitions || 0) + 1;
  
        // Calculate new interval based on repetitions
        newData.currentInterval = this.calculateInterval(
          newData.repetitions, 
          newData.currentInterval || 0, 
          newData.easeFactor
        );
      }
  
      // Set next review date
      newData.nextReviewDate = this.calculateNextReviewDate(
        newData.currentInterval
      );
  
      return newData;
    }
  
    /**
     * Calculate new ease factor based on user rating
     * @param {number} currentEaseFactor - Current ease factor
     * @param {number} rating - User's performance rating
     * @returns {number} Updated ease factor
     */
    static calculateEaseFactor(currentEaseFactor, rating) {
      const newEaseFactor = currentEaseFactor + 
        (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
      
      // Prevent ease factor from dropping too low
      return Math.max(this.MINIMUM_EASE_FACTOR, newEaseFactor);
    }
  
    /**
     * Calculate review interval based on repetitions
     * @param {number} repetitions - Number of successful repetitions
     * @param {number} previousInterval - Previous review interval
     * @param {number} easeFactor - Card's ease factor
     * @returns {number} New review interval in days
     */
    static calculateInterval(repetitions, previousInterval, easeFactor) {
      switch (repetitions) {
        case 0: return 1;
        case 1: return 6;
        case 2: return 6;
        default: 
          return Math.round(previousInterval * easeFactor);
      }
    }
  
    /**
     * Calculate next review date based on interval
     * @param {number} intervalDays - Number of days until next review
     * @returns {Date} Next review date
     */
    static calculateNextReviewDate(intervalDays) {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + intervalDays);
      return nextDate;
    }
  
    /**
     * Initialize a new card's review data
     * @returns {Object} Initial card review data
     */
    static initializeCard() {
      return {
        easeFactor: this.INITIAL_EASE_FACTOR,
        currentInterval: 1,
        repetitions: 0,
        nextReviewDate: new Date()
      };
    }
  }
  
  // Export for use in other modules
  module.exports = SM2Algorithm;