import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifyEmployee = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[dob, setDob] = useState('')
    const[age, setAge] = useState('')
    const[salary, setSalary] = useState('')
    const[deptId, setDeptId] = useState('')


    const[editId, setEditId] = useState('')
    const[editFirstName, setEditFirstName] = useState('')
    const[editLastName, setEditLastName] = useState('')
    const[editEmail, setEditEmail] = useState('')
    const[editDob, setEditDob] = useState('')
    const[editAge, setEditAge] = useState('')
    const[editSalary, setEditSalary] = useState('')
    const[editDeptId, setEditDeptId] = useState('')

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

    const [dataDep, setDataDept] = useState([]);

    useEffect (()=>{
        getDeptData();
    },[])  

    const getDeptData = () =>{
        axios.get('https://localhost:7135/api/Department/GetDepartment')
        .then((result)=>{
            setDataDept(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7135/api/Employee/GetEmployee/${id}`)
        .then((result)=>{
            setEditFirstName(result.data.firstName);
            setEditLastName(result.data.lastName);
            setEditEmail(result.data.email);
            setEditDob(result.data.dob);
            setEditAge(result.data.age);
            setEditSalary(result.data.salary);
            setDeptId(result.data.deptId);
            setEditId(result.data.id);

        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (id) =>{
        if(window.confirm("Are you sure you want to delete this Employee?") === true){
            axios.delete(`https://localhost:7135/api/Employee/DeleteEmployee/${id}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success("Employee has been deleted!");
                    getData();
                }
            })
            .catch((error)=>{
                toast.error("Employee has been not deleted!");
            })
        }
        
    }

    const handleUpdate = ()=>{
        const url = `https://localhost:7135/api/Employee/UpdateEmployee/${editId}`
        const data = {
            "id": editId,
            "firstName": editFirstName,
            "lastName": editLastName,
            "email": editEmail,
            "dob": editDob,
            "age": editAge,
            "salary": editSalary,
            "deptId": editDeptId
        } 
        axios.put(url, data)
        .then((result) =>{
            handleClose();
            getData();
            clear();
            toast.success("Employee has been updated!");
        }).catch((error)=>{
            toast.error("Employee has been not updated!");
        })

    }
    const clear = ()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setDob('');
        setAge('');
        setSalary('');
        setDeptId('');

        setEditFirstName('');
        setEditLastName('');
        setEditEmail('');
        setEditDob('');
        setEditAge('');
        setEditSalary('');
        setEditDeptId('');
        setEditId('');
    }

    return(
        <div className = "container all_forms">
        <h2 className='text-center fw-bold'>MODIFY EMPLOYEE</h2><br/>
        <div className='row'></div>
            <ToastContainer/>
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
                    <th>Action</th>
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
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Empty'
                        }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upate Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <input type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={editFirstName}
                            onChange={(e)=> setEditFirstName(e.target.value)}/>
                        </div><br/>
                        <div>
                            <input type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={editLastName}
                            onChange={(e)=> setEditLastName(e.target.value)}/>
                        </div><br/>
                        <div>
                            <input type="text"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={editEmail}
                            onChange={(e)=> setEditEmail(e.target.value)}/>
                        </div><br/>
                        <div>
                            <input type="text"
                            className="form-control"
                            placeholder="Date of Birth"
                            value={editDob}
                            onChange={(e)=> setEditDob(e.target.value)}/>
                        </div><br/>
                        <div>
                            <input type="number"
                            className="form-control"
                            placeholder="Age"
                            value={editAge}
                            onChange={(e)=> setEditAge(e.target.value)}/>
                        </div><br/>
                        <div>
                            <input type="number"
                            className="form-control"
                            placeholder="Enter Salary"
                            value={editSalary}
                            onChange={(e)=> setEditSalary(e.target.value)}/>
                        </div><br/>
                        <div>
                            <select
                            class="form-control"
                            name="deptId"
                            id="deptId"
                            value={editDeptId}
                            onChange={(e)=> setEditDeptId(e.target.value)}>
                                {dataDep.map((item, index) => (
                                    <option key={index} value={item.deptId}>{item.deptName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModifyEmployee;
