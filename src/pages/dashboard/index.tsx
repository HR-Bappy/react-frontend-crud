import "./dashboard.scss";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../helper/constant";
import axios from "axios";
import { toast } from "react-toastify";
import ContentLoader from "../../components/ContentLoader";
import { FaChartBar, FaChartPie, FaHeart, FaLongArrowAltRight, FaRegSun, FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>()
  const [jewellery, setJewellery] = useState<number>()
  const [clothing, setClothing] = useState<number>()
  const [electronics, setElectronics] = useState<number>()
    
  // const data = [
  //   {
  //     id: 1,
  //     title: "Flexible Spending Account",
  //     icon: <FaChartPie fontSize={48} />,
  //     amount: 999888,
  //     bgColor: "#00c389",
  //   },
  //   {
  //     id: 2,
  //     title: "HSA Total Balance",
  //     icon: <FaHeart fontSize={48} />,
  //     amount: 555666,
  //     bgColor: "#c110a0",
  //   },
  //   {
  //     id: 3,
  //     title: "Your Paid Balance",
  //     icon: <FaRegSun fontSize={48} />,
  //     amount: 111333,
  //     bgColor: "#00a0d2",
  //   },
  //   {
  //     id: 4,
  //     title: "Savings Plan Total Balance",
  //     icon: <FaChartBar fontSize={48} />,
  //     amount: 666999,
  //     bgColor: "#702082",
  //   },
  // ];
  useEffect(() => {
    getProductList();
    getProductList("electronics");
    getProductList("clothing");
    getProductList("jewellery");
  }, []);
  const getProductList = async (category = "total") => {
    let payload: any = {
      meta: {
        page: 0,
        limit: 1,
      },
      body: {},
    };
    if (category !== "total") payload.body.category = category;
    setIsLoading(true);
    try {
      const response: any = await axios.post(
        API_BASE_URL + `product/get-list`,
        payload
      );
      if(category==='total')
        setTotal(response?.data?.meta?.totalRecords)
      else if(category==='electronics')
        setElectronics(response?.data?.meta?.totalRecords)
      else if(category==='clothing')
        setClothing(response?.data?.meta?.totalRecords)
      else if(category==='jewellery')
        setJewellery(response?.data?.meta?.totalRecords)
      // let temp: any = { ...data };
      // temp[category] = response?.data?.meta?.totalRecords;
      // setData(temp);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  console.log("data", total,clothing,jewellery,electronics);
  return (
    <div className="dashboard">
      {isLoading ? (
        <ContentLoader />
      ) : (
        <div className="container-fluid">
          <div className="row">
              <div className="col-md-3 p-3">
                <div
                  className="single-card"
                  style={{ background: '#00c389' }}
                >
                  <div className="flex-item-inner">
                    <a href="#">
                      <div className="card-front">
                        <div className="text-center card-icon"><FaHeart fontSize={48} /></div>
                        <h4 className="mb-0">Total Item</h4>
                        <p className="detail mb-0">{total}</p>
                        <div className="link text-end fw-bold">
                          <Link to={'/product'} >
                          See more <FaLongArrowAltRight />{" "}
                        </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-3 p-3">
                <div
                  className="single-card"
                  style={{ background: '#00c389' }}
                >
                  <div className="flex-item-inner">
                    <a href="#">
                      <div className="card-front">
                        <div className="text-center card-icon"><FaRegSun fontSize={48} /></div>
                        <h4 className="mb-0">Electronics Items</h4>
                        <p className="detail mb-0">{electronics}</p>
                        <div className="link text-end fw-bold">
                          <Link to={'/product?category=electronics'} >
                          See more <FaLongArrowAltRight />{" "}
                        </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-3 p-3">
                <div
                  className="single-card"
                  style={{ background: '#00c389' }}
                >
                  <div className="flex-item-inner">
                    <a href="#">
                      <div className="card-front">
                        <div className="text-center card-icon"><FaChartBar fontSize={48} /></div>
                        <h4 className="mb-0">Clothing Item</h4>
                        <p className="detail mb-0">{clothing}</p>
                        <div className="link text-end fw-bold">
                          <Link to={'/product?category=clothing'} >
                          See more <FaLongArrowAltRight />{" "}
                        </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-3 p-3">
                <div
                  className="single-card"
                  style={{ background: '#00c389' }}
                >
                  <div className="flex-item-inner">
                    <a href="#">
                      <div className="card-front">
                        <div className="text-center card-icon"><FaThList fontSize={48} /></div>
                        <h4 className="mb-0">Jewellery Items</h4>
                        <p className="detail mb-0">{jewellery}</p>
                        <div className="link text-end fw-bold">
                          <Link to={'/product?category=jewellery'} >
                          See more <FaLongArrowAltRight />{" "}
                        </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
        </div>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card---item">
                <h4>DASHBOARD ITEM</h4>
                <div className="progress-circle">
                  <span className="progress-text">89%</span>
                </div>
                <div className="card-footer">
                  <div className="footer-item">
                    <h5>GOAL</h5>
                    <span className="goal">85%</span>
                  </div>
                  <div className="divider"></div>
                  <div className="footer-item">
                    <h5>RED LINE</h5>
                    <span className="red-line">80.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
