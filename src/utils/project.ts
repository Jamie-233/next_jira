import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(http("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const http = useHttp();

  const mutate = (params: Partial<Project>) => {
    run(
      http(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const http = useHttp();

  const mutate = (params: Partial<Project>) => {
    run(
      http(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
