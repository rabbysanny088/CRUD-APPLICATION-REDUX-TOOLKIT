import { Alert, Button, Input, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { FetchData, deleteData } from "../features/Datas/DataSlice";
import { setDeletingState } from "../features/Datas/DeleteSlice";
import CreateData from "../layouts/CreateData";
import Edit from "../layouts/Edit";

const { Search } = Input;

const SecondPages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FetchData());
  }, [dispatch, page]);
  const [isVisible, setIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [search, setSearch] = useState("");

  const deleting = useSelector((state) => state.deleteReducer.deletingStates);

  const { datas, error, isLoading } = useSelector(
    (state) => state.datasReducers
  );

  const handleEditButtonClick = (data) => {
    setDataToEdit(data);
    setIsVisible(true);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      dispatch(setDeletingState({ id, loading: true }));
      await dispatch(deleteData(id));
      message.success("Data Successfully Deleted");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setDeletingState({ id, loading: false }));
    }
  };

  useEffect(() => {
    dispatch(FetchData());
  }, [dispatch]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="default"
              onClick={() => handleEditButtonClick(record)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              loading={deleting[record.id]}
              onClick={() => handleDeleteButtonClick(record.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <ScaleLoader
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        color="#36d7b7"
      />
    );
  }

  if (error) {
    if (error.code === "net::ERR_INTERNET_DISCONNECTED") {
      return message.error("NetWork problem");
    } else {
      return (
        <Alert
          style={{
            textAlign: "center",
          }}
          message="Please check your internet connection and try again"
          type="error"
        />
      );
    }
  }

  const dataSource = datas
    .filter((data) => {
      const searchItem = search ? search.toLowerCase() : "";
      return searchItem === "" || data.title.toLowerCase().includes(searchItem);
    })
    .map((data, index) => ({
      id: data.id,
      userId: data.userId,
      title: data.title,
      body: data.body,
      key: index.toString(),
    }));

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <Search
            enterButton="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            allowClear
            placeholder="Search according to title"
          />
          <div>
            <Button type="default" onClick={() => navigate("/")}>
              Go to home
            </Button>
          </div>
        </div>
        <div>
          <CreateData />
        </div>
      </div>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: true }}
      />
      <Edit
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={dataToEdit}
      />
    </>
  );
};

export default SecondPages;
