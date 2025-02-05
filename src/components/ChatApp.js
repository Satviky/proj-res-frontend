import React from 'react';
import { Link } from 'react-router-dom';

const contacts = [
    { id: 'orion', name: 'Orion' },
    { id: 'ollie', name: 'Ollie' },
    { id: 'prisha', name: 'Prisha' },
    { id: 'quintin', name: 'Quintin' },
    { id: 'gc', name: 'GC (Prisha & Quintin)' },
    { id: 'kira', name: 'Kira' },
    { id: 'npc1', name: 'NPC 1' },
    { id: 'npc2', name: 'NPC 2' }
];

const ChatApp = () => {
    return (
        <div className="contact-list">
            {contacts.map(contact => (
                <div key={contact.id} className="contact">
                    <Link to={`/chat/${contact.id}`}>{contact.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default ChatApp;
