import { useCallback } from "react";
import { useState } from "react";

export const useUndo = <T>(initalPresent: T) => {
  // record history
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initalPresent);
  // const [future, setFuture] = useState<T[]>([]);

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initalPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { present, past, future } = currentState;
      if (past.length === 0) return currentState;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      // setPast(newPast);
      // setPresent(previous);
      // setFuture([present, ...future]);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };

      // setPast([...past, present]);
      // setPresent(next);
      // setFuture(newFuture);
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) return currentState;
      // setPast([...past, present]);
      // setPresent(newPresent);
      // setFuture([]);

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      // setPast([]);
      // setPresent(newPresent);
      // setFuture([]);
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [
    // {
    //     undo,
    //     redo,
    //     set,
    //     reset,
    // },
    state,
    {
      set,
      reset,
      undo,
      redo,
      canUndo,
      canRedo,
    },
  ] as const;
};
