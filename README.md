# Algorithm Visualizer

An interactive web-based visualization tool for understanding classic algorithms including **BFS, DFS, Quicksort, Heapsort, and Binary Search**. Perfect for students, educators, or anyone looking to grasp how these algorithms work step by step.

---

## Features

* **DFS (Depth-First Search)**

  * Step through DFS traversal on any graph.
  * See the stack of nodes, current node, visited nodes, and active edges.

* **BFS (Breadth-First Search)**

  * Step through BFS traversal.
  * Visualize the queue of nodes to visit, current node, and completed nodes.

* **Quicksort**

  * Visualize the recursive partitioning process.
  * Track pivot selection, left/right partitions, and element swaps.

* **Heapsort**

  * Visualize heap construction and sorting process.
  * See the heap as it’s built and elements being extracted to sort the array.

* **Binary Search**

  * Visualize searching in a sorted array.
  * Track the current search range, middle element, eliminated elements, and found element.

---

## Live Demo

[link](https://isaacabell.com/algo-visualizer/)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Isaac-Abell/algo-visualizer.git
   cd algorithm-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

* Select the algorithm from the sidebar or menu.
* For graph algorithms (BFS/DFS):

  * Enter a graph (adjacency list or predefined example).
  * Choose the starting node.
  * Use **Step Forward**, **Step Back**, or **Play** to navigate.
* For sorting/searching algorithms:

  * Enter an array or use the default example.
  * Watch the algorithm run step by step with clear color coding.

---

## Tech Stack

* **React** + **TypeScript**
* **Framer Motion** for animations
* **CSS Modules** for styling
* Custom algorithms implemented in TypeScript

---

## Project Structure

```
src/
│
├─ algorithms/      # BFS, DFS, Quicksort, Heapsort, Binary Search
├─ components/      # Visualizers and Graph/Array components
├─ pages/           # Different pages (currently only has home)
├─ types/           # TypeScript type definitions
├─ utils/           # Utility functions for nodes, edges calculations
├─ App.tsx
├─ index.tsx
```
