document.getElementById('user-input-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from submitting the traditional way
    let userInput = document.getElementById('user-input').value.trim();  // Get and trim the user input
    if (userInput !== "") {  // Only proceed if there's input
        displayMessage(userInput, 'user');  // Display user message
        document.getElementById('user-input').value = '';  // Clear input field
        displayLoadingIndicator();  // Show loading indicator
        sendMessage(userInput);  // Send the message to the backend
    }
});

function sendMessage(userInput) {
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_input=${encodeURIComponent(userInput)}`
    })
    .then(response => response.json())
    .then(data => {
        removeLoadingIndicator();
        let formattedResponse = formatMessage(data.response);  // Format the bot's response
        displayMessage(formattedResponse, 'bot');  // Show the formatted bot response
    })
    .catch(error => {
        removeLoadingIndicator();
        displayMessage("Sorry, I'm having trouble. Please try again later.", 'bot');
    });
}

function displayMessage(message, sender) {
    let chatBox = document.getElementById('chat-box');
    let messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.innerHTML = `<div class="sender-label">${sender === 'user' ? 'You' : 'ACLC-Bot'}</div><p>${message}</p>`;
    chatBox.appendChild(messageElement);
    smoothScrollToBottom(chatBox);  // Scroll to the bottom of the chat
}

function smoothScrollToBottom(element) {
    element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
    });
}

function displayLoadingIndicator() {
    let chatBox = document.getElementById('chat-box');
    let loadingElement = document.createElement('div');
    loadingElement.className = 'message bot-message loading-message';
    loadingElement.innerHTML = '<div class="loading-spinner"></div>';  // Add a spinner
    chatBox.appendChild(loadingElement);
    smoothScrollToBottom(chatBox);
}

function removeLoadingIndicator() {
    let loadingElement = document.querySelector('.loading-message');
    if (loadingElement) {
        loadingElement.remove();
    }
}

function formatMessage(message) {
    // Replace URLs with clickable links
    message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">Click here</a>');

    // Make text between double asterisks bold
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Bold text wrapped in single asterisks (e.g. Telephone or COLLABORATION)
    message = message.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

    // Highlight specific sections with bold labels
    const highlightSections = ["Telephone", "Mobile", "Facebook"];
    highlightSections.forEach(section => {
        const regex = new RegExp('\\*\\*' + section + '\\*\\*', 'g');
        message = message.replace(regex, '<br><strong>' + section + ':</strong>');
    });

    // Handle bullet points and list items
    if (message.includes("*")) {
        // Remove the first asterisk only if it's at the start (to avoid affecting the first word)
        message = message.replace(/^\*/, '');

        // Split the message into sentences or parts based on the asterisk
        let parts = message.split('*');

        // Rebuild the message with the first part left as is (not in a <li>) and the rest in <li> tags
        message = parts[0] + parts.slice(1).map(part => '<li>' + part.trim() + '</li>').join('');

        // Wrap the whole message in <ul>
        message = '<ul>' + message + '</ul>';
    }

    // Remove remaining asterisks
    message = message.replace(/\*\*/g, '');

    // Additional formatting (e.g., replace double newlines with breaks)
    message = message.replace(/(\n\n)/g, '<br><br>');

    return message;
}
