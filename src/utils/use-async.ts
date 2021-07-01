import { useCallback, useState, useReducer } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
}

const defaultInitalState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const { throwOnError } = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitalState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  // call retry execute run function
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        error: null,
        stat: "success",
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        data: null,
        stat: "error",
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then)
        throw new Error("Please afferent promise type");

      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig.retry(), runConfig);
      });

      // dispatch({ ...state, stat: "loading" });
      // safeDispatch((prevState) => ({ ...prevState, stat: "loading" }));
      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [safeDispatch, setData, setError, throwOnError]
  );

  return {
    run,
    setData,
    setError,
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    retry,
    ...state,
  };
};
