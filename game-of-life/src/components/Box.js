import React, { useState } from 'react'

const Box = (props) => {
    const [status, setStatus] = useState(false)

    const setCellStatus = () => {
        setStatus(!status)
    }

    return (
        <div onClick={setCellStatus} className="box" id={props.id} style={{backgroundColor: `${status ? '#fffb00' : '#747474'}`}}/>
    )
}

export default Box