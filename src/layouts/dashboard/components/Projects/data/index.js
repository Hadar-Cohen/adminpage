/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove, push} from "firebase/database";
import React, {useState, useEffect } from 'react';
import { CButton } from '@coreui/react'
// import '@coreui/coreui/dist/css/coreui.min.css';
import MDButton from "components/MDButton";

const firebaseConfig = {
  apiKey: "AIzaSyDvDTL7yUQocA1JXW90LtKibG_uRm9z-E4",
  authDomain: "final-project-din-and-hadar.firebaseapp.com",
  databaseURL: "https://final-project-din-and-hadar-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-project-din-and-hadar",
  storageBucket: "final-project-din-and-hadar.appspot.com",
  messagingSenderId: "490950571924",
  appId: "1:490950571924:web:16a1d3b0896e4b41cfc181",
  measurementId: "G-4YV91X5FDZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const Company = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
      {name}
    </MDTypography>
  </MDBox>
);


export default function data() {
  const [allChats, setAllChats] = useState([])
  const [allBlocked, setAllBlocked] = useState([])

  useEffect(() => {
    getProfane()
    getBlocked()
  }, [])

  const blockUser=(msg)=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users"
    fetch(api + '?id='+ msg.id, {
      method: 'DELETE',
      //body: JSON.stringify({id:7}),
      headers: new Headers({
      'accept': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
      })
      .then(res => {
      console.log('res=', res);
      return res.json()
      })
      .then(
      (result) => {
      console.log("fetch POST= ", result);
      let db = ref(database, `Profane/${msg.id}`)
      remove(db).then(() => {
        msg = { dtBlocked: new Date().getTime(), id: msg.id, message: msg.message,  name:msg.name}
        db = ref(database, `Blocked/${msg.id}/`);
        set(db, msg);
        getProfane()
      })
      },
      (error) => {
      console.log("err post=", error);
      });
      
  }
  const unblockUser=(msg)=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users"
    fetch(api + '?id='+ msg.id, {
      method: 'DELETE',
      headers: new Headers({
      'accept': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
      })
      .then(res => {
      console.log('res=', res);
      return res.json()
      })
      .then(
      (result) => {
      console.log("fetch POST= ", result);
      let db = ref(database, `Blocked/${msg.id}`)
      remove(db).then(() => {
        getBlocked()
      })
      },
      (error) => {
      console.log("err post=", error);
      });
      
  }

  const getProfane=()=>{
    let arr=[];
    const db = ref(database, `Profane/`);
      onValue(db, (snapshot) => {
        const data = snapshot.val();
        for (var d in data){
         for(var msg in data[d])
         {
          msg=data[d][msg];
          console.log("msg ",msg.name);
          
          arr.push({
            UserName: <Company name={msg.name} />,
            UserId: (
              <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
                {msg.id}
                </MDTypography>
            ),
            Text: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {msg.message}
              </MDTypography>
            ),
            Block: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                <MDButton variant="gradient" color="error" onClick={() => {blockUser(msg)}} fullWidth>
                Block
                    </MDButton>
              </MDTypography>
            ),
         })
        }
      }
      console.log("arr ",arr);
      setAllChats(arr);
      })

  }
  const getBlocked=()=>{
    let arr=[];
    const db = ref(database, `Blocked/`);
      onValue(db, (snapshot) => {
        const data = snapshot.val();
        for (var d in data){
          console.log(data[d])
          let msg= data[d];
          console.log("msg ",msg);
          let dt = new Date(msg.dtBlocked)
          arr.push({
            UserName: <Company name={msg.name} />,
            UserId: (
              <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
                {msg.id}
                </MDTypography>
            ),
            Text: (
              <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
                {msg.message}
                </MDTypography>
            ),
            Date: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {dt.getDate()}/{dt.getMonth()+1}/{dt.getFullYear()}
              </MDTypography>
            ),
            Block: (
              <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                <MDButton variant="gradient" color="success" onClick={() => {unblockUser(msg)}} fullWidth>
                Unblock
                    </MDButton>
              </MDTypography>
            ),
         })
      }
      console.log("arr ",arr);
      setAllBlocked(arr);
      })

  }

  
  return [{
    columns: [
      { Header: "User Name", accessor: "UserName", align: "left" },
      { Header: "User Id", accessor: "UserId",  align: "left" },
      { Header: "Text", accessor: "Text", align: "center" },
      { Header: "Block", accessor: "Block", align: "center" },
    ],
    rows:allChats  
  },
  {
    columns: [
    { Header: "User Name", accessor: "UserName", align: "left" },
    { Header: "User Id", accessor: "UserId",  align: "left" },
    { Header: "Text", accessor: "Text",  align: "left" },
    { Header: "Blocked Since", accessor: "Date", align: "center" },
    { Header: "Unblock", accessor: "Block", align: "center" },
  ],
    rows:allBlocked
  }]
}
