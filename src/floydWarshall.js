function floydWarshall() {
    const maze = document.getElementById('maze');
    const cells = maze.querySelectorAll('div');

    // Create matrix representation of the grid graph
    const n = 100;
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const next = Array.from({ length: n }, () => Array(n).fill(null));

    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    // Build edges in matrix format based on grid adjacency
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const index = i * 10 + j;
            const cell = cells[index];
            if (cell.classList.contains('wall')) continue;

            // Neighbor indices
            const neighbors = [];
            if (i > 0) neighbors.push((i - 1) * 10 + j);
            if (i < 9) neighbors.push((i + 1) * 10 + j);
            if (j > 0) neighbors.push(i * 10 + (j - 1));
            if (j < 9) neighbors.push(i * 10 + (j + 1));

            for (const nb of neighbors) {
                if (!cells[nb].classList.contains('wall')) {
                    dist[index][nb] = 1;
                    next[index][nb] = nb;
                }
            }
        }
    }

    // Floyd-Warshall main algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }
            }
        }
    }

    const startCell = maze.querySelector('.start');
    const endCell = maze.querySelector('.end');
    if (!startCell || !endCell) {
        alert('Set Your Start & End points.');
        return;
    }

    const startIndex = parseInt(startCell.dataset.row) * 10 + parseInt(startCell.dataset.col);
    const endIndex = parseInt(endCell.dataset.row) * 10 + parseInt(endCell.dataset.col);

    if (dist[startIndex][endIndex] === Infinity) {
        alert("There is no path. Check your walls placement.");
        return;
    }

    // Reconstruct path
    const path = [];
    let u = startIndex;
    while (u !== endIndex) {
        path.push(u);
        u = next[u][endIndex];
        if (u === null) {
            alert("No path found.");
            return;
        }
    }
    path.push(endIndex);

    // Visualize path
    for (const idx of path) {
        const ele = cells[idx];
        if (!ele.classList.contains('start') && !ele.classList.contains('end')) {
            ele.classList.add('path');
        }
    }
}
