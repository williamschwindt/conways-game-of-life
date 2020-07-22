import React from 'react'
import Box from './Box'

const Grid = () => {
    const rows = 50
    const columns = 40

    const boxList = []
    const grid = new Array(rows).fill(null).map(() => new Array(columns).fill(null))
    console.log(grid)

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            let box = {
                id: `${i}_${j}`,
                row: i,
                column: j
            }

            boxList.push(box)
            grid[i][j] = box
        }
    }

    return (
        <div className="grid" style={{width: `${rows * 12}px`}}>
            {boxList.map(box => {
                return <Box key={box.id} id={box.id} row={box.row} column={box.column} />
            })}
        </div>
    )
}

export default Grid