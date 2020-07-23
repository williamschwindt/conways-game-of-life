import React, { useState } from 'react'

const Box = (props) => {
    const setCellStatus = () => {
        props.setBoxStatus(props.row, props.column)
    }
    
    return (
        <div onClick={setCellStatus} className={props.boxClass} id={props.id}/>
    )
}

export default Box