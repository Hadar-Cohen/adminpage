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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import React, {useState, useEffect} from 'react';


// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const [allTrips, setAllTrips] = useState([])

  useEffect(() => {
    getAllTrips()
  }, [])

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const changeDay=(tripDay)=>{
    switch(tripDay){
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }

  }

  //////////////////////////////////////////////////////////////////////
  const getAllTrips=()=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/RouteData" //change to ruppin later.. also make a new publish
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
            let tripsArr=[];
            result.forEach((Trip)=>{
             Trip=Trip.routeData;
             Trip.Day=changeDay(Trip.Day);
             console.log(Trip)
              tripsArr.push({
                lineNumber: <Project image={LogoAsana} name={Trip.LineNumber} />,
                origin: (
                  <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
                    {Trip.Origin}
                    </MDTypography>
                ),
                destination: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.Destination}
                  </MDTypography>
                ),
                day: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.Day}
                  </MDTypography>
                ), hour: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.Hour}
                  </MDTypography>
                ), arrivalTime: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.ArrivalTime}
                  </MDTypography>
                ), departureTime: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.DepartureTime}
                  </MDTypography>
                ), numOfBuses: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.NumOfBuses}
                  </MDTypography>
                ), stops: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.Stops}
                  </MDTypography>
                ), routeDuration: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.RouteDuration}
                  </MDTypography>
                ), routeDistance: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.RouteDistance}
                  </MDTypography>
                ), rain: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {Trip.Rain}
                  </MDTypography>
                ),
                
                },)
        })
       
        console.log(tripsArr)
        setAllTrips(tripsArr);
    }
    )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }
///////////////////////////////////////////////////////////////////


  return {
    columns: [
      { Header: "line_Number", accessor: "lineNumber", width: "30%", align: "left" },
      { Header: "origin", accessor: "origin", align: "left" },
      { Header: "destination", accessor: "destination", align: "left" },
      { Header: "day", accessor: "day", align: "left" },
      { Header: "hour", accessor: "hour", align: "center" },
      { Header: "arrival_Time", accessor: "arrivalTime", align: "center" },
      { Header: "departure_Time", accessor: "departureTime", align: "center" },
      { Header: "num_Of_Buses", accessor: "numOfBuses", align: "left" },
      { Header: "stops", accessor: "stops", align: "left" },
      { Header: "route_Duration", accessor: "routeDuration", align: "center" },
      { Header: "route_Distance", accessor: "routeDistance", align: "center" },
      { Header: "rain", accessor: "rain", align: "center" },
    ],

    rows:allTrips 
  };
}
