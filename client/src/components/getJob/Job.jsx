import React, { useEffect, useState } from "react";
import "./Job.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {

    const fetchData = async() => {
        const response = await axios.get("http://localhost:3000/api/getall");
        setJobs(response.data);
    }
    fetchData();
  }, []);

  const deleteJob = async(jobId) => {
    await axios.delete(`http://localhost:3000/api/delete/${jobId}`)
    .then((response)=> {
        setJobs((prevJob) => prevJob.filter((job)=> job._id !== jobId))
        toast.success(response.data.msg, {position:'top-right'})
    }).catch((error) => {
        console.log(error);
    })
} 

  return (
    <div className="jobsTable">
      <Link to={"/add"} className="addButton">
      <i class="fa-solid fa-plus" style={{padding:"5px"}}></i>
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Компания</th>
            <th>Вакансия</th>
            <th>Зарплатная вилка</th>
            <th>Статус отклика</th>
            <th>Заметка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            jobs.map((job, value) => {
                return (
                    <tr key={job._id}>
                    <td>{job.company}</td>
                    <td>{job.vacancy}</td>
                    <td>{job.fromSalary}-{job.toSalary}</td>
                    <td>{job.status}</td>
                    <td>{job.note}</td>
                    <td className="actionButtons">
                      <button onClick={() => deleteJob(job._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <Link to={`/edit/` + job._id}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                )
            })
        }
        
        </tbody>
      </table>
    </div>
  );
};

export default Job;
