import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {


    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[dob, setDob] = useState('')
    const[age, setAge] = useState(null)
    const[salary, setSalary] = useState('')
    const[deptId, setDeptId] = useState('')

    const [data, setData] = useState([]);

    useEffect (()=>{
        getData();
    },[])  

    const calculateAge = (empDob) => {
        const dob = new Date(empDob);
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

    const handleDateChange = (event) => {
        setDob(event.target.value);
        setAge(calculateAge(event.target.value));
    }

    const getData = () =>{
        axios.get('https://localhost:7135/api/Department/GetDepartment')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleSave =()=>{
        const url = 'https://localhost:7135/api/Employee/AddEmployee';
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "dob": dob,
            "age": age,
            "salary": salary,
            "deptId": deptId
        }

        axios.post(url, data)
        .then((result) =>{
            clear();
            toast.success("Employee has been added!");
        }).catch((error)=>{
            toast.error("Employee has been not added!");
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
    }

    return(
        <form onSubmit={()=> handleSave()}>
            <ToastContainer/>
                <div class="col-md-6 offset-md-3 all_forms">
                    <h2 className ="text-center fw-bold">ADD EMPLOYEE</h2>
                <br />
                    <div>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)}
                        required pattern="^[^0-9]*$" title="First name cannot have digits"/>
                    </div><br/>
                    <div>
                        <input type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                        required pattern="^[^0-9]*$" title="Last name cannot have digits"/>
                    </div><br/>
                    <div>
                        <input type="email"
                        className="form-control"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required/>
                    </div><br/>
                    <div>
                        <input type="Date"
                        className="form-control"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={handleDateChange}
                        required/>
                    </div><br/>
                    <div>
                        <input type="number"
                        className="form-control"
                        placeholder="Age"
                        value={age}
                        onChange={(e)=> setAge(e.target.value)}
                        required/>
                    </div><br/>
                    <div>
                        <input type="number"
                        className="form-control"
                        placeholder="Enter Salary"
                        value={salary}
                        onChange={(e)=> setSalary(e.target.value)}
                        required/>
                    </div><br/>
                    <div>
                        <select
                        class="form-control"
                        name="deptId"
                        id="deptId"
                        value={deptId}
                        onChange={(e)=> setDeptId(e.target.value)}
                        required>
                        <option value="">Select a Department</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.deptId}>{item.deptName}</option>
                            ))}
                        </select>
                    </div><br/>
                    <div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
        </form>

    )
}

export default AddEmployee;
