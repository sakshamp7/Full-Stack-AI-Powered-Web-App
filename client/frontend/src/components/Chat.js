import react, { useState } from 'react';
import axios from 'axios';

const chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            setChat([...chat, { user: 'you', text: message}]);
            setMessage('');
            try {
                const response = await axios.post('http://localhost:5000/api/chat', {message});
                setChat([...chat, { user: 'you', text: message}, {use: 'AI', text:response .data.reply } ]);
            } catch(error) {
                console.error(error);
            }
        }
    }
}