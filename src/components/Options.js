import React from 'react';

const Options = ({ options, handleResponse }) => {
    return (
        <div className="options">
            {options.map((option, index) => (
                <button key={index} onClick={() => handleResponse(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
