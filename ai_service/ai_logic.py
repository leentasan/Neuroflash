from transformers import pipeline

# Load AI model (Replace with a better model later)
qa_pipeline = pipeline("question-generation")

def generate_flashcards(text):
    """ Generate flashcards using AI model """
    questions = qa_pipeline(text)
    return [{"question": q["question"], "answer": q["answer"]} for q in questions]
