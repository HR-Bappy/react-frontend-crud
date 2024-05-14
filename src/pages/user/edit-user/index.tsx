import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Select from "../../../components/select";
import './edit-user.scss'
import { LocalStorageService } from "../../../services/localStorage.service";
import { useNavigate, useParams } from "react-router-dom";
import { roleList, users } from "../../../data/user";
import AddEditForm from "../add-edit-form";
import { useEffect, useState } from "react";
import axios from "axios";
function Login({ }) {
    const { id } = useParams();
    const userData = users
    const navigate = useNavigate()
    const [defalutValue, setDefaultValue] = useState<any>()
    const [hasLoaded, setHasLoaded] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if(id)
        getData(id)
    }, [])

   
  const getData = async (id:any) => {
    try {
      const response = await axios.get(
        `https://dummy.restapiexample.com/api/v1/employee/${id}`
      );
      setDefaultValue(response?.data?.data)
      console.log('responseee',response.data)
      setHasLoaded(true)
    } catch (error:any) {
      toast.error(error.response.data.message);
      setDefaultValue(LocalStorageService?.get('edit'))
      setHasLoaded(true)
    }
  };
    
  
  const onSubmit = async (data: any) => {
    try {
        let formData: any = new FormData();
        
  formData.append("employee_name", data?.employee_name);
  formData.append("employee_age", data?.employee_age);
  formData.append("employee_salary", data?.employee_salary);
  formData.append("profile_image", data?.profile_image);
  const response = await axios.put(
    `https://dummy.restapiexample.com/public/api/v1/update/${id}`,formData
  );
        // tempData=tempData?.concat(data);
        // LocalStorageService.set('users', tempData)
        // // 
        toast.success('User Updated')
        navigate('/employee')
        // window.location.reload();


    } catch (error:any) {
        toast.error(error.response.data.message);
    }
};


    return (
        <div className="user-add-page">
            {hasLoaded &&
                <div className="container-fluid">
                    <AddEditForm type='edit' onSubmit={onSubmit} title='Edit User' defaultValue={defalutValue} />
                </div>
            }

        </div>
    );
}

export default Login;