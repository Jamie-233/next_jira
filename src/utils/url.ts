import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * @desc parse screen url
 * @return {key: value}
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParams,
  ] as const;
};
