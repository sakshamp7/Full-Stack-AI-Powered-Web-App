import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            setChat(prevChat => [...prevChat, { user: 'You', text: message }]);

            try {
                const response = await axios.post('http://localhost:5000/api/chat', { message });

                setChat(prevChat => [
                    ...prevChat,
                    { user: 'AI', text: response.data.reply }
                ]);
            } catch (error) {
                console.error("Error fetching AI response:", error);
            }

            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Chat with AI</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {chat.map((msg, index) => (
                    <div key={index} style={{ margin: '5px 0', textAlign: msg.user === 'You' ? 'right' : 'left' }}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%', padding: '10px', marginTop: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>Send</button>
        </div>
    );
};

export default Chat;  // ✅ Ensure this is present
