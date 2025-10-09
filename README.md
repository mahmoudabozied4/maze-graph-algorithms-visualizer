# Maze Graph Algorithms Visualizer

This project is an interactive web application designed to visually demonstrate key graph algorithms on a maze grid. Users can dynamically set start and end points, build walls as obstacles, and run various pathfinding algorithms to see how they explore and find paths.

## Features

- **Maze Interface:** 10x10 grid where users can add start, end, and wall cells interactively.
- **Algorithms Supported:**
  - **Dijkstra:** Efficient shortest path for graphs with non-negative weights.
  - **Bellman-Ford:** Handles graphs with negative weight edges and detects cycles.
  - **Floyd-Warshall:** Computes shortest paths between all pairs of vertices.
  - **Breadth-First Search (BFS):** Explores shortest path in unweighted graphs.
  - **Depth-First Search (DFS):** Demonstrates depth-first path traversal.
- **Visual Feedback:** Color-coded grid cells to represent start, end, walls, paths, and algorithm visits.
- **Reset Functionality:** Clears the maze paths and walls while preserving start/end points for fast experimentation.

## Usage

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Use the provided buttons to:
   - Set start and end points on the maze grid.
   - Place walls to create obstacles.
   - Run any of the supported algorithms.
   - Reset the maze without losing start/end points.
4. Observe how each algorithm works step-by-step via the highlighted path.

## File Overview

- `index.html`: Contains the main layout, buttons, and maze container.
- `style.css`: Styles for the maze grid, buttons, and coloring based on states.
- `maze.js`: Handles the grid generation, user interactions, and UI/reset logic.
- `dijkstra.js`: Contains implementations and visualization of all supported algorithms.

## Contribution

Contributions to improve algorithm implementations, UI features, or performance optimizations are warmly welcome. Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under [MIT License](LICENSE).

---

Explore, learn, and visualize complex graph algorithms in a fun and interactive maze setting!
