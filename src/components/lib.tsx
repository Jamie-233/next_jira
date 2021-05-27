import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: boolean | number;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.marginBottom === "number"
      ? props.marginBottom + "rem"
      : undefined};
  justify-content: ${(props) =>
    typeof props.between ? "space-between" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
