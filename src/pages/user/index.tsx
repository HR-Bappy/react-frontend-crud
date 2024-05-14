import { Link } from "react-router-dom"
import './user.scss'
import { FaSearch } from "react-icons/fa"
import { users } from "../../data/user"
import { MdClose, MdEdit, MdOutlineDelete } from "react-icons/md"
import { useEffect, useState } from "react"
import { LocalStorageService } from "../../services/localStorage.service"
import Modal from "../../components/modal"
import { toast } from "react-toastify"
import axios from "axios"
import Select from "../../components/select"


const User = () => {
    const [userData, setUserData] = useState<any[]>([]);
    const [mainData, setMainData] = useState<any>([])
    const [searchKey, setSearchKey] = useState<string>('')

    useEffect(() => {
        getEmployeeList()
    }, [])


    const getEmployeeList = async () => {
        try {
            const response = await axios.get(
                `https://dummy.restapiexample.com/api/v1/employees`
            );
            console.log('response', response?.data?.data)
            setUserData(response?.data?.data)
            setMainData(response?.data?.data)
            //   localStorage.setItem("user", JSON.stringify(response.data));
            //   window.location.reload();
        } catch (error: any) {
            toast.error(error.response.data.message);
            setUserData([
                {
                    "id": 1,
                    "employee_name": "Tiger Nixon",
                    "employee_salary": 320800,
                    "employee_age": 61,
                    "profile_image": ""
                },
                {
                    "id": 2,
                    "employee_name": "Garrett Winters",
                    "employee_salary": 170750,
                    "employee_age": 63,
                    "profile_image": ""
                },
                {
                    "id": 3,
                    "employee_name": "Ashton Cox",
                    "employee_salary": 86000,
                    "employee_age": 66,
                    "profile_image": ""
                }])
            setMainData([
                {
                    "id": 1,
                    "employee_name": "Tiger Nixon",
                    "employee_salary": 320800,
                    "employee_age": 61,
                    "profile_image": ""
                },
                {
                    "id": 2,
                    "employee_name": "Garrett Winters",
                    "employee_salary": 170750,
                    "employee_age": 63,
                    "profile_image": ""
                },
                {
                    "id": 3,
                    "employee_name": "Ashton Cox",
                    "employee_salary": 86000,
                    "employee_age": 66,
                    "profile_image": ""
                }])
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                `https://dummy.restapiexample.com/public/api/v1/delete/${id}`
            );
            toast.success('User Deleted')
            let temp = [...userData]
            temp = temp?.filter((item: any) => id != item?.id)
            setUserData(temp)

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const handleSearch = (text: any) => {
        setSearchKey(text)
        let temp = [...mainData]
        // if(searchKey != '' || searchKey)
        temp = temp?.filter((item: any) => item?.employee_name?.includes(text))
        setUserData(temp)
        console.log('test', text)

    }

    const sortList = [
        {
            id: 1,
            name: 'low to high',
            value: 1
        }, {
            name: 'high to low',
            id: 2,
            value: 2
        },
    ]

    const handleSort = (value: any) => {
        let temp = [...userData]
        if (value == 1)
            temp.sort(function (a, b) {
                return parseFloat(a.employee_age) - parseFloat(b.employee_age);
            });
        else if (value == 2)
            temp.sort(function (a, b) {
                return parseFloat(b.employee_age) - parseFloat(a.employee_age);
            });
        setUserData(temp)

    }
    const removeSearch = () => {
        setSearchKey('')
        handleSearch('')
        const div: any = document.getElementById('searchbox')
        if (div) div.value = ''
    }
    return (
        <div className="user-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="page-header d-flex justify-content-between align-items-center">
                        <h2>
                            User List
                        </h2>
                        <Link className="" to={'/employee/add'}>Add</Link>
                    </div>
                </div>
                <div className="row filter-section">
                    <div className="col-md-4 col-sm-6 search-container">
                        <input onChange={(e: any) => handleSearch(e.target.value)} type="text" name="searchbox" id="searchbox" placeholder="Type something" />
                        <div className="styled-link">
                            {
                                searchKey == '' || !searchKey ?
                                    <FaSearch className="search-icon" /> :
                                    <MdClose onClick={removeSearch} className="search-icon" />
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 filter">
                        <div className="d-flex align-items-center" >
                            <p className="mb-0 me-2">Sort by</p>
                            <Select
                                isRequired
                                valuesKey="value"
                                textKey="name"
                                placeholder="Default "
                                // label="Select Role"
                                options={sortList}
                                registerProperty={{
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleSort(e.target.value)
                                }}

                            />
                        </div>
                    </div>
                </div>
                <div className="row pt-5">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center" scope="col">#</th>
                                <th className="text-center" scope="col">Name</th>
                                <th className="text-center" scope="col">Salary</th>
                                <th className="text-center" scope="col">Age</th>
                                <th className="text-center" scope="col">Image</th>
                                <th className="text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData?.map((row: any, index: number) => {
                                    return (
                                        <tr>
                                            <th className="text-center" scope="row">{index + 1}</th>
                                            <td>{row?.employee_name}</td>
                                            <td>{row?.employee_salary}</td>
                                            <td>{row?.employee_age}</td>
                                            <td className="d-flex justify-content-center">
                                                <div className="table-image">
                                                    <img src={row?.profile_image == '' ? 'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg' : row?.profile_image} />
                                                </div>
                                            </td>

                                            <td ><Link onClick={() => LocalStorageService.set('edit', row)} to={'/employee/' + row.id} title="edit" className="btn p-0"><MdEdit /></Link> <button title="delete" className="btn p-0" onClick={() => handleDelete(row?.id)}><MdOutlineDelete /></button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default User