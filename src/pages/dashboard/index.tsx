import {
  FaChartBar,
  FaChartPie,
  FaHeart,
  FaLongArrowAltRight,
  FaRegSun,
} from "react-icons/fa";
import "./dashboard.scss";
const Dashboard = () => {
  const data = [
    {
      id: 1,
      title: "Flexible Spending Account",
      icon: <FaChartPie fontSize={48} />,
      amount: 999888,
      bgColor: "#00c389",
    },
    {
      id: 2,
      title: "HSA Total Balance",
      icon: <FaHeart fontSize={48} />,
      amount: 555666,
      bgColor: "#c110a0",
    },
    {
      id: 3,
      title: "Your Paid Balance",
      icon: <FaRegSun fontSize={48} />,
      amount: 111333,
      bgColor: "#00a0d2",
    },
    {
      id: 4,
      title: "Savings Plan Total Balance",
      icon: <FaChartBar fontSize={48} />,
      amount: 666999,
      bgColor: "#702082",
    },
  ];
  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          {data?.map((item) => {
            return (
              <div className="col-md-3 p-3">
                <div
                  className="single-card"
                  style={{ background: item.bgColor }}
                >
                  <div className="flex-item-inner">
                    <a href="#">
                      <div className="card-front">
                        <div className="text-center card-icon">{item.icon}</div>
                        <h4 className="mb-0">{item.title}</h4>
                        <p className="detail mb-0">$999,888</p>
                        <p className="link text-end fw-bold">
                          Details <FaLongArrowAltRight />{" "}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
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
    </div>
  );
};

export default Dashboard;
