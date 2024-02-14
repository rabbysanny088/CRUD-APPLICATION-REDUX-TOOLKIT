import { Button } from "antd";

const Update = ({ handleUpdateData, isCreating }) => {
  return (
    <div>
      <Button htmlType="submit" onClick={handleUpdateData} loading={isCreating}>
        Update
      </Button>
    </div>
  );
};

export default Update;
