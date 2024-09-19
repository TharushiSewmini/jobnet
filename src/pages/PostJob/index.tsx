import React, { useState } from 'react'
import "./index.css";
import { FaBriefcase } from "react-icons/fa6";

 const PostJob: React.FC = () => {
 

return (

  <div className='postajobcontainer'>

    <div className="postjobform">

    <div>

<button className="job-provider-dshboard-top-row-button">
      Post a Job{" "}
</button>

</div>

    <div className="jobnetlogo">
    <FaBriefcase />
        <i className="fa-briefcase"></i> 
        <span>Jobnet</span>

    </div>

      <div className='formtitle'>Post a Job</div>

    <div className='form'>
      <label className="formlabel">Job Title </label>
        <input
          type="text"
            placeholder="Add job title, role, vacancies etc"
            className="jobinput"
        />
    </div>

    <div className="form">
      <label className="formlabel">Salary</label>
        <input
            type="text"
            className="salaryinput"
          />
    </div>

      <div className='formadvance'>Advance Information</div>

      <div className='advance'>

    <div className='form'>
        <label className='formlabel'>Vacancies</label>
          <select
              className="advanceinput"
            >
              <option>Select...</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
          </select>
    </div>

    <div className="form">
            <label className="formlabel">Expiration Date</label>
            <input
              type="date"
              className="advanceinput"
            />
    </div>

    <div className="form">
            <label className="formlabel">Time</label>
            <select
              className="advanceinput"
            >
              <option>Select...</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
    </div>
        
      </div>

    <div className='formdescription'>Description and Responsibility</div>
       
    <div className="form">
          <label className="formlabel">Description</label>
          <textarea
            placeholder="Add your job description..."
            className="formtextarea"
          />
    </div>

    <div className="form">
          <label className="formlabel">Responsibilities</label>
          <textarea
            placeholder="Add your job responsibilities..."
            className="formtextarea"
          />
    </div>
  
    <button className='jobpostbutton'type="submit"><span>Post Job</span></button>

</div>

</div>
  
)

 }


export default PostJob