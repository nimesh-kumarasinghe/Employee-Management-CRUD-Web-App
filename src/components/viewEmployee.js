import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const ViewEmployee = () => {

    const [data, setData] = useState([]);

    useEffect (()=>{
        getData();
    },[])  

    const getData = () =>{
        axios.get('https://localhost:7135/api/Employee/GetEmployee')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className = "container all_forms">
                <h2 className='text-center fw-bold'>EMPLOYEE LIST</h2><br/>
                <div className='row'></div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Department ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.age}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.deptId}</td>
                                    </tr>
                                )
                            })
                            :
                            'Empty'
                        }
                </tbody>
            </Table>
        </div>
    )
}

export default ViewEmployee;
