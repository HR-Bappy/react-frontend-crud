import { toast } from "react-toastify";
import "./index.scss";
import { useForm } from "react-hook-form";
import { users } from "../../data/user";
import { LocalStorageService } from "../../services/localStorage.service";
import { FaRegUser } from "react-icons/fa";

function Login() {
  const userData = users;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let flag = false;
      for (let i = 0; i < userData?.length; i++) {
        if (
          data?.email == userData[i].email &&
          userData[i]?.password == data.password
        ) {
          LocalStorageService.set("user", userData[i]);
          LocalStorageService.set("users", users);
          toast.success("Login Success");
          flag = true;
          window.location.reload();
          break;
        }
      }
      if (!flag) toast.error("Invalid user!!!");
    } catch (error) {}
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card__success my-5">
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="d-flex flex-column align-items-center">
                  <h2 className="mb-3 font-bold" style={{letterSpacing:'3px'}}>Login</h2>
                  {/* <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                    alt="profile"
                  /> */}
                  <div className="login-icon">
                  <FaRegUser size={100}color='#fff'/>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-control-label">Email</label>

                  <input
                    placeholder="Enter your email"
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-control-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="btn btn_primary  px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
