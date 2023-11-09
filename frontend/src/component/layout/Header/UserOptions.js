import React, { useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
// import { Backdrop } from "@material-ui/core/Backdrop";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Dashboard from "@material-ui/icons/Dashboard";
import { useHistory } from "react-router-dom";
import {useAlert} from "react-alert"
import {logout} from  "../../../actions/userAction"
import { useDispatch } from "react-redux";
import profile_ki_img from "./profile2.jpg"


const UserOptions = ({ user }) => {



  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch()


  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
      
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function account() {
    history.push("/account");
  }


  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  function orders() {
    history.push("/orders");
  }
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : {profile_ki_img}}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
