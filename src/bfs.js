function bfs() {
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

    const queue = [];
    arr[start.row][start.col].visited = true;
    queue.push(arr[start.row][start.col]);

    while (queue.length > 0) {
        const curr = queue.shift();

        if (curr.row === end.row && curr.col === end.col) {
            // Backtrack path
            let back = curr;
            const path = [];
            while (back) {
                path.push(back);
                back = back.previous;
            }
            path.forEach(cell => {
                const ele = cells[cell.row * 10 + cell.col];
                if (!ele.classList.contains('start') && !ele.classList.contains('end')) {
                    ele.classList.add('path');
                }
            });
            return;
        }

        const neighbors = [];
        if (curr.row > 0) neighbors.push(arr[curr.row - 1][curr.col]);
        if (curr.row < 9) neighbors.push(arr[curr.row + 1][curr.col]);
        if (curr.col > 0) neighbors.push(arr[curr.row][curr.col - 1]);
        if (curr.col < 9) neighbors.push(arr[curr.row][curr.col + 1]);

        for (const neigh of neighbors) {
            if (!neigh.blocked && !neigh.visited) {
                neigh.visited = true;
                neigh.previous = curr;
                queue.push(neigh);
            }
        }
    }

    alert("No path found. Check your walls placement.");
}
