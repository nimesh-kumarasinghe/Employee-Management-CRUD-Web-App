import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const ViewDepartment = () => {

    const [data, setData] = useState([]);

    useEffect (()=>{
        getData();
    },[])  

    const getData = () =>{
        axios.get('https://localhost:7135/api/Department/GetDepartment')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className = "container all_forms">
                <h2 className='text-center fw-bold'>DEPARTMENT LIST</h2><br/>
                <div className='row'></div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.deptId}</td>
                                        <td>{item.deptName}</td>
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

export default ViewDepartment;
