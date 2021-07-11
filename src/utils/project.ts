import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
// import { useCallback, useEffect } from "react";
// import { cleanObject } from "utils";
import { useQuery } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp();
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(
  //   () => http("projects", { data: cleanObject(param || {}) }),
  //   [http, param]
  // );

  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [fetchProjects, param, run]);

  // return result;

  return useQuery<Project[]>(["projects", param], () =>
    http("projects", { data: param })
  );
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const http = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
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
