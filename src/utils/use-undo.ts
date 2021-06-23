import { useState } from "react";

export const useUndo = <T>(initialState: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const undo = () => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1); // 处理过去 不包含最新

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };

  const redo = () => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  };

  return {
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
