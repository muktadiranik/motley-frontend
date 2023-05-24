import React from "react";
import UserDetails from "./UserDetails";

const ProfileScreen = () => {
  return (
    <div className=' d-flex justify-content-center my-4'>
      <div className=' container col-5'>
        <h1>Profile</h1>
        <UserDetails />
      </div>
    </div>
  );
};

export default ProfileScreen;
