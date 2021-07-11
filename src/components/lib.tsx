import React from "react";
import styled from "@emotion/styled";
import { Spin, Typography, Button } from "antd";
import { DevTools } from "jira-dev-tool";

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

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"}></Spin>
  </FullPage>
);

export const FullPageError = ({ error }: { error?: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error} />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);

// type guards
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return (
      <AlertError>
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      </AlertError>
    );
  }

  return null;
};

export const ButtonOnPadding = styled(Button)`
  padding: 0;
`;

const AlertError = styled.div`
  text-align: center;
`;
