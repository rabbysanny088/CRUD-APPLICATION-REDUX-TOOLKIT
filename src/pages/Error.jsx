import error from "../assets/img/5155999_2704891.jpg";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <img
        className=""
        style={{ width: "1000px", height: "auto" }}
        src={error}
        alt="Error"
      />
    </div>
  );
};

export default ErrorPage;
