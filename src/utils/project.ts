import { useHttp } from "utils/http";
import { Project } from "pages/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import { useAsync } from "utils/use-async";
// import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    http("projects", { data: param })
  );

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
};

export const useEditProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      http(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     http(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };

  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useAddProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     http(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };

  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useProject = (id?: number) => {
  const http = useHttp();
  return useQuery<Project>(["project", { id }], () => http(`projects/${id}`), {
    enabled: !!id,
  });
};
