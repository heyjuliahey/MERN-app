import React, { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const jobs = {
    company: "",
    vacancy: "",
    fromSalary: "",
    toSalary: "",
    status: "",
    note: "",
  };

  const [job, setJob] = useState(jobs);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/create", job)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addJob">
      <Link to={"/"} className="backLink"><i class="fa-solid fa-arrow-left"></i> </Link>
      <h3>Добавить новую запись</h3>
      <form className="addJobForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="company">Компания</label>
          <input
            type="text"
            id="company"
            onChange={inputHandler}
            name="company"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="vacancy">Вакансия</label>
          <input
            type="text"
            id="vacancy"
            onChange={inputHandler}
            name="vacancy"
            autoComplete="off"
          />
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
              autoComplete="off"
            />

            <label htmlFor="toSalary">до</label>
            <input
              type="text"
              id="toSalary"
              onChange={inputHandler}
              name="toSalary"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="status">Статус</label>
          <input
            type="text"
            id="status"
            onChange={inputHandler}
            name="status"
            autoComplete="off"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="note">Заметка</label>
          <textarea
            onChange={inputHandler}
            id="note"
            name="note"
            cols="30"
            rows="5"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
