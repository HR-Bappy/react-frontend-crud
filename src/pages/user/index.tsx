import { Link } from "react-router-dom";
import "./user.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import { defaultData, sortList } from "../../data/user";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { LocalStorageService } from "../../services/localStorage.service";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "../../components/select";
import ContentLoader from "../../components/ContentLoader";
import { debounce } from "../../helper/debounce";
import Pagination from "../../components/Pagination";
const initMeta: any = {
  page: 0,
  limit: 10,
  sort: [],
};
const User = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [mainData, setMainData] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [respMeta, setRespMeta] = useState<any>(initMeta);

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://dummy.restapiexample.com/api/v1/employees`
      );
      setUserData(response?.data?.data?.slice(respMeta.page, respMeta?.limit));

      setMainData(response?.data?.data?.slice(respMeta.page, respMeta?.limit));
      setRespMeta({ ...respMeta, totalRecords:response?.data?.data?.length });
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setUserData([...defaultData]);
      setMainData([...defaultData]);
      setRespMeta({ ...respMeta, totalRecords: defaultData?.length });
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `https://dummy.restapiexample.com/public/api/v1/delete/${id}`
      );
      toast.success("User Deleted");
      let temp = [...userData];
      temp = temp?.filter((item: any) => id != item?.id);
      setUserData(temp);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleSearch = (text: any) => {
    setIsLoading(true);
    setSearchKey(text);
    let temp = [...mainData];
    temp = temp?.filter((item: any) =>
      item?.employee_name?.toLowerCase().includes(text.toLowerCase())
    );
    setUserData(temp);
    setIsLoading(false);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 400), []);

  const handleSort = (value: any) => {
    console.log("value", value);
    if (value == 0) {
      getEmployeeList();
      return;
    }
    let temp = [...userData];
    if (value == 1) {
      temp.sort(function (a, b) {
        return parseFloat(a.employee_age) - parseFloat(b.employee_age);
      });
      setUserData(temp);
    } else if (value == 2) {
      temp.sort(function (a, b) {
        return parseFloat(b.employee_age) - parseFloat(a.employee_age);
      });
      setUserData(temp);
    }
  };
  const onPageChanged = (metaParams: any) => {
    console.log("metaParams", metaParams);
  };

  const removeSearch = () => {
    setSearchKey("");
    handleSearch("");
    const div: any = document.getElementById("searchbox");
    if (div) div.value = "";
  };
  return (
    <div className="user-page">
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="page-header d-flex justify-content-between align-items-center">
            <h2>Employee List</h2>
            <Link className="btn btn-outline-primary" to={"/employee/add"}>
              Add
            </Link>
          </div>
        </div>
        <div className="row filter-section">
          <div className="col-md-4 col-sm-6 search-container">
            <input
              onChange={(e: any) => debouncedSearch(e.target.value)}
              type="text"
              name="searchbox"
              id="searchbox"
              placeholder="Type something"
            />
            <div className="styled-link">
              {searchKey == "" || !searchKey ? (
                <FaSearch className="search-icon" />
              ) : (
                <FaTimes onClick={removeSearch} className="search-icon" />
              )}
            </div>
          </div>
          <div className="col-md-6 col-sm-6 filter">
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2">Sort by</p>
              <Select
                isRequired
                valuesKey="value"
                textKey="name"
                options={sortList}
                registerProperty={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSort(e.target.value),
                }}
              />
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Salary
                </th>
                <th className="text-center" scope="col">
                  Age
                </th>
                <th className="text-center" scope="col">
                  Image
                </th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <ContentLoader
                text="Fetching data..."
                size={30}
                color="#28a745"
              />
            ) : (
              <tbody>
                {userData?.map((row: any, index: number) => {
                  return (
                    <tr>
                      <th className="text-center" scope="row">
                        {index + 1}
                      </th>
                      <td>{row?.employee_name}</td>
                      <td>{row?.employee_salary}</td>
                      <td>{row?.employee_age}</td>
                      <td className="d-flex justify-content-center">
                        <div className="table-image">
                          <img
                            src={
                              row?.profile_image == ""
                                ? "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                                : row?.profile_image
                            }
                          />
                        </div>
                      </td>

                      <td>
                        <Link
                          onClick={() => LocalStorageService.set("edit", row)}
                          to={"/employee/" + row.id}
                          title="edit"
                          className="btn p-0"
                        >
                          <MdEdit />
                        </Link>{" "}
                        <button
                          title="delete"
                          className="btn p-0"
                          onClick={() => handleDelete(row?.id)}
                        >
                          <MdOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>

          <Pagination
            meta={respMeta}
            pageNeighbours={2}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
