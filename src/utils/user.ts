import { useMount } from "utils";
import { User } from "pages/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const http = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(http("users"));
  });

  return result;
};
