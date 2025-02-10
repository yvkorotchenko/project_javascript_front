import * as React from 'react';
import { forwardRef } from 'react';
import { DashboardMenuItem, Menu, MenuItemLink} from 'react-admin';
import { useLogout } from 'react-admin';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import DvrIcon from '@mui/icons-material/Dvr';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { MenuItem } from '@mui/material';




export const Menus = forwardRef((props,ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return(
    <Menu {...props}>
        <DashboardMenuItem />
        <MenuItemLink to="/users" primaryText="Users" leftIcon={<PersonIcon color="secondary"/>} />
        <MenuItemLink to="/groups" primaryText="Groups" leftIcon={<GroupIcon color="primary"/>}/>
        <MenuItemLink to="/computers" primaryText="Computers" leftIcon={<ComputerIcon color="success" />}/>
        <MenuItemLink to="/inventory" primaryText="Inventory" leftIcon={<DvrIcon sx={{ color: '#f50057' }} />}/>
        <MenuItemLink to="/incidents" primaryText="Incidents" leftIcon={<EventNoteIcon sx={{ color: '#blue' }} />}/>
        <MenuItemLink to="/instructions" primaryText="Instructions" leftIcon={<AssignmentIcon sx={{ color: '#926bff' }} />}/>
        <MenuItem
            onClick={handleClick}
            ref={ref}
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <LogoutIcon /> Logout
        </MenuItem>
    </Menu>
    );
});