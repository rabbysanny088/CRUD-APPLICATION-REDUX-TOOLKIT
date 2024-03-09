import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleForgot = (e) => {
    e.preventDefault();
    const emailVal = e.target.elements.email.value;
    sendPasswordResetEmail(auth, emailVal)
      .then(() => {
        toast.success("Check your email for password reset instructions");
        navigate('/login')
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        toast.error("Failed to send password reset email. Please try again later.");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleForgot}
        className="flex items-center justify-center gap-2"
      >
        <div>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
