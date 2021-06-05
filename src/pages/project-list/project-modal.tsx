import { Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalShow: boolean;
  onClose: () => void;
}) => {
  const { projectModalShow, onClose } = props;
  return (
    <Drawer visible={projectModalShow} width={"50%"} onClose={onClose}>
      <h1>project</h1>
    </Drawer>
  );
};
