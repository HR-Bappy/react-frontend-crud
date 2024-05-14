import { useForm } from "react-hook-form";

const AddEditForm = ({ onSubmit, defaultValue, title, type }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm(
        {
            defaultValues: defaultValue,
        }
    );
    console.log('defa', defaultValue)

    return (
        <form className="p-lg-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <h3 className="mb-4">{title}</h3>

                <div className="col-md-6 mb-3">
                    <label className="form-control-label">Name</label>

                    <input
                        placeholder="Enter your name"
                        type="text"
                        className="form-control"
                        {...register("employee_name", {
                            required: "Name is required",

                        })}
                    />
                </div>
                <div className="col-md-6  mb-3">
                    <label className="form-control-label">Salary</label>

                    <input
                        placeholder="Enter your Salary"
                        type="number"
                        className="form-control"
                        {...register("employee_salary", {
                            required: "Salary is required",
                        })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-control-label">Age</label>

                    <input
                        placeholder="Enter your age"
                        type="number"
                        className="form-control"
                        {...register("employee_age", {
                            required: "Age is required",

                        })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-control-label">Image</label>

                    <input
                        type="file"
                        className="form-control"
                        {...register("profile_image")}
                    />
                </div>
                <div className="text-center col-md-2 offset-md-5"><button type="submit" className="btn btn-color  px-5 mb-5 w-100">{type == 'edit' ? 'Edit' : 'Create'}</button></div>

            </div>
        </form>
    )
}

export default AddEditForm