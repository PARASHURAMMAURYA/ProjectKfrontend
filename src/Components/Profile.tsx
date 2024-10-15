
 
import {Avatar} from '@mui/material';
 import { useState } from 'react';
function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div onClick={toggleMenu}>
         
        <Avatar title='Profile'/>
       
    </div>
  )
}

export default Profile
