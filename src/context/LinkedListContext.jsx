import React, { createContext, useContext, useReducer } from 'react';
const initialState = {
  list: null,
  listType: 'singly', 
  operations: [],
  currentStep: -1,
  animationSpeed: 1000,
  isAnimating: false,
  highlightedNodes: [],
};

//action types
const actions = {
  SET_LIST_TYPE: 'SET_LIST_TYPE',
  INITIALIZE_LIST: 'INITIALIZE_LIST',
  ADD_NODE: 'ADD_NODE',
  DELETE_NODE: 'DELETE_NODE',
  SEARCH_NODE: 'SEARCH_NODE',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  SET_ANIMATION_SPEED: 'SET_ANIMATION_SPEED',
  SET_IS_ANIMATING: 'SET_IS_ANIMATING',
  SET_HIGHLIGHTED_NODES: 'SET_HIGHLIGHTED_NODES',
  CLEAR_OPERATIONS: 'CLEAR_OPERATIONS',
  ADD_OPERATION: 'ADD_OPERATION',
};
//singly linked list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

// doubly linked list
class DoublyNode extends Node {
  constructor(data) {
    super(data);
    this.prev = null;
  }
}
//reducer 
const linkedListReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LIST_TYPE:
      return {
        ...state,
        listType: action.payload,
        list: null,
        operations: [],
        currentStep: -1,
        highlightedNodes: [],
      };
    case actions.INITIALIZE_LIST:
      return {
        ...state,
        list: action.payload,
        operations: [],
        currentStep: -1,
        highlightedNodes: [],
      };
    case actions.ADD_NODE:
      return {
        ...state,
        list: action.payload.newList,
        highlightedNodes: action.payload.highlightedNodes || [],
      };
    case actions.DELETE_NODE:
      return {
        ...state,
        list: action.payload.newList,
        highlightedNodes: action.payload.highlightedNodes || [],
      };
    case actions.SEARCH_NODE:
      return {
        ...state,
        highlightedNodes: action.payload,
      };
    case actions.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case actions.SET_ANIMATION_SPEED:
      return {
        ...state,
        animationSpeed: action.payload,
      };
    case actions.SET_IS_ANIMATING:
      return {
        ...state,
        isAnimating: action.payload,
      };
    case actions.SET_HIGHLIGHTED_NODES:
      return {
        ...state,
        highlightedNodes: action.payload,
      };
    case actions.CLEAR_OPERATIONS:
      return {
        ...state,
        operations: [],
        currentStep: -1,
        highlightedNodes: [],
      };
    case actions.ADD_OPERATION:
      return {
        ...state,
        operations: [...state.operations, action.payload],
      };
    default:
      return state;
  }
};

const LinkedListContext = createContext();

// provider 
export const LinkedListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(linkedListReducer, initialState);
  
  const createSinglyLinkedList = (data) => {
    if (!data || data.length === 0) return null;
    
    const head = new Node(data[0]);
    let current = head;
    
    for (let i = 1; i < data.length; i++) {
      current.next = new Node(data[i]);
      current = current.next;
    }
    
    return head;
  };
  
  const createDoublyLinkedList = (data) => {
    if (!data || data.length === 0) return null;
    
    const head = new DoublyNode(data[0]);
    let current = head;
    
    for (let i = 1; i < data.length; i++) {
      const newNode = new DoublyNode(data[i]);
      newNode.prev = current;
      current.next = newNode;
      current = newNode;
    }
    
    return head;
  };
  
  const createCircularLinkedList = (data) => {
    if (!data || data.length === 0) return null;
    
    const head = new Node(data[0]);
    let current = head;
    
    for (let i = 1; i < data.length; i++) {
      current.next = new Node(data[i]);
      current = current.next;
    }

    current.next = head;
    
    return head;
  };
  
  const initializeList = (data) => {
    let newList = null;
    
    switch (state.listType) {
      case 'singly':
        newList = createSinglyLinkedList(data);
        break;
      case 'doubly':
        newList = createDoublyLinkedList(data);
        break;
      case 'circular':
        newList = createCircularLinkedList(data);
        break;
      default:
        newList = createSinglyLinkedList(data);
    }
    
    dispatch({ type: actions.INITIALIZE_LIST, payload: newList });
    return newList;
  };
  
  const insertAtHead = (data) => {
    const newNode = state.listType === 'doubly' ? new DoublyNode(data) : new Node(data);
    const steps = [];
    
    steps.push({
      description: `Create a new node with data ${data}`,
      highlightedNodes: [],
      codeLines: ['const newNode = new Node(data);'],
    });
    
    if (!state.list) {
      steps.push({
        description: 'List is empty, new node becomes the head',
        highlightedNodes: [newNode.id],
        codeLines: ['head = newNode;'],
      });
      
      dispatch({ 
        type: actions.ADD_NODE, 
        payload: { 
          newList: newNode, 
          highlightedNodes: [newNode.id] 
        } 
      });
      
      for (const step of steps) {
        dispatch({ type: actions.ADD_OPERATION, payload: step });
      }
      
      return;
    }
    
    newNode.next = state.list;
    
    steps.push({
      description: 'Set the new node\'s next pointer to the current head',
      highlightedNodes: [newNode.id, state.list.id],
      codeLines: ['newNode.next = head;'],
    });
    
    if (state.listType === 'doubly') {
      state.list.prev = newNode;
      steps.push({
        description: 'Set the current head\'s prev pointer to the new node',
        highlightedNodes: [newNode.id, state.list.id],
        codeLines: ['head.prev = newNode;'],
      });
    }
    
    steps.push({
      description: 'Update the head to be the new node',
      highlightedNodes: [newNode.id],
      codeLines: ['head = newNode;'],
    });
    
    if (state.listType === 'circular') {
      let lastNode = state.list;
      while (lastNode.next !== state.list) {
        lastNode = lastNode.next;
      }
      lastNode.next = newNode;
      
      steps.push({
        description: 'Update the last node\'s next pointer to the new head (making it circular)',
        highlightedNodes: [lastNode.id, newNode.id],
        codeLines: ['lastNode.next = newNode;'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    dispatch({ 
      type: actions.ADD_NODE, 
      payload: { 
        newList: newNode,
        highlightedNodes: [newNode.id] 
      } 
    });
  };
  

  const insertAtTail = (data) => {
    const newNode = state.listType === 'doubly' ? new DoublyNode(data) : new Node(data);
    const steps = [];
    
    steps.push({
      description: `Create a new node with data ${data}`,
      highlightedNodes: [],
      codeLines: ['const newNode = new Node(data);'],
    });
    
    if (!state.list) {
      steps.push({
        description: 'List is empty, new node becomes the head',
        highlightedNodes: [newNode.id],
        codeLines: ['head = newNode;'],
      });
      
      dispatch({ 
        type: actions.ADD_NODE, 
        payload: { 
          newList: newNode, 
          highlightedNodes: [newNode.id] 
        } 
      });
      
      for (const step of steps) {
        dispatch({ type: actions.ADD_OPERATION, payload: step });
      }
      
      return;
    }
    
    let current = state.list;
    steps.push({
      description: 'Start at the head of the list',
      highlightedNodes: [current.id],
      codeLines: ['let current = head;'],
    });
    
   
    if (state.listType === 'circular') {
      while (current.next !== state.list) {
        steps.push({
          description: 'Move to the next node (finding the last node)',
          highlightedNodes: [current.next.id],
          codeLines: ['current = current.next;'],
        });
        current = current.next;
      }
    } else {
      while (current.next) {
        steps.push({
          description: 'Move to the next node (finding the last node)',
          highlightedNodes: [current.next.id],
          codeLines: ['current = current.next;'],
        });
        current = current.next;
      }
    }
    
    steps.push({
      description: 'Set the last node\'s next pointer to the new node',
      highlightedNodes: [current.id, newNode.id],
      codeLines: ['current.next = newNode;'],
    });
    
    current.next = newNode;
    
    if (state.listType === 'doubly') {
      newNode.prev = current;
      steps.push({
        description: 'Set the new node\'s prev pointer to the last node',
        highlightedNodes: [current.id, newNode.id],
        codeLines: ['newNode.prev = current;'],
      });
    }
    

    if (state.listType === 'circular') {
      newNode.next = state.list;
      steps.push({
        description: 'Connect the new node back to the head (making it circular)',
        highlightedNodes: [newNode.id, state.list.id],
        codeLines: ['newNode.next = head;'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    let newList = { ...state.list };
    dispatch({ 
      type: actions.ADD_NODE, 
      payload: { 
        newList: newList,
        highlightedNodes: [newNode.id] 
      } 
    });
  };
  

  const insertAtPosition = (data, position) => {
    if (position <= 0) {
      insertAtHead(data);
      return;
    }
    
    const newNode = state.listType === 'doubly' ? new DoublyNode(data) : new Node(data);
    const steps = [];
    
    steps.push({
      description: `Create a new node with data ${data}`,
      highlightedNodes: [],
      codeLines: ['const newNode = new Node(data);'],
    });
    
    if (!state.list) {
      steps.push({
        description: 'List is empty, new node becomes the head',
        highlightedNodes: [newNode.id],
        codeLines: ['head = newNode;'],
      });
      
      dispatch({ 
        type: actions.ADD_NODE, 
        payload: { 
          newList: newNode, 
          highlightedNodes: [newNode.id] 
        } 
      });
      
      for (const step of steps) {
        dispatch({ type: actions.ADD_OPERATION, payload: step });
      }
      
      return;
    }
    
    let current = state.list;
    let prev = null;
    let count = 0;
    
    steps.push({
      description: 'Start at the head of the list',
      highlightedNodes: [current.id],
      codeLines: [
        'let current = head;',
        'let prev = null;',
        'let count = 0;'
      ],
    });
    
    // search
    while (count < position) {
      if (state.listType === 'circular' && current.next === state.list) {
        break;
      } else if (!state.listType === 'circular' && !current.next) {
        break;
      }
      
      prev = current;
      current = current.next;
      count++;
      
      steps.push({
        description: `Move to position ${count}`,
        highlightedNodes: [current.id],
        codeLines: [
          'prev = current;',
          'current = current.next;',
          'count++;'
        ],
      });
    }
    
   
    newNode.next = current;
    steps.push({
      description: 'Set the new node\'s next pointer to the current node',
      highlightedNodes: [newNode.id, current.id],
      codeLines: ['newNode.next = current;'],
    });
    
    prev.next = newNode;
    steps.push({
      description: 'Set the previous node\'s next pointer to the new node',
      highlightedNodes: [prev.id, newNode.id],
      codeLines: ['prev.next = newNode;'],
    });
    
    if (state.listType === 'doubly') {
      newNode.prev = prev;
      current.prev = newNode;
      
      steps.push({
        description: 'Set the new node\'s prev pointer to the previous node',
        highlightedNodes: [newNode.id, prev.id],
        codeLines: ['newNode.prev = prev;'],
      });
      
      steps.push({
        description: 'Set the current node\'s prev pointer to the new node',
        highlightedNodes: [current.id, newNode.id],
        codeLines: ['current.prev = newNode;'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    let newList = { ...state.list };
    dispatch({ 
      type: actions.ADD_NODE, 
      payload: { 
        newList: newList,
        highlightedNodes: [newNode.id] 
      } 
    });
  };
  
  const deleteHead = () => {
    if (!state.list) {
      return;
    }
    
    const steps = [];
    
    steps.push({
      description: 'Identify the head node to be deleted',
      highlightedNodes: [state.list.id],
      codeLines: ['// Head node will be removed'],
    });
    
    let newHead = state.list.next;
    
    steps.push({
      description: 'Save the next node as the new head',
      highlightedNodes: newHead ? [newHead.id] : [],
      codeLines: ['const newHead = head.next;'],
    });
    
   
    if (state.listType === 'circular' && newHead) {
      let lastNode = state.list;
      while (lastNode.next !== state.list) {
        lastNode = lastNode.next;
      }
      
      steps.push({
        description: 'Find the last node in the circular list',
        highlightedNodes: [lastNode.id],
        codeLines: ['// Find last node in circular list'],
      });
      
      lastNode.next = newHead;
      
      steps.push({
        description: 'Update the last node\'s next pointer to the new head',
        highlightedNodes: [lastNode.id, newHead.id],
        codeLines: ['lastNode.next = newHead;'],
      });
    }
    
  
    if (state.listType === 'doubly' && newHead) {
      newHead.prev = null;
      
      steps.push({
        description: 'Set the new head\'s prev pointer to null',
        highlightedNodes: [newHead.id],
        codeLines: ['newHead.prev = null;'],
      });
    }
    
    steps.push({
      description: 'Update the head reference to the new head',
      highlightedNodes: newHead ? [newHead.id] : [],
      codeLines: ['head = newHead;'],
    });
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    dispatch({ 
      type: actions.DELETE_NODE, 
      payload: { 
        newList: newHead,
        highlightedNodes: newHead ? [newHead.id] : [] 
      } 
    });
  };
  

  const deleteTail = () => {
    if (!state.list) {
      return;
    }
    
    const steps = [];
    
 
    if (!state.list.next || (state.listType === 'circular' && state.list.next === state.list)) {
      steps.push({
        description: 'Only one node in the list, removing the head node',
        highlightedNodes: [state.list.id],
        codeLines: ['head = null;'],
      });
      
      for (const step of steps) {
        dispatch({ type: actions.ADD_OPERATION, payload: step });
      }
      
      dispatch({ 
        type: actions.DELETE_NODE, 
        payload: { 
          newList: null,
          highlightedNodes: [] 
        } 
      });
      
      return;
    }
    
    let current = state.list;
    let prev = null;
    
    steps.push({
      description: 'Start at the head of the list',
      highlightedNodes: [current.id],
      codeLines: [
        'let current = head;',
        'let prev = null;'
      ],
    });
    
  
    if (state.listType === 'circular') {
      while (current.next !== state.list) {
        steps.push({
          description: 'Move to the next node',
          highlightedNodes: [current.next.id],
          codeLines: [
            'prev = current;',
            'current = current.next;'
          ],
        });
        
        prev = current;
        current = current.next;
      }
    } else {
      while (current.next) {
        steps.push({
          description: 'Move to the next node',
          highlightedNodes: [current.next.id],
          codeLines: [
            'prev = current;',
            'current = current.next;'
          ],
        });
        
        prev = current;
        current = current.next;
      }
    }
    
    steps.push({
      description: 'Identify the tail node to be deleted',
      highlightedNodes: [current.id],
      codeLines: ['// Tail node will be removed'],
    });
    
   
    if (state.listType === 'circular') {
      prev.next = state.list;
      
      steps.push({
        description: 'Set the previous node\'s next pointer to the head (maintaining circularity)',
        highlightedNodes: [prev.id, state.list.id],
        codeLines: ['prev.next = head;'],
      });
    } else {
      prev.next = null;
      
      steps.push({
        description: 'Set the previous node\'s next pointer to null',
        highlightedNodes: [prev.id],
        codeLines: ['prev.next = null;'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    let newList = { ...state.list };
    dispatch({ 
      type: actions.DELETE_NODE, 
      payload: { 
        newList: newList,
        highlightedNodes: [prev.id] 
      } 
    });
  };
  
  const deleteAtPosition = (position) => {
    if (!state.list) {
      return;
    }
    
    if (position <= 0) {
      deleteHead();
      return;
    }
    
    const steps = [];
    
    let current = state.list;
    let prev = null;
    let count = 0;
    
    steps.push({
      description: 'Start at the head of the list',
      highlightedNodes: [current.id],
      codeLines: [
        'let current = head;',
        'let prev = null;',
        'let count = 0;'
      ],
    });
    
    
    while (count < position) {
      if ((state.listType === 'circular' && current.next === state.list) || 
          (!state.listType === 'circular' && !current.next)) {
        // position out of bounds
        return;
      }
      
      prev = current;
      current = current.next;
      count++;
      
      steps.push({
        description: `Move to position ${count}`,
        highlightedNodes: [current.id],
        codeLines: [
          'prev = current;',
          'current = current.next;',
          'count++;'
        ],
      });
    }
    
    steps.push({
      description: `Found node to delete at position ${position}`,
      highlightedNodes: [current.id],
      codeLines: ['// Node to delete found'],
    });
    

    prev.next = current.next;
    
    steps.push({
      description: 'Set the previous node\'s next pointer to bypass the deleted node',
      highlightedNodes: [prev.id, current.next ? current.next.id : null].filter(Boolean),
      codeLines: ['prev.next = current.next;'],
    });
    
    if (state.listType === 'doubly' && current.next) {
      current.next.prev = prev;
      
      steps.push({
        description: 'Update the next node\'s prev pointer to the previous node',
        highlightedNodes: [current.next.id, prev.id],
        codeLines: ['current.next.prev = prev;'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    let newList = { ...state.list };
    dispatch({ 
      type: actions.DELETE_NODE, 
      payload: { 
        newList: newList,
        highlightedNodes: [prev.id] 
      } 
    });
  };

  const searchNode = (data) => {
    if (!state.list) {
      return;
    }
    
    const steps = [];
    let current = state.list;
    let position = 0;
    let found = false;
    
    steps.push({
      description: 'Start searching from the head',
      highlightedNodes: [current.id],
      codeLines: [
        'let current = head;',
        'let position = 0;',
        'let found = false;'
      ],
    });
    

    do {
      steps.push({
        description: `Checking node at position ${position} with data ${current.data}`,
        highlightedNodes: [current.id],
        codeLines: [`// Check if current.data (${current.data}) === target (${data})`],
      });
      
      if (current.data === data) {
        found = true;
        
        steps.push({
          description: `Found node with data ${data} at position ${position}!`,
          highlightedNodes: [current.id],
          codeLines: [
            'found = true;',
            `// Node found at position ${position}`
          ],
        });
        
        break;
      }
      
      position++;
      current = current.next;
      
      if (current === null || (state.listType === 'circular' && current === state.list)) {
        break;
      }
      
      steps.push({
        description: 'Move to the next node',
        highlightedNodes: [current.id],
        codeLines: [
          'position++;',
          'current = current.next;'
        ],
      });
    } while (current);
    
    if (!found) {
      steps.push({
        description: `Node with data ${data} not found in the list`,
        highlightedNodes: [],
        codeLines: ['// Node not found in the list'],
      });
    }
    
    for (const step of steps) {
      dispatch({ type: actions.ADD_OPERATION, payload: step });
    }
    
    if (found) {
      dispatch({ 
        type: actions.SEARCH_NODE, 
        payload: [current.id] 
      });
    }
  };
  
  const stepForward = () => {
    if (state.currentStep < state.operations.length - 1) {
      const nextStep = state.currentStep + 1;
      dispatch({ type: actions.SET_CURRENT_STEP, payload: nextStep });
      dispatch({ 
        type: actions.SET_HIGHLIGHTED_NODES, 
        payload: state.operations[nextStep].highlightedNodes 
      });
    }
  };
  
  const stepBackward = () => {
    if (state.currentStep > 0) {
      const prevStep = state.currentStep - 1;
      dispatch({ type: actions.SET_CURRENT_STEP, payload: prevStep });
      dispatch({ 
        type: actions.SET_HIGHLIGHTED_NODES, 
        payload: state.operations[prevStep].highlightedNodes 
      });
    } else if (state.currentStep === 0) {
      dispatch({ type: actions.SET_CURRENT_STEP, payload: -1 });
      dispatch({ type: actions.SET_HIGHLIGHTED_NODES, payload: [] });
    }
  };
  
  const resetVisualization = () => {
    dispatch({ type: actions.SET_CURRENT_STEP, payload: -1 });
    dispatch({ type: actions.SET_HIGHLIGHTED_NODES, payload: [] });
  };
  
  const playAnimation = () => {
    dispatch({ type: actions.SET_IS_ANIMATING, payload: true });
    
    const runStep = (step) => {
      if (step < state.operations.length) {
        dispatch({ type: actions.SET_CURRENT_STEP, payload: step });
        dispatch({ 
          type: actions.SET_HIGHLIGHTED_NODES, 
          payload: state.operations[step].highlightedNodes 
        });
        
        setTimeout(() => {
          runStep(step + 1);
        }, state.animationSpeed);
      } else {
        dispatch({ type: actions.SET_IS_ANIMATING, payload: false });
      }
    };
    
    runStep(0);
  };
  
  const setAnimationSpeed = (speed) => {
    dispatch({ type: actions.SET_ANIMATION_SPEED, payload: speed });
  };
  
  const setListType = (type) => {
    dispatch({ type: actions.SET_LIST_TYPE, payload: type });
  };
  
 
  const getListAsArray = () => {
    if (!state.list) return [];
    
    const result = [];
    let current = state.list;
    let seen = new Set();
    
    do {
      // prevent infinite loop
      if (seen.has(current.id)) {
        if (state.listType === 'circular' && current === state.list) {
          result.push({
            id: current.id,
            data: current.data,
            isCircular: true,
            isFirst: true
          });
        }
        break;
      }
      
      seen.add(current.id);
      
      result.push({
        id: current.id,
        data: current.data,
        isFirst: current === state.list,
        isHighlighted: state.highlightedNodes.includes(current.id)
      });
      
      current = current.next;
    } while (current && (state.listType !== 'circular' || current !== state.list));
    
    return result;
  };
  
  return (
    <LinkedListContext.Provider
      value={{
        state,
        initializeList,
        insertAtHead,
        insertAtTail,
        insertAtPosition,
        deleteHead,
        deleteTail,
        deleteAtPosition,
        searchNode,
        stepForward,
        stepBackward,
        resetVisualization,
        playAnimation,
        setAnimationSpeed,
        setListType,
        getListAsArray
      }}
    >
      {children}
    </LinkedListContext.Provider>
  );
};

// custom hook
export const useLinkedList = () => {
  const context = useContext(LinkedListContext);
  if (!context) {
    throw new Error('useLinkedList must be used within a LinkedListProvider');
  }
  return context;
};