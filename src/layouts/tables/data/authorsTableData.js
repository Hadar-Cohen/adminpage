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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, {useState, useEffect} from "react";

import React, {useState, useEffect} from 'react';

export default function data() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsersPic()
  }, [])
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const getUsersPic = () => {
    //let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/UserPic" 
    let api = "http://localhost:58913/api/UserPic/";
    fetch(api, {
      method: "GET",
      headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
          return res.json()
      })
      .then(
          (result) => {
            console.log(result)
            getAllUser(result)

          })
  }
  const getAllUser=(pics)=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users"
    fetch(api, {
      method: "GET",
      headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
          return res.json()
      })
      .then(
          (result) => { 
            console.log(pics)
            let usersArr=[];
            result.Users.forEach((User)=>{
              let pic = pics[pics.findIndex(element => element.id == User.Id)]
              try{pic = pic.url}
              catch{pic = ""}
              console.log(pic)
                usersArr.push({
                  author: <Author image={pic} name={`${User.FirstName} ${User.LastName}`} email={User.Email} />,
                  status: (
                    <MDBox ml={-1}>
                      <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
                    </MDBox>
                  ),
                  employed: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                      23/04/18
                    </MDTypography>
                  ),
                  action: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                      Edit
                    </MDTypography>
                  ),
                },)
        })
            result.GoogleUsers.forEach((User,index)=>{
                usersArr.push({
                    firstName: User.FirstName,
                    lastName: User.LastName,
                    email: User.Email,
                    date: '2011/04/25',
            })
        })
        console.log(usersArr)
        setAllUsers(usersArr);
    }
    )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }
  const user = [
    {
      author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          23/04/18
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
  ]
  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: allUsers,
  };
}
