// Dijkstra's Algorithm Implementation
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

// Bellman-Ford Algorithm Implementation (simplified for grid)
function bellmanFord() {
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

    // Graph edges: each cell connects to neighbors (up, down, left, right)
    const nodes = [];
    const edges = [];

    for (let i = 0; i < 10; i++) {
        nodes[i] = [];
        for (let j = 0; j < 10; j++) {
            nodes[i][j] = {
                distance: Infinity,
                previous: null,
                blocked: cells[i * 10 + j].classList.contains('wall'),
                row: i,
                col: j
            };
        }
    }

    nodes[start.row][start.col].distance = 0;

    // Build edges
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const node = nodes[i][j];
            if (node.blocked) continue;

            // Neighbor directions
            const neighbors = [];
            if (i > 0) neighbors.push(nodes[i - 1][j]);
            if (i < 9) neighbors.push(nodes[i + 1][j]);
            if (j > 0) neighbors.push(nodes[i][j - 1]);
            if (j < 9) neighbors.push(nodes[i][j + 1]);

            for (const neighbor of neighbors) {
                if (!neighbor.blocked) {
                    edges.push({ u: node, v: neighbor, w: 1 }); // uniform weight
                }
            }
        }
    }

    // Relax edges up to |V|-1 times
    for (let k = 0; k < 100; k++) { // 10x10 grid, max 100 nodes
        for (const edge of edges) {
            if (edge.u.distance + edge.w < edge.v.distance) {
                edge.v.distance = edge.u.distance + edge.w;
                edge.v.previous = edge.u;
            }
        }
    }

    // Check for negative weight cycles (not expected here)
    for (const edge of edges) {
        if (edge.u.distance + edge.w < edge.v.distance) {
            alert("Graph contains negative weight cycle");
            return;
        }
    }

    if (nodes[end.row][end.col].distance === Infinity) {
        alert("There is no path. Check your walls placement.");
        return;
    }

    // Backtrack and visualize path
    let curr = nodes[end.row][end.col];
    const path = [];
    while (curr) {
        path.push(curr);
        curr = curr.previous;
    }

    // Visualization
    for (const node of path) {
        const ele = cells[node.row * 10 + node.col];
        if (!ele.classList.contains('start') && !ele.classList.contains('end')) {
            ele.classList.add('path');
        }
    }
}

// Floyd-Warshall Algorithm Implementation (All-pairs shortest path)
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
// BFS Algorithm Implementation (Shortest path in unweighted grid)
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

// DFS Algorithm Implementation (Depth-first search path)
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