import { Project } from "pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(http("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};