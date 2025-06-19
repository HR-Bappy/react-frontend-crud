import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./edit-product.scss";
import { LocalStorageService } from "../../../services/localStorage.service";
import { useNavigate, useParams } from "react-router-dom";
import { users } from "../../../data/user";
import AddEditForm from "../add-edit-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../helper/constant";
function Login({}) {
  const { id } = useParams();
  const userData = users;
  const navigate = useNavigate();
  const [defalutValue, setDefaultValue] = useState<any>();
  const [hasLoaded, setHasLoaded] = useState(false);
  const {
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) getData(id);
  }, []);

  const getData = async (id: any) => {
    try {
      const response = await axios.get(
        API_BASE_URL + `product/get-by-id/${id}`
      );
      setDefaultValue(response?.data?.body);

      setHasLoaded(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setDefaultValue(LocalStorageService?.get("edit"));
      setHasLoaded(true);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await axios.post(API_BASE_URL + "product/create", {
        ...data,
        id: id,
      });
      toast.success("Product Updated Succesfully");
      navigate("/product");

    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="user-add-page">
      {hasLoaded && (
        <div className="container-fluid">
          <AddEditForm
            type="edit"
            onSubmit={onSubmit}
            title="Edit Product"
            defaultValue={defalutValue}
          />
        </div>
      )}
    </div>
  );
}

export default Login;
