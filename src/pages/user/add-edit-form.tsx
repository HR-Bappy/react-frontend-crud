import { useForm } from "react-hook-form";
import Select from "../../components/select";
import { categoryOption } from "../../data/user";

const AddEditForm = ({ onSubmit, defaultValue, title, type }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form className="p-lg-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <h3 className="mb-4">{title}</h3>

        <div className="col-md-6 mb-3">
          <label className="form-control-label">Name</label>

          <input
            placeholder="Enter Product name"
            type="text"
            className="form-control"
            {...register("name", {
              required: "Product Name is required",
            })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-control-label">Price</label>

          <input
            placeholder="Enter product price"
            type="number"
            className="form-control"
            {...register("price", {
              required: "Price is required",
            })}
          />
        </div>
        <div className="col-md-12  mb-3">
          <label className="form-control-label">Description</label>

          <textarea
            placeholder="Enter product description"
            className="form-control"
            {...register("description", {
              required: "product description required",
            })}
          />
        </div>
        
        <div className="col-md-4 mb-3">
          <label className="form-control-label">Category</label>
          <Select
            isRequired
            valuesKey="value"
            textKey="name"
            options={categoryOption}
            registerProperty={{
              ...register(`category`),
            }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <div className=" ">
            <label className="me-2">Is Taxable?</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="yes"
                  {...register("isTaxable", { required: true })}
                />
                Yes
              </label>
              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  value="no"
                  {...register("isTaxable", { required: true })}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <label>
            <input type="checkbox" {...register("isActive")} defaultChecked />
            Is Active
          </label>
        </div>
        <div className="text-center col-md-2 offset-md-5">
          <button type="submit" className="btn btn_primary  px-5 mb-5 w-100">
            {type == "edit" ? "Edit" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEditForm;
