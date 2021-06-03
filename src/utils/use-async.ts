import { useState } from "react";

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

export const useAsync = <D>(
  initalState?: State<D>,
  initalConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initalConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initalState,
  });
  const [retry, setRetry] = useState(() => {});

  const setData = (data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then)
      throw new Error("Please afferent promise type");
    setRetry(() => run(promise));
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    run,
    setData,
    setError,
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    // call retry execute run function
    retry,
    ...state,
  };
};
