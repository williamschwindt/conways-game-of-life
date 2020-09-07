# conways-game-of-life

John Conway's famous game of cellular automaton recreated. The Game of Life consists of a grid of "dead" cells and two basic rules:

1. If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.

2. If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.

The evolution of the grid is determined by the initial state which can be set by premade or user created patterns. In my version of the algorithim two arrays are used: one to hold and display the current generation of cells, and one to calculate the next generation. The number of neighbors for each cell is counted and then the rules dictate wether that cell should live or die. The two arrays then switch roles and the whole cycle is repeated.
