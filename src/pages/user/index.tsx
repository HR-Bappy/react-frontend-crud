import { Link, useSearchParams } from "react-router-dom";
import "./user.scss";
import {
  FaRegFileExcel,
  FaRegFilePdf,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { categoryOption, defaultProduct, sortList } from "../../data/user";
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
import { columns, generateExcel, generatePdfContent } from "./utils";
import { API_BASE_URL } from "../../helper/constant";
import ConfirmationModal from "../../components/ConfirmationModal";

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
const User = () => {
  const [userData, setUserData] = useState<any[]>([]); //defaultProduct
  const [deletedData, setDeletedData] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const [category, setCategory] = useState<string>(categoryParam);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotaItems] = useState<number>(1);

  useEffect(() => {
    getProductList();
  }, [pageSize, currentPage, searchKey, category]);

  const getProductList = async () => {
    const payload = {
      meta: {
        page: currentPage - 1,
        limit: pageSize,
      },
      body: {
        category: category,
        searchKey: searchKey,
        // fromDate: "2025-03-10",
        // toDate: "2025-03-17",
      },
    };
    setIsLoading(true);
    try {
      const response: any = await axios.post(
        API_BASE_URL + `product/get-list`,
        payload
      );
      setUserData(response?.data?.body);
      setTotaItems(response?.data?.meta?.totalRecords);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = (data: any) => {
    setDeletedData(data);
    setConfirm(true);
    return;
  };
  const handleSearch = (text: any) => {
    setIsLoading(true);
    setSearchKey(text);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 400), []);

  const handleSort = (value: any) => {
    if (value == 0) {
      getProductList();
      return;
    }
    let temp = [...userData];
    if (value == 1) {
      temp.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      setUserData(temp);
    } else if (value == 2) {
      temp.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
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

  const handleDownloadReport = async (option: any) => {
    const payload = {
      meta: {
        page: currentPage - 1,
        limit: totalItems,
      },
      body: {
        category: category,
        searchKey: searchKey,
        // fromDate: "2025-03-10",
        // toDate: "2025-03-17",
      },
    };
    try {
      const response: any = await axios.post(
        API_BASE_URL + `product/get-list`,
        payload
      );
      console.log("response", response);
      if (option?.value === "pdf") {
        generatePDF(await generatePdfContent(response?.data?.body));
        console.log("pdf ----", userData);
      } else if (option?.value === "excel") {
        generateExcel(response?.data?.body, columns);
      } else toast.error("Something went wrong");
      // setUserData(response?.data?.body);
      // setTotaItems(response?.data?.meta?.totalRecords);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    console.log("deletedData,", deletedData);
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/product/delete-by-id/${deletedData.id}`
      );

      toast.success(`'${deletedData.name}' Deleted`);
      setDeletedData({});
      getProductList();
      setConfirm(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="user-page">
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="page-header d-flex justify-content-between align-items-center">
            <h2>Product List</h2>
            <Link className="btn btn_outline_primary" to={"/product/add"}>
              Add Product
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
          <div className="col-md-3 col-sm-6 filter">
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
          <div className="col-md-3 col-sm-6 filter">
            <div className="d-flex align-items-center">
              <Select
                isRequired
                valuesKey="value"
                textKey="name"
                options={categoryOption}
                defaultValue={
                  category
                }
                registerProperty={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setCategory(e.target.value),
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
          <table className="table  table__ ">
            <thead>
              <tr>
                {/* {
                  columns?.map((item,i)=>{
                    return(<th className={item.align} scope="col" key={i}>
                  {item?.text}
                </th>)
                  })
                

                } */}
                <th className="text-left" scope="col">
                  #
                </th>
                <th className="text-left" scope="col">
                  Product Name
                </th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Taxable</th>
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
                      {/* <td className="text-left">
                        <div className="w-100 d-flex ">
                          <img
                            width={55}
                            height={55}
                            src={`https://reqres.in/img/faces/${getRandomMod13()}-image.jpg`}
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
                      </td> */}
                      <td className="fw-bold">{row?.name}</td>
                      <td style={{ maxWidth: "650px" }}>{row?.description}</td>
                      <td>{row?.category}</td>
                      <td>{row?.price}</td>
                      <td>{row?.isTaxable}</td>
                      {/* <td>
                        {row?.address?.street +
                          ", " +
                          row?.address?.city +
                          ", " +
                          row?.address?.country}
                      </td> */}

                      <td className="text-end">
                        <Link
                          onClick={() => LocalStorageService.set("edit", row)}
                          to={"/product/" + row.id}
                          title="edit"
                          className="btn p-0"
                        >
                          <MdEdit color="#009879" />
                        </Link>{" "}
                        <button
                          title="delete"
                          className="btn p-0"
                          onClick={() => handleDelete(row)}
                        >
                          <MdOutlineDelete color="red" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {!!userData?.length && (
            <div className="mt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / pageSize)}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        show={confirm}
        onConfirm={handleConfirmDelete}
        onClose={() => setConfirm(false)}
        title="Delete Item"
        message={
          <span>
            {" "}
            Are you sure you want to delete <b>{deletedData.name}</b>?{" "}
          </span>
        }
        confirmText="Delete Product"
        cancelText="Cancel"
        variant="danger" // Try "success", "info", "warning"
      />
    </div>
  );
};

export default User;
