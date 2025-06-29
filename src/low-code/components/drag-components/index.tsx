import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import { DragModel } from "./model";

export const DragComponents: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragModel />
    </DndProvider>
  );
};
