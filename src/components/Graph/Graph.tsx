import React from "react";
import { motion } from "framer-motion";
import type { GraphComponentProps } from "../../types/graphTypes";
import "./Graph.css";

export const Graph: React.FC<GraphComponentProps> = ({
  adjacencyList,
  step,
  nodePositions
}) => {
  // Use all edges so we can render untraversed edges in grey
  const allEdges = Object.entries(adjacencyList).flatMap(([from, neighbors]) =>
    neighbors.map(to => ({ from, to }))
  );

  return (
    <div className="graph-wrapper">
      <svg width="800" height="600" className="graph-svg">
        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            className="arrow-marker"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker
            id="arrowhead-inactive"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            className="arrow-marker"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
          </marker>
        </defs>

        {/* Draw all edges */}
        {allEdges.map((edge, index) => {
          const fromNode = nodePositions[edge.from];
          const toNode = nodePositions[edge.to];
          if (!fromNode || !toNode) return null;

          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const unitX = dx / length;
          const unitY = dy / length;

          const nodeRadius = 25;
          const startX = fromNode.x + unitX * nodeRadius;
          const startY = fromNode.y + unitY * nodeRadius;
          const endX = toNode.x - unitX * (nodeRadius + 10);
          const endY = toNode.y - unitY * (nodeRadius + 10);

          // Edge is active if it's in step.edges
          const isActive = step?.edges.some(
            e => e.from === edge.from && e.to === edge.to
          );

          return (
            <motion.line
              key={`edge-${edge.from}-${edge.to}-${index}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              className={`graph-edge ${isActive ? "active" : "inactive"}`}
              markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)"}
              initial={{ opacity: 1 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                strokeWidth: isActive ? 2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Draw nodes */}
        {Object.values(nodePositions).map((node) => {
          const isVisited = step?.visitedNodes.has(node.id);
          const isCurrent = step?.currentNode === node.id;
          const isProcessing = step?.processingNodes.has(node.id);

          let nodeClass = "graph-node";
          if (isCurrent) nodeClass += " current";
          else if (isProcessing) nodeClass += " processing";
          else if (isVisited) nodeClass += " visited";

          return (
            <motion.g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={25}
                className={nodeClass}
                initial={false}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dy="0.35em"
                className="graph-node-text"
              >
                {node.id}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
