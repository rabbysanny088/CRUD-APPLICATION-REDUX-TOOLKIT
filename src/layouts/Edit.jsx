import { Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatedData } from "../features/Datas/DataSlice";
import Update from "./Update";

const Edit = ({ isVisible, setIsVisible, data }) => {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      setId(data.id);
      setUserId(data.userId);
      setTitle(data.title);
      setBody(data.body);
    } else {
      console.log("Data is not coming!");
    }
  }, [data]);

  const handleUpdateData = async () => {
    try {
      setIsCreating(true);
      await dispatch(updatedData({ id, title, body, userId }));
      setIsCreating(false);
      setIsVisible(false);
      message.success("Data successfully updated")
    } catch (error) {
      console.log(error);
      setIsCreating(false);
    }
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Modal
        title="Edit Data"
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="id">
            <Input placeholder="Id" value={id} disabled />
          </Form.Item>
          <Form.Item label="userId">
            <Input placeholder="userId" value={userId} disabled />
          </Form.Item>
          <Form.Item label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="body">
            <Input
              placeholder="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Item>
          <Update handleUpdateData={handleUpdateData} isCreating={isCreating} />
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
