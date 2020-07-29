import React, { useState, useEffect } from 'react'
import Box from './Box'
import { glider, exploder, gosperGliderGun } from './patterns'

const Grid = () => {
    const rows = 40
    const columns = 40

    // 2D array
    const [grid, setGrid] = useState(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
    console.log(grid)
    const [boxList, setBoxList] = useState([])
    const [generations, setGenerations] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [gen, setGen] = useState(0)

    const changeHandler = (e) => {
        setGen(e.target.value)
    }

    //grid render
    useEffect(() => {
        let newBoxList = []
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
    
                let box = <Box key={`${i}_${j}`} setBoxStatus={setBoxStatus} boxClass={grid[i][j] ? 'box-alive' : 'box-dead'} id={`${i}_${j}`} row={i} column={j} />
    
                newBoxList.push(box)
            }
        }
        setBoxList(newBoxList)
    }, [grid])


    //update cell on click, sets new grid, triggers grid rerender
    function setBoxStatus(row, column) {
        console.log("setBoxStatus ran")
        const gridCopy = grid.map(arr => arr.slice(0))
        console.log(gridCopy)
        
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
        findNewGrid()
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

    //creates a copy of the grid and loops through the games logic until the grid at the specified generation is found
    //counts the generation currently on as gen 0
    const skipToGeneration = () => {
        const gridCopy = grid.map(arr => arr.slice(0))

        for(let i = 0; i < gen; i ++) {
            let neighborsArray = findNeighbors(gridCopy)
            let neighborsCount = 0

            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < columns; j++) {
                    //If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
                    if((gridCopy[i][j] && neighborsArray[neighborsCount] === 0) || (gridCopy[i][j] && neighborsArray[neighborsCount] === 1) || (gridCopy[i][j] && neighborsArray[neighborsCount] > 3)) {
                        gridCopy[i][j] = false
                    }
    
                    //If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
                    if(gridCopy[i][j] === false && neighborsArray[neighborsCount] === 3) {
                        gridCopy[i][j] = true
                    }
                    neighborsCount += 1
                }
            }
        }
        setGrid(gridCopy)
        setGenerations(parseInt(gen))
    }

    //creates copy grid, performs games logic, sets copy grid to state
    const findNewGrid = () => {
        console.log('findNewGrid ran')
        const gridCopy = grid.map(arr => arr.slice(0))
        let neighborsArray = findNeighbors(gridCopy)
        let neighborsCount = 0

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                //If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
                if((gridCopy[i][j] && neighborsArray[neighborsCount] === 0) || (gridCopy[i][j] && neighborsArray[neighborsCount] === 1) || (gridCopy[i][j] && neighborsArray[neighborsCount] > 3)) {
                    gridCopy[i][j] = false
                }

                //If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
                if(gridCopy[i][j] === false && neighborsArray[neighborsCount] === 3) {
                    gridCopy[i][j] = true
                }
                neighborsCount += 1
            }
        }
        setGrid(gridCopy)
    }

    //loops through entire grid and returns an array of each cells neighbors
    const findNeighbors = (calcGrid) => {
        console.log('findNairbors ran')
        const wholeGridNeighbors = []

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let count = 0

                //left up
                if(calcGrid[i - 1] !== undefined) {
                    if(calcGrid[i - 1][j - 1] === true) {
                        count += 1
                    }
                }
                //left
                if(calcGrid[i][j - 1] === true) {
                    count += 1
                }

                //left down
                if(calcGrid[i + 1] !== undefined) {
                    if(calcGrid[i + 1][j - 1] === true) {
                        count += 1
                    }
                }

                //down
                if(calcGrid[i + 1] !== undefined) {
                    if(calcGrid[i + 1][j] === true) {
                        count += 1
                    }
                }

                //right down
                if(calcGrid[i + 1] !== undefined) {
                    if(calcGrid[i + 1][j + 1] === true) {
                        count += 1
                    }
                }

                //right
                if(calcGrid[i][j + 1] === true) {
                    count += 1
                }
                
                //right up
                if(calcGrid[i - 1] !== undefined) {
                    if(calcGrid[i - 1][j + 1] === true) {
                        count += 1
                    }
                }

                //up
                if(calcGrid[i - 1] !== undefined) {
                    if(calcGrid[i - 1][j] === true) {
                        count += 1
                    }
                }

                wholeGridNeighbors.push(count)
            }
        }
        return wholeGridNeighbors
    }

    //main game loop
    //sets interval that calls findNewGrid
    useEffect(() => {
        if(isPlaying) {
            const interval = setInterval(() => {
                findNewGrid()
                setGenerations(generations + 1)
            }, 100)
            return () => clearInterval(interval)
        }
    })
    

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
                </div>
                <div className="grid-btns">
                    <div className="grid nes-container is-dark" style={{width: `${rows * 12.1}px`}}>
                            {boxList.map(box => {
                                return box
                            })}
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