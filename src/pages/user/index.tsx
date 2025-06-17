import { Link } from "react-router-dom";
import "./user.scss";
import {
  FaRegFileExcel,
  FaRegFilePdf,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { defaultData, sortList } from "../../data/user";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { LocalStorageService } from "../../services/localStorage.service";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "../../components/select";
import ContentLoader from "../../components/ContentLoader";
import { debounce } from "../../helper/debounce";
import Pagination from "../../components/Pagenate";
import Dropdown from "react-dropdown";
import { generatePDF } from "../../helper/generatePdf";
import { generatePdfContent } from "./utils";

export const downloadReportOption = [
  {
    value: "pdf",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FaRegFilePdf color="red" fontSize={18} /> <span>পিডিএফ</span>
      </div>
    ),
  },
  {
    value: "excel",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FaRegFileExcel color="green" fontSize={18} /> <span>এক্সেল</span>
      </div>
    ),
  },
];
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = 225;
  const totalPages = Math.ceil(totalItems / pageSize);
  console.log("userData", userData);
  useEffect(() => {
    getEmployeeList();
  }, [pageSize, currentPage]);

  const getEmployeeList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://fakerapi.it/api/v2/persons?_quantity=${pageSize}&_page=3`
      );
      setUserData(response?.data?.data?.slice(respMeta.page, respMeta?.limit));
      setMainData(response?.data?.data?.slice(respMeta.page, respMeta?.limit));
      setRespMeta({ ...respMeta, totalRecords: response?.data?.data?.length });
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

  const removeSearch = () => {
    setSearchKey("");
    handleSearch("");
    const div: any = document.getElementById("searchbox");
    if (div) div.value = "";
  };

  const handleDownloadReport = async(option: any) => {
    if (option?.value === "pdf") {
      generatePDF( await generatePdfContent(userData));
      console.log("pdf ----", userData);
    } else if (option?.value === "excel") {
      console.log("excel---", userData);
    } else toast.error("Something went wrong");
  };

  return (
    <div className="user-page">
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="page-header d-flex justify-content-between align-items-center">
            <h2>Employee List</h2>
            <Link className="btn btn_outline_primary" to={"/employee/add"}>
              Add
            </Link>
          </div>
        </div>
        <div className="row filter-section">
          <div className="col-md-3 col-sm-6 search-container">
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
          <div className="col-md-2 col-sm-6 filter">
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
          <div className="col d-flex justify-content-end">
            <div style={{ width: "200px" }}>
              <Dropdown
                className="w-100"
                options={downloadReportOption}
                onChange={handleDownloadReport}
                placeholder="Download Report"
              />
            </div>
          </div>
        </div>

        <div className="row pt-5">
          <table className="table__ ">
            <thead className="">
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-left" scope="col">
                  Profile
                </th>
                <th scope="col">Gender</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Website Link</th>
                <th scope="col">Address</th>
                <th className="text-end" scope="col">
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
                      <td className="text-left">
                        <div className="w-100 d-flex ">
                          <img
                            width={55}
                            height={55}
                            src={`https://reqres.in/img/faces/${
                              index + 1
                            }-image.jpg`}
                            alt={row.firstname}
                          />
                          <div className="ms-2">
                            <span className="fw-bold">
                              {row?.firstname + " " + row?.lastname}
                            </span>
                            <br />
                            <span>{row?.birthday}</span>
                          </div>
                        </div>
                      </td>
                      <td>{row?.gender}</td>
                      <td>{row?.phone}</td>
                      <td>{row?.email}</td>
                      <td>{row?.website}</td>
                      <td>
                        {row?.address?.street +
                          ", " +
                          row?.address?.city +
                          ", " +
                          row?.address?.country}
                      </td>

                      <td className="text-end">
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

          <div className="mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
