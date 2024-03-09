import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { addPost } from "../features/Datas/DataSlice";
const CreateData = () => {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const handleCreate = async () => {
    setIsCreating(true);
    const items = { id, userId, body, title };
    try {
      await dispatch(addPost(items));
      setId("");
      setUserId("");
      setTitle("");
      setBody("");
      setIsModalOpen(false);
      setIsCreating(false);
      message.success("Data successfully added");
    } catch (error) {
      console.log(error);
      setIsCreating(false);
    }
  };
  return (
    <>
      
      <Button
        className="bg-green-600 text-white hover:bg-gray-200"
        onClick={showModal}
      >
        Create Data
      </Button>
      <Modal
        title="Create Data List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleCreate}>
          <Form.Item
            label="id"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your id!",
              },
            ]}
          >
            <Input
              placeholder="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="userId"
            name="userId"
            disabled
            rules={[
              {
                required: true,
                message: "Please input your userId!",
              },
            ]}
          >
            <Input
              placeholder="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="body"
            name="body"
            rules={[
              {
                required: true,
                message: "Please input your body!",
              },
            ]}
          >
            <Input
              placeholder="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Item>

          <Button
            className="bg-orange-500"
            htmlType="submit"
            loading={isCreating}
          >
            Create
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default CreateData;
