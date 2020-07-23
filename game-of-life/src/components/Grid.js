import React, { useState, useEffect } from 'react'
import Box from './Box'

const Grid = () => {
    const rows = 20
    const columns = 20

    // 2D array
    const [grid, setGrid] = useState(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
    console.log(grid)
    const firstBoxList = []
    const [boxList, setBoxList] = useState(firstBoxList)

    const [generations, setGenerations] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    //initial grid render
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {

            let box = <Box key={`${i}_${j}`} setBoxStatus={setBoxStatus} boxClass={grid[i][j] ? 'box-alive' : 'box-dead'} id={`${i}_${j}`} row={i} column={j} />

            firstBoxList.push(box)
        }
    }

    //update cell on click, sets new grid, calls updateBox
    function setBoxStatus(row, column) {
        let gridCopy = grid

        if (gridCopy[row][column]) {
            gridCopy[row][column] = false
        } else {
            gridCopy[row][column] = true
        }

        setGrid(gridCopy)
        updateBox()
    }

    //updates rendered boxes (yellow or grey)
    const updateBox = () => {
        let newBoxList = []
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
    
                let box = <Box key={`${i}_${j}`} setBoxStatus={setBoxStatus} boxClass={grid[i][j] ? 'box-alive' : 'box-dead'} id={`${i}_${j}`} row={i} column={j} />
    
                newBoxList.push(box)
            }
        }
        setBoxList(newBoxList)
    }

    /*
    play button
        tell every cell that it can no longer be clicked
        timeout function
            copy current grid
            apply rules to copy grid
            set copy grid to state
    */

    const play = () => {
        setIsPlaying(true)
    }

    const pause = () => {
        setIsPlaying(false)
    }

    const killCell = (row, col) => {
        let gridCopy = grid

        gridCopy[row][col] = false

        setGrid(gridCopy)
        updateBox()
    }

    const reviveCell = (row, col) => {
        let gridCopy = grid

        gridCopy[row][col] = true

        setGrid(gridCopy)
        updateBox()
    }

    const findNewGrid = () => {
        let gridCopy = grid
        let neirborsArray = findNeirbors()
        let neirborsCount = 0

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                //If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
                if((gridCopy[i][j] && neirborsArray[neirborsCount] === 0) || (gridCopy[i][j] && neirborsArray[neirborsCount] === 1) || (gridCopy[i][j] && neirborsArray[neirborsCount] > 3)) {
                    killCell(i,j)
                }

                //If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
                if(gridCopy[i][j] === false && neirborsArray[neirborsCount] === 3) {
                    reviveCell(i,j)
                }
                neirborsCount += 1
            }
        }
    }

    const findNeirbors = () => {
        let gridCopy = grid
        const wholeGridNeirbors = []

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let count = 0

                //left up
                if(gridCopy[i - 1] !== undefined) {
                    if(gridCopy[i - 1][j - 1] === true) {
                        count += 1
                    }
                }
                //left
                if(gridCopy[i][j - 1] === true) {
                    count += 1
                }

                //left down
                if(gridCopy[i + 1] !== undefined) {
                    if(gridCopy[i + 1][j - 1] === true) {
                        count += 1
                    }
                }

                //down
                if(gridCopy[i + 1] !== undefined) {
                    if(gridCopy[i + 1][j] === true) {
                        count += 1
                    }
                }

                //right down
                if(gridCopy[i + 1] !== undefined) {
                    if(gridCopy[i + 1][j + 1] === true) {
                        count += 1
                    }
                }

                //right
                if(gridCopy[i][j + 1] === true) {
                    count += 1
                }
                
                //right up
                if(gridCopy[i - 1] !== undefined) {
                    if(gridCopy[i - 1][j + 1] === true) {
                        count += 1
                    }
                }

                //up
                if(gridCopy[i - 1] !== undefined) {
                    if(gridCopy[i - 1][j] === true) {
                        count += 1
                    }
                }

                wholeGridNeirbors.push(count)
            }
        }
        return wholeGridNeirbors
    }

    useEffect(() => {
        if(isPlaying) {
            const interval = setInterval(() => {
                findNewGrid()
                console.log(generations)
                setGenerations(generations + 1)
            }, 250)
            return () => clearInterval(interval)
        }
    })
    

    return (
        <div className="grid-container">
            <div className="grid" style={{width: `${rows * 12}px`}}>
                {boxList.map(box => {
                    return box
                })}
            </div>
            <div className="buttons">
                <h2 onClick={play}>Play</h2>
                <h2 onClick={pause}>Pause</h2>
            </div>
        </div>
    )
}

export default Grid