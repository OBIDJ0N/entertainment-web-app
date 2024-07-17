import React from 'react'

const Input = ({state, setState, type, placeholder, className}) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={className}
            />
        </>
    )
}

export default Input