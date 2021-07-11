import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer visible={projectModalOpen} width={"50%"} onClose={close}>
      <h1>project</h1>
      <Button onClick={close}></Button>
    </Drawer>
  );
};
