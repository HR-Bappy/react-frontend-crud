import { toast } from "react-toastify";
import "./index.scss";
import { useForm } from "react-hook-form";
import { users } from "../../data/user";
import { LocalStorageService } from "../../services/localStorage.service";

function Login() {
    const userData = users;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            let flag = false
            for (let i = 0; i < userData?.length; i++) {
                if (data?.email == userData[i].email && userData[i]?.password == data.password) {
                    LocalStorageService.set('user', userData[i])
                    LocalStorageService.set('users', users)
                    toast.success("Login Success")
                    flag = true
                    break;
                }
            }
            if (!flag)
                toast.error("Wrong user or pass")
            window.location.reload();


        } catch (error) {
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5">

                            <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit(onSubmit)}>

                                <div className="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        width="200px" alt="profile" />
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
                                        {...register("password", { required: "Password is required" })}
                                    />
                                </div>
                                <div className="text-center"><button type="submit" className="btn btn-color  px-5 mb-5 w-100">Login</button></div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;