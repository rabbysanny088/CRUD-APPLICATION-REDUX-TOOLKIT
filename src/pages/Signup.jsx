import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthFirebase from "../hooks/useAuthFirebase";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    SigninAuth,
    error,
    isLoggedIn,
    displayName,
    setDisplayName,
    setFile,
    displayEmail,
    setDisplayEmail,
  } = useAuthFirebase();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await SigninAuth(displayEmail, password);
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
          <h1 className="text-5xl font-bold">Signin!</h1>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <div className="card shrink-0 sm:w-[30rem] bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    value={displayEmail}
                    onChange={(e) => setDisplayEmail(e.target.value)}
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
                <div>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-success">
                    Signin
                  </button>
                  <Link to="/login">
                    <p className="text-center mt-2 font-bold">
                      You have an account?{" "}
                      <span className="text-blue-500">Login</span>
                    </p>
                  </Link>{" "}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
