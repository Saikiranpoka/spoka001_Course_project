import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [buttonValue, setButtonValue]=useState(false)
  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleApprove = (id) => {
    setButtonValue(true);
  };

  return (
    <div>
      <h1>
        Admin Table
      </h1>
      <br>
      </br>
      <br>
      </br>
      
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
                    color={buttonValue && user.id==1 ? 'success' : 'primary'}
                    onClick={() => handleApprove(user.id)}
                  >
                    {buttonValue && user.id==1 ? 'Approved' : 'Approve'}
                  </Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPage;
