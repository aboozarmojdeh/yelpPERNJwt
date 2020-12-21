// import React, { Fragment, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import modelPic from "../img/modelPic.png";
// import Home from './Home';
// const Dashboard = ({ setAuth }) => {
//   const [name, setName] = useState("");
//   const [modelName, setModelName] = useState("");
//   const [superModels, setSuperModels] = useState([]);

//   const getName = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/dashboard/", {
//         method: "GET",
//         headers: { token: localStorage.token },
//       });
//       const parsRes = await response.json();
//       console.log(parsRes);
//       setName(parsRes.user_name);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getName();
//   }, []);

//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("token");
//     setAuth(false);
//     toast.success("Logged out successfully!");
//   };

//   const onSearchChange = (e) => {
//     setModelName(e.target.value);
//     console.log(e.target.value);
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:5000/models/?modelName=${modelName}`
//       );
//       const resResponse = await response.json();
//       console.log("models:", resResponse);
//       setSuperModels(resResponse);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const superModelMap = superModels.map((superModel) => {
//     return (
//       <tr key={superModel.user_id}>
//         <td>{superModel.first_name}</td>
//         <td>{superModel.last_name}</td>
//       </tr>
//     );
//   });

//   return (
//     <Fragment>
//       <nav class="navbar navbar-expand-lg navbar-light bg-light">
//         <div class="container-fluid">
//           <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo03"
//             aria-controls="navbarTogglerDemo03"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <a class="navbar-brand" href="">
//             YELP Restaurant Search
//           </a>
//           <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
//             <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//             <form class="d-flex">
//               <p class="me-2">Welcome {name}!</p>
//               {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
//               {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
//               <button className="btn btn-danger" onClick={(e) => logout(e)}>
//                 Logout
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>

//       <div class="imgcontainer text-center my-3">
//         <img src={modelPic} alt="Sign-in" width="250" height="150" />
//       </div>
//       <div className='container'>
//         <Home />
//       </div>
// {/* // Search are temporary closed */}
// <hr />
// <h4>search area temporary closed</h4>
//       {/* <div className="container text-center">
//         <form className="d-flex my-5" onSubmit={onSubmitForm}>
//           <input
//             required="required"
//             className="form-control"
//             type="text"
//             name="name"
//             placeholder="Enter model..."
//             value={modelName}
//             onChange={onSearchChange}
//           />
//           <button className="btn btn-success">Search</button>
//         </form>

//         <table className="table table-dark table-hover my-5">
//           <thead>
//             <tr>
//               <th scope="col">First</th>
//               <th scope="col">Last</th>
//             </tr>
//           </thead>
//           <tbody>{superModelMap}</tbody>
//         </table>
//         {superModels.length === 0 && <p>No results found</p>}
//       </div> */}
//       <hr />
      
//     </Fragment>
//   );
// };

// export default Dashboard;
