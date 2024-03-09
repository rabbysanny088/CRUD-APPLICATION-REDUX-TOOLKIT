import { Alert, Button, Input, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FetchData, deleteData } from "../features/Datas/DataSlice";
import { setDeletingState } from "../features/Datas/DeleteSlice";
import useAuthFirebase from "../hooks/useAuthFirebase";
import Navbar from "../pages/Navbar";
import CreateData from "./CreateData";
import Edit from "./Edit";

const { Search } = Input;

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const { isLoggedIn } = useAuthFirebase();

  const navigate = useNavigate();

  const deleting = useSelector((state) => state.deleteReducer.deletingStates);

  const dispatch = useDispatch();
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
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
      <Spin
        // size="small"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
          <CreateData />
        </div>
        <div className="flex items-center">
          <div>
            <Navbar />
          </div>
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

export default Home;
