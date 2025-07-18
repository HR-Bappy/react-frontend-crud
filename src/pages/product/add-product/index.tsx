import { useForm } from "react-hook-form";
import "./add-product.scss";
import { useNavigate } from "react-router-dom";
import AddEditForm from "../add-edit-form";
import axios from "axios";
import { API_BASE_URL } from "../../../helper/constant";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const defalutValue = {
   
  };
  const {
    formState: {  },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post(API_BASE_URL + "product/create", data);
      toast.success("Product created success")
      navigate("/product");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="user-add-page">
      <div className="container-fluid">
        <AddEditForm
          onSubmit={onSubmit}
          title="Add Product"
          defaultValue={defalutValue}
        />
      </div>
    </div>
  );
}

export default Login;
