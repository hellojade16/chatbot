# https://aclc-bot.onrender.com/

# AI-Powered Alma Mater Chatbot
This project is a web-based inquiry system designed to automate responses for frequently asked questions regarding school enrollment, facilities, and academic programs. It integrates the Google Gemini API to process natural language queries and provide accurate, context-aware answers.

## Project Overview
The goal of this application is to improve information accessibility for students and parents by reducing the reliance on manual inquiry processing. The system acts as a first-line support tool, handling common questions 24/7.

## Key Features
* **Automated Inquiry Handling:** Instantly answers FAQs about school processes.
* **AI Integration:** Utilizes the Google Gemini API (Generative AI) to understand user intent and generate human-like responses.
* **Web Interface:** specific user-friendly chat interface for seamless interaction.
* **Conversation History:** Maintains context within the chat session for follow-up questions.

## Technologies Used
* **Backend:** Python, Flask
* **AI Model:** Google Generative AI SDK (Gemini API)
* **Frontend:** HTML, CSS, JavaScript
* **Version Control:** Git

## Installation and Setup
1.  Clone the repository:
    ```bash
    git clone [https://github.com/hellojade16/chatbot.git](https://github.com/hellojade16/chatbot.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd chatbot
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up your Google API Key:
    * Obtain an API key from Google AI Studio.
    * Configure it in the environment variables or directly in the application config (ensure keys are not pushed to public repositories).
5.  Run the application:
    ```bash
    python app.py
    ```
