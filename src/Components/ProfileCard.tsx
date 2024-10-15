import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdOutlineHome, MdOutlinePolicy } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { RiContactsBook2Line } from "react-icons/ri";
import EditProfile from "./EditProfile";
import { RiEditLine } from "react-icons/ri";

interface User {
  name: string;
  email: string;
}

const ProfileCard: React.FC = () => {
  const userData = localStorage.getItem("user");
  const navigate = useNavigate();

  if (userData) {
    const user: User = JSON.parse(userData);

    const Logout = () => {
      localStorage.clear();
      navigate("/login");
    };

    const [page, setPage] = useState(false);

    const handlePage = () => {
      setPage(!page);
    };

    // useEffect(() => {
    //   getUserData();
    // }, []);

    // const getUserData: any = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/userdata", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch data.");
    //     }

    //     const data = await response.json();
    //     console.log(data);
    //     let auth = localStorage.getItem("user");
    //     console.log(auth);
    //   } catch (error) {
    //     console.error("error");
    //   }
    // };

    return (
      <div className="animate-slide-right">
        {!page ? (
          <>
            {" "}
            <Card
              sx={{
                maxWidth: 345,
                margin: "16px",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "auto",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-row justify-center mt-6 space-x-14">
                <NavLink to="/">
                  <GoArrowLeft className="size-5" />
                </NavLink>

                <CardContent className="-mt-4">
                  <Typography gutterBottom component="div">
                    Profile
                  </Typography>
                </CardContent>
                <IoNotificationsOutline className="size-5" />
              </div>
              <hr />

              <div className="flex mx-0 mt-3">
                <div className="flex justify-left ml-5">
                  <Avatar
                    title="Profile"
                    sx={{ width: 48, height: 48 }}
                  ></Avatar>
                </div>
                <div className="flex -mt-5 -mb-4">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <a
                        className="flex  text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={handlePage}
                      >
                        Edit your profile <RiEditLine className="mt-1" />
                      </a>
                    </Typography>
                  </CardContent>
                </div>
              </div>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/">
                    <ListItemIcon>
                      <MdOutlineHome />
                    </ListItemIcon>
                    Suggestions
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/policy">
                    <ListItemIcon>
                      <MdOutlinePolicy />
                    </ListItemIcon>
                    Support
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/newsfeed">
                    <ListItemIcon>
                      <MdOutlinePrivacyTip />
                    </ListItemIcon>
                    Privacy Policy
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/contact">
                    <ListItemIcon>
                      <MdOutlineContactSupport />
                    </ListItemIcon>
                    Term and conditions
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/contact">
                    <ListItemIcon>
                      <RiContactsBook2Line />
                    </ListItemIcon>
                    Contact us
                  </NavLink>
                </ListItemButton>
              </List>

              <div className="mx-3 mt-auto mb-5">
                <NavLink onClick={Logout} to="/login">
                  <Button variant="outlined" fullWidth>
                    Log Out
                  </Button>
                </NavLink>
              </div>
            </Card>
          </>
        ) : (
          <EditProfile setPage={setPage} />
        )}
      </div>
    );
  }

  return null; // Handle case where userData is not present
};

export default ProfileCard;
