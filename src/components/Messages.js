import React from 'react';

const Messages = ({ messages }) => {
    return (
        <div className="messages">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                    {message.text}
                </div>
            ))}
        </div>
    );
};

export default Messages;
