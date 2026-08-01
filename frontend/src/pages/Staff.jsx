import { useEffect, useState } from "react";

import * as staffService from "../services/staffService";

function Staff() {

  const [staff, setStaff] = useState([]);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({

    full_name: "",

    phone: "",

    email: "",

    username: "",

    password: "",

    role: "CASHIER"

  });

  useEffect(() => {

    loadStaff();

  }, []);

  async function loadStaff() {

    const result = await staffService.getStaff();

    if(result.success){

      setStaff(result.staff);

    }

  }

  function handleChange(e){

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  }
  async function handleAddStaff(e){

  e.preventDefault();

  const result = await staffService.addStaff(formData);

  setMessage(result.message);

  if(result.success){

    setFormData({

      full_name: "",

      phone: "",

      email: "",

      username: "",

      password: "",

      role: "CASHIER"

    });

    loadStaff();

  }

}
async function handleDelete(id){

  if(!window.confirm("Delete this staff member?")){

    return;

  }

  const result = await staffService.deleteStaff(id);

  setMessage(result.message);

  if(result.success){

    loadStaff();

  }

}
const filteredStaff = staff.filter((member)=>{

  return (

    member.full_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    member.username
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    member.role
      .toLowerCase()
      .includes(search.toLowerCase())

  );

});
return(

<div className="container-fluid">

<h2 className="mb-4">

Staff Management

</h2>

{message && (

<div className="alert alert-info">

{message}

</div>

)}

<div className="card shadow mb-4">

<div className="card-header">

<h5>

Add Staff

</h5>

</div>

<div className="card-body">

<form onSubmit={handleAddStaff}>

<div className="row">

<div className="col-md-4 mb-3">

<label>

Full Name

</label>

<input

type="text"

name="full_name"

className="form-control"

value={formData.full_name}

onChange={handleChange}

required

/>

</div>

<div className="col-md-4 mb-3">

<label>

Phone

</label>

<input

type="text"

name="phone"

className="form-control"

value={formData.phone}

onChange={handleChange}

/>

</div>

<div className="col-md-4 mb-3">

<label>

Email

</label>

<input

type="email"

name="email"

className="form-control"

value={formData.email}

onChange={handleChange}

required

/>

</div>
<div className="col-md-3 mb-3">

<label>

Username

</label>

<input

type="text"

name="username"

className="form-control"

value={formData.username}

onChange={handleChange}

required

/>

</div>

<div className="col-md-3 mb-3">

<label>

Password

</label>

<input

type="password"

name="password"

className="form-control"

value={formData.password}

onChange={handleChange}

required

/>

</div>

<div className="col-md-3 mb-3">

<label>

Role

</label>

<select

name="role"

className="form-select"

value={formData.role}

onChange={handleChange}

>

<option value="OWNER">

Owner

</option>

<option value="MANAGER">

Manager

</option>

<option value="CASHIER">

Cashier

</option>

<option value="WAITER">

Waiter

</option>

</select>

</div>

<div className="col-md-3 mb-3 d-flex align-items-end">

<button

type="submit"

className="btn btn-success w-100"

>

Add Staff

</button>

</div>

</div>

</form>

</div>

</div>
<div className="card shadow mb-4">

<div className="card-body">

<input

type="text"

className="form-control"

placeholder="Search staff by name, username or role..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

</div>
<div className="card shadow">

  <div className="card-header">

    <h5>

      Staff List

    </h5>

  </div>

  <div className="card-body">

    <table className="table table-bordered table-hover">

      <thead className="table-dark">

        <tr>

          <th>ID</th>

          <th>Name</th>

          <th>Username</th>

          <th>Email</th>

          <th>Phone</th>

          <th>Role</th>

          <th>Status</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {filteredStaff.map((member) => (

          <tr key={member.staff_id}>

            <td>{member.staff_id}</td>

            <td>{member.full_name}</td>

            <td>{member.username}</td>

            <td>{member.email}</td>

            <td>{member.phone || "-"}</td>

            <td>

              <span className="badge bg-primary">

                {member.role}

              </span>

            </td>

            <td>

              <span
                className={`badge ${
                  member.status === "ACTIVE"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >

                {member.status}

              </span>

            </td>

            <td>

              <button
                className="btn btn-warning btn-sm me-2"
              >

                Edit

              </button>

              <button
  className="btn btn-danger btn-sm"
  onClick={() => handleDelete(member.staff_id)}
>
  Delete
</button>

            </td>

          </tr>

        ))}

        {filteredStaff.length === 0 && (

          <tr>

            <td
              colSpan="8"
              className="text-center"
            >

              No Staff Found

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>

</div>

);

}

export default Staff;