function dfs() {
    const maze = document.getElementById('maze');
    const cells = maze.querySelectorAll('div');
    const startCell = maze.querySelector('.start');
    const endCell = maze.querySelector('.end');

    if (!startCell || !endCell) {
        alert('Set Your Start & End points.');
        return;
    }

    const start = { row: parseInt(startCell.dataset.row), col: parseInt(startCell.dataset.col) };
    const end = { row: parseInt(endCell.dataset.row), col: parseInt(endCell.dataset.col) };

    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = {
                row: i,
                col: j,
                visited: false,
                previous: null,
                blocked: cells[i * 10 + j].classList.contains('wall')
            };
        }
    }

    function dfsVisit(cell) {
        if (cell.blocked || cell.visited) return false;
        cell.visited = true;
        if (cell.row === end.row && cell.col === end.col) return true;

        const neighbors = [];
        if (cell.row > 0) neighbors.push(arr[cell.row - 1][cell.col]);
        if (cell.row < 9) neighbors.push(arr[cell.row + 1][cell.col]);
        if (cell.col > 0) neighbors.push(arr[cell.row][cell.col - 1]);
        if (cell.col < 9) neighbors.push(arr[cell.row][cell.col + 1]);

        for (const neigh of neighbors) {
            if (!neigh.visited) {
                neigh.previous = cell;
                if (dfsVisit(neigh)) return true;
            }
        }
        return false;
    }

    const found = dfsVisit(arr[start.row][start.col]);
    if (!found) {
        alert("No path found. Check your walls placement.");
        return;
    }

    const path = [];
    let curr = arr[end.row][end.col];
    while (curr) {
        path.push(curr);
        curr = curr.previous;
    }

    path.forEach(cell => {
        const ele = cells[cell.row * 10 + cell.col];
        if (!ele.classList.contains('start') && !ele.classList.contains('end')) {
            ele.classList.add('path');
        }
    });
}