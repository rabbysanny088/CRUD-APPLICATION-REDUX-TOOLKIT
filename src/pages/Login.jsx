import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthFirebase from "../hooks/useAuthFirebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { LoginAuth, error, isLoggedIn } = useAuthFirebase();
  const [loading, setLoading] = useState(false);

  const handleSubmitLog = async (e) => {
    e.preventDefault();
    setLoading(true);
    await LoginAuth(email, password);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {error && <ToastContainer />}

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login!</h1>
          </div>
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <div className="card shrink-0 sm:w-[30rem] bg-base-100">
              <form className="card-body" onSubmit={handleSubmitLog}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                  <p className="text-center mt-2 font-bold">
                    You have an account?{" "}
                    <Link to="/">
                      <span className="text-blue-500">Signup</span>
                    </Link>
                  </p>
                </div>
                <Link to="/forgot">
                  {" "}
                  <p className="text-center text-md font-bold cursor-pointer">
                    Foget password
                  </p>
                </Link>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
