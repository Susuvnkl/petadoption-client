import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserInfoModal from "../../UserInfoModal/UserInfoModal";

export default function UserListRow(user, index) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <tr>
        <td>{user.index + 1}</td>
        <td>{user.user.userId}</td>
        <td>{user.user.firstName}</td>
        <td>{user.user.lastName}</td>
        <td>{user.user.email}</td>
        <td>{user.user.phoneNumber}</td>
        <td>{<Button onClick={() => setShowModal(true)}>More Info</Button>}</td>
      </tr>
      {showModal && <UserInfoModal user={user} setShowModal={setShowModal} />}
    </>
  );
}
