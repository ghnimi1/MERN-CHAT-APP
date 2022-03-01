import React from 'react'
const Room = ({ name }) => {
    return (
        <div style={{
            border: "1px solid #ddd", margin: '3px',
            borderRadius: '3px'
        }}>
            <div >
                <p style={{ marginLeft: '5px' }}>{name}</p>
            </div>
        </div>

    )
}

export default Room
