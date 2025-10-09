document.addEventListener('DOMContentLoaded', function () {
    const maze = document.getElementById('maze');

    let startSet = false;
    let endSet = false;
    let wallSet = false;

    // Create 10x10 grid cells
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.dataset.row = i;
            cell.dataset.col = j;
            maze.appendChild(cell);
        }
    }

    // Clear path highlighting on any click, then handle cell setting
    maze.addEventListener('click', (e) => {
        // Remove old paths
        const existingPath = maze.querySelectorAll('.path');
        existingPath.forEach(path => {
            path.classList.remove('path');
        });

        if (e.target.matches('div')) {
            // Set start cell
            if (startSet && !e.target.classList.contains('end') && !e.target.classList.contains('wall')) {
                const existingStart = maze.querySelector('.start');
                if (existingStart) {
                    existingStart.classList.remove('start');
                }
                e.target.classList.add('start');
                startSet = false;
            }
            // Set end cell
            else if (endSet && !startSet && !e.target.classList.contains('start') && !e.target.classList.contains('wall')) {
                const existingEnd = maze.querySelector('.end');
                if (existingEnd) {
                    existingEnd.classList.remove('end');
                }
                e.target.classList.add('end');
                endSet = false;
            }
            // Toggle wall cells
            else if (wallSet && !e.target.classList.contains('start') && !e.target.classList.contains('end')) {
                e.target.classList.toggle('wall');
            }
        }
    });

    // Reset button clears only path and walls, keeps start and end points
    document.getElementById('btnReset').addEventListener('click', () => {
        const cells = maze.querySelectorAll('div');
        cells.forEach(cell => {
            if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.remove('wall', 'path');
            }
        });
        startSet = false;
        endSet = false;
        wallSet = false;
    });

    // Start point mode button
    document.getElementById('btnSetStart').addEventListener('click', () => {
        startSet = true;
        endSet = false;
        wallSet = false;
    });

    // End point mode button
    document.getElementById('btnSetEnd').addEventListener('click', () => {
        startSet = false;
        endSet = true;
        wallSet = false;
    });

    // Wall mode button
    document.getElementById('btnSetWall').addEventListener('click', () => {
        startSet = false;
        endSet = false;
        wallSet = true;
    });

    // Algorithm buttons (assuming functions are defined elsewhere)
    document.getElementById('btnDijkstra').addEventListener('click', () => {
        dijkstra();
    });

    document.getElementById('btnBellmanFord').addEventListener('click', () => {
        bellmanFord();
    });

    document.getElementById('btnFloydWarshall').addEventListener('click', () => {
        floydWarshall();
    });

    document.getElementById('btnBFS').addEventListener('click', () => {
        bfs();
    });

    document.getElementById('btnDFS').addEventListener('click', () => {
        dfs();
    });
});
