export const glider = (grid) => {
    const gridCopy = grid.map(arr => arr.slice(0))
    gridCopy[0][1] = true
    gridCopy[1][2] = true
    gridCopy[2][2] = true
    gridCopy[2][1] = true
    gridCopy[2][0] = true

    return gridCopy
}

export const exploder = (grid) => {
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

    return gridCopy
}

export const gosperGliderGun = (grid) => {
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

    return gridCopy
}