import { useNavigate } from "react-router-dom";
import useAuthFirebase from "../hooks/useAuthFirebase";

const Navbar = () => {
  const { LogOutAuth, displayName, user } = useAuthFirebase();
  const navigate = useNavigate();

  console.log(displayName);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user && user.photoURL && (
                <img src={user.photoURL} alt="Profile Picture" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                {user && user.displayName && <p>Name: {user.displayName}</p>}
                <span className="badge">New</span>
              </a>
            </li>
            <li> {user && user.email && <p>Email: {user.email}</p>}</li>
            <li>
              <a
                onClick={() => {
                  LogOutAuth();
                //   navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
