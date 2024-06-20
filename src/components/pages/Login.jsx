import { useEffect, useState } from "react";
import fetchLogin from "../../dataApi/Data";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notifySuccess = () => toast.success("Log in SuccessFully!");
  const notifyError = () => toast.error("Invalid email or password !");

  const handalFormSubmit = async (e) => {
    e.preventDefault();
    const emailError = email === "" ? "Email is required" : "";
    const passwordError = errorMessage
      ? ""
      : password === ""
      ? "Password is required"
      : "";
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) {
      return;
    }

    try {
      setLoading(true);
      const data_login = await fetchLogin(email, password);

      if (data_login.success === true) {
        notifySuccess();
        setLoading(false);
        setData(data_login);
        navigate("/analytics");
      } else {
        notifyError();
        setLoading(false);
        setErrorMessage("Invalid email or password. Please try again.");
        setPassword("");
      }
    } catch (error) {
      notifyError();
      setLoading(false);
      setErrorMessage(error.message);
      setPassword("");
    }
  };

  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/analytics");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="md:grid grid-cols-12   h-[100vh] bg-[#e2dfe9]">
        <div className="col-span-7 flex items-center justify-center ">
          <img
            className="lg:max-h-[550px] h-[400px]"
            src="/login/loginimg.png"
            alt=""
          />
        </div>
        <div className="col-span-5  flex justify-center items-center bg-[#e2dfe9] px-4 py-4">
          <div className="lg:w-[350px] w-[300px] ">
            <div>
              <img src="/favicon.ico" alt="" />
            </div>
            <h2 className="text-start font-bold text-[22px] py-2">
              Welcome to Trubust! 👋
            </h2>
            <form onSubmit={handalFormSubmit}>
              <div className="space-y-8">
                <div className="flex flex-col space-y-1">
                  <label className="" htmlFor="">
                    Email
                  </label>
                  <input
                    value={email}
                    className="py-3 px-2 border border-gray-300 outline-none rounded-lg w-full"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                  />
                  <span className="text-[#E42D2D] text-sm" id="emailError">
                    {errors.email}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Password</label>
                  <input
                    value={password}
                    className="py-3 px-2 border border-gray-300 outline-none rounded-lg"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                  />
                  <span className="text-[#E42D2D] text-sm" id="passwordError">
                    {errors.password}
                  </span>
                  <span>
                    {errorMessage && (
                      <span className="text-red-500 text-sm">
                        {errorMessage}
                      </span>
                    )}
                  </span>
                </div>
                <div>
                  <button
                    className={
                      loading
                        ? "bg-[#9a8be4] w-full py-2 text-white font-semibold tracking-wider rounded-md outline-none cursor-not-allowed"
                        : "bg-[#684df4] w-full py-2 text-white font-semibold tracking-wider rounded-md outline-none"
                    }
                    type="submit"
                  >
                    {loading ? "Signing..." : "Singn"}
                  </button>
                  <ToastContainer position="bottom-right" />
                </div>
              </div>
            </form>
            {loading && (
              <div className="py-2 px-10 font-semibold tracking-widest">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
