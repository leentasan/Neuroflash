let flashcards = [
    { id: 1, deckId: 1, question: "Apa ibu kota Jepang?", answer: "Tokyo" },
    { id: 2, deckId: 1, question: "2 + 2?", answer: "4" },
  ];
  
  // Get All Flashcards
  exports.getFlashcards = (req, res) => {
    res.json(flashcards);
  };
  
  // Get Flashcard by ID
  exports.getFlashcardById = (req, res) => {
    const { id } = req.params;
    const flashcard = flashcards.find((f) => f.id == id);
    if (!flashcard) return res.status(404).json({ message: "Not found" });
    res.json(flashcard);
  };
  
  // Create Flashcard
  exports.createFlashcard = (req, res) => {
    const { deckId, question, answer } = req.body;
    const newFlashcard = { id: flashcards.length + 1, deckId, question, answer };
    flashcards.push(newFlashcard);
    res.status(201).json(newFlashcard);
  };
  
  // Update Flashcard
  exports.updateFlashcard = (req, res) => {
    const { id } = req.params;
    const index = flashcards.findIndex((f) => f.id == id);
    if (index === -1) return res.status(404).json({ message: "Not found" });
  
    flashcards[index] = { ...flashcards[index], ...req.body };
    res.json(flashcards[index]);
  };
  
  // Delete Flashcard
  exports.deleteFlashcard = (req, res) => {
    const { id } = req.params;
    flashcards = flashcards.filter((f) => f.id != id);
    res.json({ message: "Deleted successfully" });
  };
  