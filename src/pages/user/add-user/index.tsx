import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./add-user.scss";
import { useNavigate } from "react-router-dom";
import AddEditForm from "../add-edit-form";
import axios from "axios";
import { API_BASE_URL } from "../../../helper/constant";
function Login() {
  const navigate = useNavigate();
  const defalutValue = {
    employee_name: "",
    employee_salary: "",
    employee_age: "",
    profile_image: "",
  };
  const {
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("data", data);
    try {
      const response = await axios.post(API_BASE_URL + "product/create", data);
      console.log("response", response.status);
      navigate("/employee");
    } catch (error) {
      console.log(error);
    }

    // return;
    // try {
    //   let formData: any = new FormData();

    //   formData.append("employee_name", data?.employee_name);
    //   formData.append("employee_age", data?.employee_age);
    //   formData.append("employee_salary", data?.employee_salary);
    //   formData.append("profile_image", data?.profile_image);
    //   const response = await axios.post(
    //     `https://dummy.restapiexample.com/api/v1/create`,
    //     formData
    //   );
    //   toast.success("User Created");
    //   navigate("/employee");
    //   console.log("data", data);
    // } catch (error) {}
  };

  return (
    <div className="user-add-page">
      <div className="container-fluid">
        <AddEditForm
          onSubmit={onSubmit}
          title="Add Employee"
          defaultValue={defalutValue}
        />
      </div>
    </div>
  );
}

export default Login;
