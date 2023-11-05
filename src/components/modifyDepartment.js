import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifyDepartment = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[deptId, setDeptId] = useState('')
    const[deptName, setDeptName] = useState('')

    const[editDeptId, setEditDeptId] = useState('')
    const[editDeptName, setEditDeptName] = useState('')

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

    const handleEdit = (deptId) =>{
        handleShow();
        axios.get(`https://localhost:7135/api/Department/GetDepartment/${deptId}`)
        .then((result)=>{
            setEditDeptId(result.data.deptId);
            setEditDeptName(result.data.deptName);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (deptId) =>{
        if(window.confirm("Are you sure you want to delete this Department?") === true){
            axios.delete(`https://localhost:7135/api/Department/DeleteDepartment/${deptId}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success("Department has been deleted!");
                    getData();
                }
            })
            .catch((error)=>{
                toast.error("Department has been not deleted!");
            })
        }
        
    }

    const handleUpdate = ()=>{
        const url = `https://localhost:7135/api/Department/UpdateDepartment/${editDeptId}`
        const data = {
            "deptId": editDeptId,
            "deptName": editDeptName
        } 
        axios.put(url, data)
        .then((result) =>{
            handleClose();
            getData();
            clear();
            toast.success("Department has been updated!");
        }).catch((error)=>{
            toast.error("Department has been not updated!");
        })

    }
    const clear = ()=>{
        setDeptId('');
        setDeptName('');

        setEditDeptId('');
        setEditDeptName('');
    }

    return(
        <div className = "container all_forms">
        <h2 className='text-center fw-bold'>MODIFY DEPARTMENT</h2><br/>
        <div className='row'></div>
            <ToastContainer/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Action</th>
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
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.deptId)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.deptId)}>Delete</button>
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
                    <Modal.Title>Upate Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <input type="text"
                            className="form-control"
                            value={editDeptId}
                            onChange={(e)=> setEditDeptId(e.target.value)}
                            readOnly/>
                        </div><br/>
                        <div>
                            <input type="text"
                            className="form-control"
                            placeholder="Enter Department Name"
                            value={editDeptName}
                            onChange={(e)=> setEditDeptName(e.target.value)}/>
                        </div><br/>
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

export default ModifyDepartment;
