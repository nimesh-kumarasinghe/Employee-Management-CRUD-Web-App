import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = () => {


    const[deptName, setDeptName] = useState('')

    const handleSave =()=>{
        const url = 'https://localhost:7135/api/Department/AddDepartment';
        const data = {
            "deptName": deptName
        }

        axios.post(url, data)
        .then((result) =>{
            clear();
            toast.success("Department has been added!");
        }).catch((error)=>{
            toast.error("Department has been not added!");
        })
    }

    const clear = ()=>{
        setDeptName('');
    }

    return(
        <form onSubmit={()=> handleSave()}>
            <ToastContainer/>
                <div class="col-md-6 offset-md-3 all_forms">
                    <h2 className ="text-center fw-bold">ADD DEPARTMENT</h2>
                <br/>
                    <div>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter Department Name"
                        value={deptName}
                        onChange={(e)=> setDeptName(e.target.value)}
                        required/>
                    </div><br/>
                    <div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
        </form>

    )
}

export default AddDepartment;
