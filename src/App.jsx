import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DataStructures from "./pages/DataStructures";
import LinkedList from "./components/DataStructures/LinkedList/LinkedList";
import LinkedListVisualizer from "./components/DataStructures/LinkedList/LinkedListVisualizer";
import LeetCodeProblemFetcher from "./components/DataStructures/LinkedList/Leetcode";
import ComingSoon from "./components/DataStructures/RestAll/ComingSoon";
import { LinkedListProvider } from "./context/LinkedListContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/linked-list" element={<LinkedList />} />
        <Route
          path="/linked-list/operations"
          element={<LeetCodeProblemFetcher />}
        />
        <Route
          path="/linked-list/visualizer"
          element={
            <LinkedListProvider>
              <LinkedListVisualizer />
            </LinkedListProvider>
          }
        />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;