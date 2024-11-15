import React, { useEffect, useState } from 'react'
import "../addJob/add.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'

const Edit = () => {

    const jobs = {
        company: "",
        vacancy: "",
        fromSalary: "",
        toSalary: "",
        status: "",
        note: ""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(jobs);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setJob({...job, [name]:value});
        console.log(job);
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/getone/${id}`)
        .then((response) => {
            setJob(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [id])

    const submitForm = async(e) => {
        console.log("Submit form!");
    e.preventDefault();
    await axios
      .put(`http://localhost:3000/api/update/${id}`, job)
      .then((response) => {
        toast.success(response.data.msg, {position:"top-right"})
        navigate("/");
      })
      .catch(error => console.log(error));
    }

  return (
    <div className="addJob">
    <Link to={"/"} className="backLink"><i class="fa-solid fa-arrow-left"></i></Link>
    <h3>Редактировать запись</h3>
    <form className='addJobForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="company">Компания</label>
            <input type="text" value={job.company} id="company" onChange={inputHandler} name="company" autoComplete='off' />
        </div>
        <div className="inputGroup">
            <label htmlFor="vacancy">Вакансия</label>
            <input type="text" value={job.vacancy} id="vacancy" onChange={inputHandler} name="vacancy" autoComplete='off'/>
        </div>
       
        <div className="inputGroup salaryGroup">
          <label>Зарплата</label>
          <div className="salaryContainer">

            <label htmlFor="fromSalary">от</label>
            <input
              type="text"
              id="fromSalary"
              onChange={inputHandler}
              name="fromSalary"
              value={job.fromSalary}
              autoComplete="off"
            />

            <label htmlFor="toSalary">до</label>
            <input
              type="text"
              id="toSalary"
              onChange={inputHandler}
              name="toSalary"
              value={job.toSalary}
              autoComplete="off"
            />
          </div>
        </div>

       <div className="inputGroup">
       <label htmlFor="status">Статус</label>
       <input
         type="text"
         value={job.status}
         id="status"
         onChange={inputHandler}
         name="status"
         autoComplete="off"
       />
     </div>

        <div className="inputGroup">
            <label htmlFor="note">Заметка</label>
            <textarea id="note" value={job.note} name="note" onChange={inputHandler} cols="30" rows="5"/>
        </div>
        <div className='inputGroup'>
            <button type="submit">Готово</button>
        </div>
    </form>
    </div>
  )
}

export default Edit