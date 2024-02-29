// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
// import { Navigate, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const [buttonValue, setButtonValue] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:5000/dashboard')
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error('Error fetching users:', error));
//   }, []);

//   const handleApprove = (useremail, newStatus) => {
//     fetch('http://localhost:5000/dashboard/statusChange', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status: newStatus, useremail }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle success if needed
//         console.log('Status changed successfully:', data);
//         // Refresh the user data after status change
//         fetchUserData();
//         // Update buttonValue state
//         setButtonValue(newStatus);
//       })
//       .catch((error) => console.error('Error changing user status:', error));
//   };

//   const fetchUserData = () => {
//     fetch('http://localhost:5000/dashboard')
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error('Error fetching users:', error));
//   };

//   const handleGoBack = () => {
//     navigate('/user');
//   };
//   const isAdmin = users.some((user) => user.role === 'admin');
  

//   return (
//     <div>
//       <h1>Admin Table</h1>
//       <br></br>
//       <br></br>

//       <h2>Users Table</h2>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User ID</TableCell>
//               <TableCell>User Name</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>User Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.useremail}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={buttonValue ? 'success' : 'primary'}
//                     onClick={() => handleApprove(user.useremail, !user.approved)}
//                   >
//                     {buttonValue ? 'Approved' : 'Approve'}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <button type="button" onClick={handleGoBack}>
//         Back
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleApprove = (useremail, newStatus) => {
    fetch('http://localhost:5000/dashboard/statusChange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus, useremail }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success if needed
        console.log('Status changed successfully:', data);
        // Refresh the user data after status change
        fetchUserData();
      })
      .catch((error) => console.error('Error changing user status:', error));
  };

  const fetchUserData = () => {
    fetch('http://localhost:5000/dashboard')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleGoBack = () => {
    navigate('/user');
  };

  return (
    <div>
      <h1>Admin Table</h1>
      <br></br>
      <br></br>

      <h2>Users Table</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>User Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.useremail}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.approved ? 'success' : 'primary'}
                    onClick={() => handleApprove(user.useremail, !user.approved)}
                  >
                    {user.approved ? 'Approved' : 'Approve'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button type="button" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};

export default Dashboard;
