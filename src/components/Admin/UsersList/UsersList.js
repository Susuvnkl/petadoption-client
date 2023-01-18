import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UserListRow from "./UserListRow/UserListRow";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/getAll`, { withCredentials: true });
      setUsersList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showit = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users List</h1>
      <div className="">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>User Number</th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((user, index) => (
                <>
                  <UserListRow key={index} user={user} index={index} />
                  {/* {showModal && <UserInfoModal user={user} setShowModal={setShowModal} />} */}
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
