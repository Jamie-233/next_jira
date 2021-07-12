import { Drawer, Button, Spin, Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { useProjectModal } from "./util";
import { useEditProject, useAddProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "Edit" : "Create";

  useEffect(() => {
    console.log("editingProject", editingProject);
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      visible={projectModalOpen}
      width={"50%"}
      onClose={close}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"name"}
                name={"name"}
                rules={[{ required: true, message: "Please input name" }]}
              >
                <Input placeholder={"Please input name"} />
              </Form.Item>

              <Form.Item
                label={"organization"}
                name={"organization"}
                rules={[
                  { required: true, message: "Please input organization" },
                ]}
              >
                <Input placeholder={"Please input organization"} />
              </Form.Item>

              <Form.Item label={"Owner"} name={"personId"}>
                <UserSelect defaultOptionName={"Owner"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
