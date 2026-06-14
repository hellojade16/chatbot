import os
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types

app = Flask(__name__)

# Initialize client with your API Key
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
# Using 1.5-flash as it is reliable and free-tier friendly
model_name = "gemini-1.5-flash"

# Define the persona and knowledge base once in the system instruction
# This keeps the individual requests small and efficient
system_instruction = """
Act as a friendly chatbot for ACLC Guadalupe. 
You are ACLC-Bot. Your purpose is to answer questions about enrollment, school facilities, and programs. 
If a question is not related to the school, kindly inform the user that you can only provide information about ACLC Guadalupe.
Be helpful, friendly, and provide clear, concise information.
"""

def generate_response(user_input):
    try:
        # Use simple generate_content instead of stream for reliability
        response = client.models.generate_content(
            model=model_name,
            contents=user_input,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return response.text
    except Exception as e:
        # Check if it's a rate limit error (429)
        if "429" in str(e):
            return "I'm currently resting (API quota reached). Please check back in a little while!"
        return "Sorry, I'm having trouble connecting to the AI. Please try again later."

@app.route('/')
def home():
    return render_template('start.html')

@app.route('/chat')
def chatbot_page():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.form.get('user_input', '')
    if not user_input:
        return jsonify({'response': "Please type a question!"})
        
    full_response = generate_response(user_input)
    return jsonify({'response': full_response})

if __name__ == '__main__':
    app.run(debug=True)
