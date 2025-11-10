// Dijkstra's Algorithm Implementation
function dijkstra() {
    const maze = document.getElementById('maze');
    const cells = maze.querySelectorAll('div');
    const startCell = maze.querySelector('.start');
    const endCell = maze.querySelector('.end');

    if (!startCell || !endCell) {
        alert('Set Your Start & End points.');
        return;
    }

    const start = {
        row: parseInt(startCell.dataset.row),
        col: parseInt(startCell.dataset.col)
    };

    const end = {
        row: parseInt(endCell.dataset.row),
        col: parseInt(endCell.dataset.col)
    };

    const arr = [];

    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = {
                row: i,
                col: j,
                distance: Infinity,
                visited: false,
                previous: null,
                blocked: cells[i * 10 + j].classList.contains('wall')
            };
        }
    }

    arr[start.row][start.col].distance = 0;
    let curr = arr[start.row][start.col];

    while (curr.row !== end.row || curr.col !== end.col) {
        curr.visited = true;
        const neighbors = [];

        if (curr.row > 0) neighbors.push(arr[curr.row - 1][curr.col]);
        if (curr.row < 9) neighbors.push(arr[curr.row + 1][curr.col]);
        if (curr.col > 0) neighbors.push(arr[curr.row][curr.col - 1]);
        if (curr.col < 9) neighbors.push(arr[curr.row][curr.col + 1]);

        for (const neighbor of neighbors) {
            if (!neighbor.blocked && !neighbor.visited) {
                const distance = curr.distance + 1;
                if (distance < neighbor.distance) {
                    neighbor.distance = distance;
                    neighbor.previous = curr;
                }
            }
        }

        let dist = Infinity;
        let nextCurr = null;
        for (const row of arr) {
            for (const cell of row) {
                if (!cell.blocked && !cell.visited && cell.distance < dist) {
                    dist = cell.distance;
                    nextCurr = cell;
                }
            }
        }

        if (dist === Infinity) {
            alert("No path found. Check your walls placement.");
            return;
        }

        curr = nextCurr;
    }

    let path = [];
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
