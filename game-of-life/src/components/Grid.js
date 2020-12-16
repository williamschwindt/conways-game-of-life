import React, { useState, useEffect } from 'react'
import Box from './Box'
import { glider, exploder, gosperGliderGun } from './patterns'

const Grid = () => {
    const rows = 40
    const columns = 40

    // 2D array
    const [grid, setGrid] = useState(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
    const [boxList, setBoxList] = useState([])
    const [generations, setGenerations] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [gen, setGen] = useState(0)
    const [speed, setSpeed] = useState(100)

    const changeHandler = (e) => {
        setGen(e.target.value)
    }

    const changeSpeed = (e) => {
        setSpeed(e.target.value)
    }

    // grid render
    useEffect(() => {
        let newBoxList = []
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
    
                let box = <Box key={`${i}_${j}`} setBoxStatus={setBoxStatus} boxClass={grid[i][j] ? 'box-alive' : 'box-dead'} id={`${i}_${j}`} row={i} column={j} />
    
                newBoxList.push(box)
            }
        }
        setBoxList(newBoxList)
    }, [grid])


    //update cell on click, sets new grid, triggers grid rerender
    function setBoxStatus(row, column) {
        const gridCopy = grid.map(arr => arr.slice(0))
        
        if (gridCopy[row][column]) {
            gridCopy[row][column] = false
        } else {
            gridCopy[row][column] = true
        }

        setGrid(gridCopy)
    }

    //buttons and patterns
    const play = () => {
        setIsPlaying(true)
    }

    const pause = () => {
        setIsPlaying(false)
    }

    const stepThrough = () => {
        placeNewGrid(findNewGrid(grid))
    }

    const clear = () => {
        setIsPlaying(false)
        setGrid(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
        setGenerations(0)
    }

    //patterns in seperate file
    const setGlider = () => {
        setGrid(glider(grid))
    }

    const setExploder = () => {
        setGrid(exploder(grid))
    }

    const setGosperGliderGun = () => {
        setGrid(gosperGliderGun(grid))
    }

    const random = () => {
        const gridCopy = grid.map(arr => arr.slice(0))
        for(let i = 0; i < gridCopy.length; i++) {
            for(let j = 0; j < gridCopy[i].length; j++) {
                const rand = Math.random()
                if (rand > .8) {
                    gridCopy[i][j] = true
                }
            }
        }

        setGrid(gridCopy)
    }

    //loops through the games logic until the grid at the specified generation is found
    // counts the generation currently on as gen 0
    const skipToGeneration = () => {
        let copyGrid = grid.map(arr => arr.slice(0))
        for(let i = 0; i < gen; i ++) {
            copyGrid = findNewGrid(copyGrid)
        }
        setGrid(copyGrid)
        setGenerations(generations + parseInt(gen))
    }

    //loops through every cell to calculate neighbors then perfors games logic on cell
    const findNewGrid = (oldGrid) => {
        const copyGrid = oldGrid.map(arr => arr.slice(0))

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let count = 0

                //left up
                if(oldGrid[i - 1] !== undefined) {
                    if(oldGrid[i - 1][j - 1] === true) {
                        count += 1
                    }
                }
                //left
                if(oldGrid[i][j - 1] === true) {
                    count += 1
                }

                //left down
                if(oldGrid[i + 1] !== undefined) {
                    if(oldGrid[i + 1][j - 1] === true) {
                        count += 1
                    }
                }

                //down
                if(oldGrid[i + 1] !== undefined) {
                    if(oldGrid[i + 1][j] === true) {
                        count += 1
                    }
                }

                //right down
                if(oldGrid[i + 1] !== undefined) {
                    if(oldGrid[i + 1][j + 1] === true) {
                        count += 1
                    }
                }

                //right
                if(oldGrid[i][j + 1] === true) {
                    count += 1
                }
                
                //right up
                if(oldGrid[i - 1] !== undefined) {
                    if(oldGrid[i - 1][j + 1] === true) {
                        count += 1
                    }
                }

                //up
                if(oldGrid[i - 1] !== undefined) {
                    if(oldGrid[i - 1][j] === true) {
                        count += 1
                    }
                }

                //If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
                if((oldGrid[i][j] && count === 0) || (oldGrid[i][j] && count === 1) || (oldGrid[i][j] && count > 3)) {
                    copyGrid[i][j] = false
                }

                //If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
                if(oldGrid[i][j] === false && count === 3) {
                    copyGrid[i][j] = true
                }
            }
        }
        return copyGrid
    }

    const placeNewGrid = (newGrid) => {
        setGenerations(generations + 1)
        setGrid(newGrid)
    }

    //main game loop
    useEffect(() => {
        if(isPlaying) {
            const interval = setInterval(() => {
                placeNewGrid(findNewGrid(grid))
            }, speed)
            return () => clearInterval(interval)
        }
    }, [grid, isPlaying])
    
    return (
        <div className="game-container">
            <div className="info-container">
                <h1>Conway's game of life</h1>
                <h2>Rules:</h2>
                <p>If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</p>
                <p>If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.</p>
            </div>
            <div className="grid-container">
                <p>Generation: {generations}</p>
                <div className="main-btns">
                    <button type="button" className="nes-btn is-primary" onClick={play}>Play</button>
                    <button type="button" className="nes-btn is-error" onClick={pause}>Pause</button>
                    <button type="button" className="nes-btn is-success" onClick={stepThrough}>Next</button>
                    <button type="button" className="nes-btn" onClick={clear}>Clear</button>
                    <div className="speed-box">
                        <h3>Speed</h3>
                        <input type="range" min="10" max="1000" value={speed} onChange={changeSpeed}/>
                    </div>
                </div>
                <div className="grid-btns">
                    <div className="grid nes-container is-dark" style={{width: `${rows * 12.1}px`}}>
                        {boxList}
                            {/* {grid.map((rows, i) => {
                                return (
                                    <>
                                    {rows.map((colums, j) => {
                                        return (
                                            <Box key={`${i}_${j}`} setBoxStatus={setBoxStatus} boxClass={grid[i][j] ? 'box-alive' : 'box-dead'} id={`${i}_${j}`} row={i} column={j} />
                                        )
                                    })}
                                    </>
                                )
                            })} */}
                    </div>
                    <div className="buttons">
                        <button type="button" className="nes-btn is-warning" onClick={setGlider}>Glider</button>
                        <button type="button" className="nes-btn is-warning" onClick={setExploder}>Exploder</button>
                        <button type="button" className="nes-btn is-warning" onClick={setGosperGliderGun}>Glider Gun</button>
                        <button type="button" className="nes-btn is-warning" onClick={random}>Random</button>
                    </div>
                </div>
                <div className="skip-btn">
                    <input onChange={changeHandler} placeholder="skip to generation"/>
                    <button type="button" className="nes-btn is-primary" onClick={skipToGeneration}>Skip</button>
                </div>
            </div>
        </div>
    )
}

export default Grid