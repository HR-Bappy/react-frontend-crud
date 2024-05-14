import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Select from "../../../components/select";
import './add-user.scss'
import { LocalStorageService } from "../../../services/localStorage.service";
import { useNavigate } from "react-router-dom";
import { roleList } from "../../../data/user";
import AddEditForm from "../add-edit-form";
import axios from "axios";
function Login() {
    const navigate = useNavigate()
    const defalutValue = {
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profile_image: ''
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            let formData: any = new FormData();

            formData.append("employee_name", data?.employee_name);
            formData.append("employee_age", data?.employee_age);
            formData.append("employee_salary", data?.employee_salary);
            formData.append("profile_image", data?.profile_image);
            const response = await axios.post(
                `https://dummy.restapiexample.com/api/v1/create`, formData
            );
            // tempData=tempData?.concat(data);
            // LocalStorageService.set('users', tempData)
            // // 
            toast.success('User Created')
            navigate('/employee')
            console.log('data', data)
            // window.location.reload();


        } catch (error) {
        }
    };

    return (
        <div className="user-add-page">
            <div className="container-fluid">
                <AddEditForm onSubmit={onSubmit} title='Add Employee' defaultValue={defalutValue} />
            </div>
        </div>
    );
}

export default Login;