import React from 'react';
import Node from './Node';
import Controls from './Controls';
import Legend from './Legend';
import OperationPanel from './OperationPanel';
import { useLinkedList } from '../../../../context/LinkedListContext';
import './LinkedListVisualizer.css';

const LinkedListVisualizer = () => {
  const { state, getListAsArray } = useLinkedList();
  const { listType } = state;
  const nodes = getListAsArray();

  return (
    <div className="visualizer-container">
      <h2 className="visualizer-title">
        {listType === 'singly' && 'Singly Linked List'}
        {listType === 'doubly' && 'Doubly Linked List'}
        {listType === 'circular' && 'Circular Linked List'}
      </h2>

      <Legend />

      <Controls />

      <OperationPanel />
      <div className="visualizer-content">
        {nodes.length > 0 ? (
          <div className="nodes-container">
            {nodes.map((node, index) => (
              <Node 
                key={node.id} 
                node={node} 
                listType={listType}
                isLast={index === nodes.length - 1} 
              />
            ))}
          </div>
        ) : (
          <div className="empty-list-message">
            The list is empty. Add nodes to visualize the linked list.
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;