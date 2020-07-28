import React, { useState, useEffect } from 'react'
import Box from './Box'

const Grid = () => {
    const rows = 40
    const columns = 40

    // 2D array
    const [grid, setGrid] = useState(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
    console.log(grid)
    const [boxList, setBoxList] = useState([])

    const [generations, setGenerations] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

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

    const stepThrough = () => {
        findNewGrid()
    }

    const clear = () => {
        setGrid(new Array(rows).fill(false).map(() => new Array(columns).fill(false)))
        setGenerations(0)
    }

    const glider = () => {
        const gridCopy = grid.map(arr => arr.slice(0))
        gridCopy[0][1] = true
        gridCopy[1][2] = true
        gridCopy[2][2] = true
        gridCopy[2][1] = true
        gridCopy[2][0] = true

        setGrid(gridCopy)
    }

    const exploder = () => {
        const gridCopy = grid.map(arr => arr.slice(0))
        gridCopy[18][18] = true
        gridCopy[18][20] = true
        gridCopy[18][22] = true
        gridCopy[19][18] = true
        gridCopy[19][22] = true
        gridCopy[20][18] = true
        gridCopy[20][22] = true
        gridCopy[21][18] = true
        gridCopy[21][22] = true
        gridCopy[22][18] = true
        gridCopy[22][20] = true
        gridCopy[22][22] = true

        setGrid(gridCopy)
    }

    const gosperGliderGun = () => {
        const gridCopy = grid.map(arr => arr.slice(0))
        gridCopy[15][1] = true
        gridCopy[15][2] = true
        gridCopy[16][1] = true
        gridCopy[16][2] = true

        gridCopy[15][10] = true
        gridCopy[15][11] = true
        gridCopy[16][9] = true
        gridCopy[16][11] = true
        gridCopy[17][9] = true
        gridCopy[17][10] = true

        gridCopy[17][17] = true
        gridCopy[17][18] = true
        gridCopy[18][17] = true
        gridCopy[18][19] = true
        gridCopy[19][17] = true

        gridCopy[13][24] = true
        gridCopy[13][25] = true
        gridCopy[14][23] = true
        gridCopy[14][25] = true
        gridCopy[15][23] = true
        gridCopy[15][24] = true

        gridCopy[25][25] = true
        gridCopy[25][26] = true
        gridCopy[25][27] = true
        gridCopy[26][25] = true
        gridCopy[27][26] = true

        gridCopy[13][35] = true
        gridCopy[13][36] = true
        gridCopy[14][35] = true
        gridCopy[14][36] = true

        gridCopy[20][36] = true
        gridCopy[20][37] = true
        gridCopy[21][36] = true
        gridCopy[21][38] = true
        gridCopy[22][36] = true

        setGrid(gridCopy)
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

    const findNewGrid = () => {
        console.log('findNewGrid ran')
        const gridCopy = grid.map(arr => arr.slice(0))
        let neirborsArray = findNeirbors()
        let neirborsCount = 0

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                //If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
                if((gridCopy[i][j] && neirborsArray[neirborsCount] === 0) || (gridCopy[i][j] && neirborsArray[neirborsCount] === 1) || (gridCopy[i][j] && neirborsArray[neirborsCount] > 3)) {
                    gridCopy[i][j] = false
                }

                //If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
                if(gridCopy[i][j] === false && neirborsArray[neirborsCount] === 3) {
                    gridCopy[i][j] = true
                }
                neirborsCount += 1
            }
        }
        setGrid(gridCopy)
    }

    const findNeirbors = () => {
        console.log('findNairbors ran')
        const wholeGridNeirbors = []

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let count = 0

                //left up
                if(grid[i - 1] !== undefined) {
                    if(grid[i - 1][j - 1] === true) {
                        count += 1
                    }
                }
                //left
                if(grid[i][j - 1] === true) {
                    count += 1
                }

                //left down
                if(grid[i + 1] !== undefined) {
                    if(grid[i + 1][j - 1] === true) {
                        count += 1
                    }
                }

                //down
                if(grid[i + 1] !== undefined) {
                    if(grid[i + 1][j] === true) {
                        count += 1
                    }
                }

                //right down
                if(grid[i + 1] !== undefined) {
                    if(grid[i + 1][j + 1] === true) {
                        count += 1
                    }
                }

                //right
                if(grid[i][j + 1] === true) {
                    count += 1
                }
                
                //right up
                if(grid[i - 1] !== undefined) {
                    if(grid[i - 1][j + 1] === true) {
                        count += 1
                    }
                }

                //up
                if(grid[i - 1] !== undefined) {
                    if(grid[i - 1][j] === true) {
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
                setGenerations(generations + 1)
            }, 100)
            return () => clearInterval(interval)
        }
    })
    

    return (
        <div className="grid-container">
            <h1>Conway's game of life</h1>
            <p>Generation: {generations}</p>
            <div className="grid" style={{width: `${rows * 12}px`}}>
                    {boxList.map(box => {
                        return box
                    })}
            </div>
            <div className="buttons">
                <h2 onClick={play}>Play</h2>
                <h2 onClick={pause}>Pause</h2>
                <h2 onClick={stepThrough}>Next</h2>
                <h2 onClick={clear}>Clear</h2>
                <h2 onClick={glider}>Glider</h2>
                <h2 onClick={exploder}>Exploder</h2>
                <h2 onClick={gosperGliderGun}>Gosper Glider Gun</h2>
                <h2 onClick={random}>Random</h2>
            </div>
        </div>
    )
}

export default Grid