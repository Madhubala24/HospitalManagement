// import React, { useState } from "react";
// import { patientData } from "./LoginData";

// export default function PatientLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);


//   const handleLogin = () => {
//     const isPatient = patientData.find(
//       (patient) => patient.username === username && patient.password === password
//     );

//     if (isPatient) {
//      setIsLoggedIn(true);
//     } else {
//       setError("Invalid");
//     }

//   };

//   return(
//     <div>
//         {isLoggedIn ? (
//             <div> 
//                 <h2> Welcome , {username} </h2>
//                 </div>
//         ):(
//             <div>
//                 <input
//                 type="text"
//                 placeholder="Usernanme"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 />
                
//                     <input 
//                     type="text"
//                     placeholder="Username"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     />
//                 <button onClick={handleLogin}>Login</button>
//                 </div>
        
//         )}
//     </div>
//   );
// }
