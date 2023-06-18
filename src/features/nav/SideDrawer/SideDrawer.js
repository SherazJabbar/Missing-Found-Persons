import React from 'react';
// import { Link } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = props => {
   let drawerClasses= ['side-Drawer'];

   if(props.show){
       drawerClasses=['side-Drawer', 'open']
   }

    return(
        <nav className={drawerClasses.join(' ')}>
        <ul>
            <li>Sign Up</li>
        </ul>
    </nav>
    )
    
}


export default SideDrawer;