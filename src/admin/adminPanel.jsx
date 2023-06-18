import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import Dashboard from "./adminMissingPersonsList/adminMissingPerson";
import UsersDashboard from './RegisterdUsers/UsersDashboard';
import AdminFoundPerson from './adminFoundPersonList/adminFoundPerson';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import IdentifiedAdmin from './Identified/IdentifiedAdmin';

function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange} orientation="vertical">
        <Tab icon={<DashboardIcon/>} label="Missing Persons" />
        <Tab icon={<DashboardSharpIcon />} label="Found Persons" />
        <Tab icon={<PeopleIcon/>} label="Users" />
        <Tab icon= {<PeopleAltIcon/>} label="Identified"/>
      </Tabs>
      {selectedTab === 0 && <Dashboard />}
      {selectedTab === 1 && <AdminFoundPerson/>}
      {selectedTab === 2 && <UsersDashboard/>}
      {selectedTab === 3 && <IdentifiedAdmin/>}
    </>
  );
}

export default AdminPanel;
