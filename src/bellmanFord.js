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

