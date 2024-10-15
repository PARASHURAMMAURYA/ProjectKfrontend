import Card from "@mui/material/Card";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdOutlineHome, MdOutlinePolicy, MdOutlineFeed } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { RiContactsBook2Line } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavSrinc() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative animate-slide-left w-full h-64 lg:hidden md:hidden flex justify-end">
      <div className="w-96 h-32">
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
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              flexGrow: 1,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ backgroundColor: "#caf4fe" }}
              >
                Select here
              </ListSubheader>
            }
          >
            {auth ? (
              <>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/">
                    <ListItemIcon>
                      <MdOutlineHome />
                    </ListItemIcon>
                    Home
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/policy">
                    <ListItemIcon>
                      <MdOutlinePolicy />
                    </ListItemIcon>
                    Policy
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/newsfeed">
                    <ListItemIcon>
                      <MdOutlineFeed />
                    </ListItemIcon>
                    NewsFeed
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/contact">
                    <ListItemIcon>
                      <RiContactsBook2Line />
                    </ListItemIcon>
                    Contact
                  </NavLink>
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/login">
                    <ListItemIcon>
                      <CiLogin />
                    </ListItemIcon>
                    Login
                  </NavLink>
                </ListItemButton>
                <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                  <NavLink to="/signup">
                    <ListItemIcon>
                      <FaUserPlus />
                    </ListItemIcon>
                    Sign Up
                  </NavLink>
                </ListItemButton>
              </>
            )}
          </List>
          {auth && (
            <div className="mt-auto mb-5">
              <ListItemButton sx={{ display: "flex", padding: "15px" }}>
                <NavLink onClick={Logout} to="/login">
                  <ListItemIcon>
                    <CgLogOut />
                  </ListItemIcon>
                  LogOut
                </NavLink>
              </ListItemButton>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
