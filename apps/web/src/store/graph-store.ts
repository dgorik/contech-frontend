import { initialEdges, initialNodes } from '@/lib/sample-graph-data';
import {
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  searchQuery: string;
  isLoading: boolean;
  expandNode: (nodeId: string) => Promise<void>;
  executeQuery: (query: string) => Promise<void>;
  setNodes: (changes: NodeChange[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (changes: EdgeChange[] | ((edges: Edge[]) => Edge[])) => void;
  addNodes: (newNodes: Node[]) => void;
  addEdges: (newEdges: Edge[]) => void;
  setSelectedNode: (nodeId: string | null) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  searchQuery: '',
  isLoading: false,
  expandNode: async (nodeId: string) => {
    // TODO: Implement node expansion logic
    console.log('Expanding node:', nodeId);
  },
  executeQuery: async (query: string) => {
    // TODO: Implement query execution logic
    console.log('Executing query:', query);
  },
  setNodes: (changes) =>
    set((state) => ({
      nodes: Array.isArray(changes)
        ? applyNodeChanges(changes, state.nodes)
        : changes(state.nodes),
    })),
  setEdges: (changes) =>
    set((state) => ({
      edges: Array.isArray(changes)
        ? applyEdgeChanges(changes, state.edges)
        : changes(state.edges),
    })),
  addNodes: (newNodes) =>
    set((state) => ({
      nodes: [...state.nodes, ...newNodes],
    })),
  addEdges: (newEdges) =>
    set((state) => ({
      edges: [...state.edges, ...newEdges],
    })),
  setSelectedNode: (nodeId: string | null) => set({ selectedNode: nodeId }),
}));
