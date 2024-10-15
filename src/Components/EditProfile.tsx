// import { useState } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { Avatar } from "@mui/material";
// import { GoArrowLeft } from "react-icons/go";
// import { IoNotificationsOutline } from "react-icons/io5";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { styled } from "@mui/material/styles";
// import Badge from "@mui/material/Badge";
// import IconButton from "@mui/material/IconButton";
// import { FiCamera } from "react-icons/fi";

// interface User {
//   name: string;
//   email: string;
// }

// const SmallAvatar = styled(Avatar)(() => ({
//   width: 32,
//   height: 32,
//   color: "black",
// }));

// interface ProfileFormProps {
//   setPage: (page: boolean) => void;
// }
// function EditProfile({ setPage }: ProfileFormProps) {
//   const userData = localStorage.getItem("user");
//   const [file, setFile] = useState<File | null>(null);
//   const [name, setName] = useState<string>("");
//   const [profilepic, setProfilepic] = useState<string | null>(null);

//   if (userData) {
//     const user: User = JSON.parse(userData);

//     // useEffect(() => {
//     //   getUserData();
//     // }, []);

//     // const getUserData: any = async () => {
//     //   try {
//     //     const response = await fetch("http://localhost:5000/userdata", {
//     //       method: "GET",
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     });

//     //     if (!response.ok) {
//     //       throw new Error("Failed to fetch data.");
//     //     }

//     //     const data = await response.json();
//     //     console.log(data);
//     //     let auth = localStorage.getItem("user");
//     //     console.log(auth);
//     //   } catch (error) {
//     //     console.error("error");
//     //   }
//     // };


//     const [name, setName] = useState<string>('');
//     const [profilePic, setProfilePic] = useState<File | null>(null);
  
//     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setName(e.target.value);
//     };
  
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files) {
//         setProfilePic(e.target.files[0]);
//       }
//     };
  
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
  
//       if (!name || !profilePic) {
//         alert('Please fill in all fields.');
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('profilePic', profilePic);
  
//       await onSubmit(formData);
//     };
  
  



//     const handlePage = () => {
//       setPage(false);
//     };

    

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const selectedFile = event.target.files?.[0];
//       if (selectedFile) {
//         const reader = new FileReader();
//         reader.onloadend = () => setProfilepic(reader.result as string);
//         setFile(selectedFile);
//         reader.readAsDataURL(selectedFile);
//         console.log("profilepic", profilepic);
        
//       }
//     };

//     const updateProfile = async (formData: FormData) => {
//       try {
//         const response = await fetch("http://localhost:5000/updateProfile", {
//           method: "POST",
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to update profile");
//         }

//         const result = await response.json();
//         toast.success("Updated Successfully");
//         console.log("Profile updated:", result);
//       } catch (error) {
//         console.error("Error:", error);
//         toast.error("Failed to update profile");
//       }
//     };


//     const handleProfileUpdate = async (formData: FormData) => {
//       await updateProfile(formData);

//     }
//     return (
//       <div>
//         <Card
//           sx={{
//             maxWidth: 345,
//             margin: "16px",
//             height: "80vh",
//             display: "flex",
//             flexDirection: "column",
//             //   justifyContent: "space-between",
//             overflow: "auto",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className="flex flex-row  justify-center mt-6 space-x-12">
//             <a onClick={handlePage} className="cursor-pointer">
//               <GoArrowLeft className="size-5" />
//             </a>
//             <CardContent className="-mt-4">
//               <Typography gutterBottom component="div">
//                 Edit Profile
//               </Typography>
//             </CardContent>
//             <IoNotificationsOutline className="size-5" />
//           </div>
//           <hr />
//        <form onSubmit={handleProfileUpdate}>
//           <div className="flex mx-0 mt-7 justify-center">
//             <div className="flex">
//               {file === null ? (
//                 <>
//                   <Stack direction="row" spacing={2}>
//                     <Badge
//                       overlap="circular"
//                       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                       badgeContent={
//                         <SmallAvatar alt="Remy Sharp">
//                           <IconButton aria-label="upload" component="label">
//                             <FiCamera />
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={handleImageChange}
//                               hidden
//                             />
//                           </IconButton>
//                         </SmallAvatar>
//                       }
//                     >
//                       <Avatar
//                         src={profilepic || undefined}
//                         title="Profile"
//                         sx={{ width: 88, height: 88 }}
//                       ></Avatar>
//                     </Badge>
//                   </Stack>
//                 </>
//               ) : (
//                 <>
//                   <Avatar
//                     src={profilepic || undefined}
//                     title="Profile"
//                     sx={{ width: 88, height: 88 }}
//                   ></Avatar>
//                 </>
//               )}
//             </div>
//             <div className="flex -mt-5 -mb-4"></div>
//           </div>

//           <div className="mx-5 mt-20">
//             <Stack
//               component="form"
//               sx={{ width: "full" }}
//               spacing={2}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 hiddenLabel
//                 id="filled-hidden-label-small"
//                 defaultValue={user.name}
//                 variant="filled"
//                 size="small"
//                 onChange={handleNameChange}
//               />
//               <TextField
//                 hiddenLabel
//                 id="filled-hidden-label-normal"
//                 defaultValue={user.email}
//                 variant="filled"
//                 size="small"
//                 disabled
//               />
//             </Stack>
//           </div>

//           <div className="mx-3 mt-auto mb-5">
//             <div>
//               <Button variant="outlined" fullWidth  type="submit">
//                 Update
//               </Button>
//               <ToastContainer />
//             </div>
//           </div>

//           </form>
//         </Card>
//       </div>
//     );
//   }
// }
// export default EditProfile;


import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Badge, Button, Stack, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import { FiCamera } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
 import IconButton from "@mui/material/IconButton";
interface User {
  name: string;
  email?: string; // Optional
  profilePic?: string | null; // Allow null
}

interface EditProfileProps {
  setPage: (page: boolean) => void;
}

const SmallAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
  color: "black",
}));

const EditProfile: React.FC<EditProfileProps> = ({ setPage }) => {
  const userData = localStorage.getItem("user");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string | null>("");  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setProfilePic(parsedUser.profilePic || "");  
    }
  }, [userData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      setFile(selectedFile);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !file) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePic", file);

    try {
      const response = await fetch("http://localhost:5000/updateProfile", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser: User = { 
        ...user, 
        name, 
        profilePic: profilePic || null  
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Updated Successfully");
      setUser(updatedUser);  
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) return null;  

  return (
    <div>
      <Card   sx={{
            maxWidth: 345,
            margin: "16px",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            //   justifyContent: "space-between",
            overflow: "auto",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
        <div className="flex flex-row justify-center mt-6 space-x-12">
          <a onClick={() => setPage(false)} className="cursor-pointer">
            <GoArrowLeft />
          </a>
          <CardContent className="-mt-4">
            <Typography gutterBottom component="div">
              Edit Profile
            </Typography>
          </CardContent>
          <IoNotificationsOutline />
        </div>
        <hr />
        <form onSubmit={handleProfileUpdate}>
          <div className="flex mx-0 mt-7 justify-center">
          {file === null ? (
                <>
                  <Stack direction="row" spacing={2}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar alt="Remy Sharp">
                          <IconButton aria-label="upload" component="label">
                            <FiCamera />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              hidden
                            />
                          </IconButton>
                        </SmallAvatar>
                      }
                    >
                      <Avatar
                        src={profilePic || undefined}
                        title="Profile"
                        sx={{ width: 88, height: 88 }}
                      ></Avatar>
                    </Badge>
                  </Stack>
                </>
              ) : (
                <>
                  <Avatar
                    src={profilePic || undefined}
                    title="Profile"
                    sx={{ width: 88, height: 88 }}
                  ></Avatar>
                </>
              )}
          </div>

          <div className="mx-5 mt-20">
            <Stack spacing={2}>
              <TextField
                value={name}
                variant="filled"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                value={user.email || ""} // Ensure this is a string
                variant="filled"
                disabled
              />
            </Stack>
          </div>

          <div className="mx-3 mt-80 mb-5">
            <Button variant="outlined" fullWidth type="submit">
              Update
            </Button>
            <ToastContainer />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
