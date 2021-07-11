import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  // read url params
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // 使用时不用注意先后顺序 但是名字被限制了(需要手动重命名) 适合导出多个(3个以上)
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };

  // return Tuple 好处: 使用hook时 名字可以自定义命名
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const
};
