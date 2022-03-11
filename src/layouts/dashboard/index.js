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
import React, {useState, useEffect} from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

const Dashboard = () => {
  const { sales, tasks } = reportsLineChartData;
  const [newUsers, setNewUsers] = useState(0);
  const [allTrips, setAllTrips] = useState(0);
  const [newTrips, setNewTrips] = useState(0);
  const [newTripsForToday, setNewTripsForToday] = useState(0);
  const [newPopularChat, setNewPopularChat] = useState(0);
  const [accordingDayChart, setAccordingDayChart] = useState({
    labels: ["Sun", "M", "T", "W", "T", "F", "Sat"],
    datasets: { label: "Routes", data: [0,0,0,0,0,0,0] }
  });
  const [accordingMonthChart, setAccordingMonthChart] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug","Sept","Oct","Nov","Dec"],
    datasets: { label: "Routes", data: [0,0,0,0,0,0,0,0,0,0,0,0] }
  });
  const [accordingHourChart, setAccordingHourChart] = useState({
    labels: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
    datasets: { label: "Routes", data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] }
  });



  useEffect(() => {
    getAllUser();
    getTrips();
  }, [])

  const getAllUser=()=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users" //change to ruppin later.. also make a new publish
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
            let dt = new Date()
            dt.setTime(dt.getTime() - 24*60*60*1000)
            let newToday = 0;
            result.Users.forEach(user => {
              if(user.AddedDate != ""){
                let userDt = new Date(user.AddedDate)
                if(userDt > dt)
                  newToday++;
              }
            })
            result.GoogleUsers.forEach(user => {
              if(user.AddedDate != ""){
                let userDt = new Date(user.AddedDate)
                if(userDt > dt)
                  newToday++;
              }
            })
            console.log(newToday)
            setNewUsers(newToday);
            }
          )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }
////////////////////////////////////////////////////////////////////////////////////////
const getTrips=()=>{
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
          setAllTrips(result.length);

          let dt = new Date()
          let dtt = new Date()
          dt.setTime(dt.getTime() - 24*60*60*1000)

          let newToday = 0;
          let forToday = 0;
          let routesDayCount = [0,0,0,0,0,0,0]
          let routesMonthCount = [0,0,0,0,0,0,0,0,0,0,0,0]
          let routesHoursCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

          result.forEach(route => {
            let routeDt = new Date(route.date)

            routesDayCount[routeDt.getDay()]++
            routesMonthCount[routeDt.getMonth()]++
            routesHoursCount[routeDt.getHours()-6]++

            if(route.addedDate != ""){
              let routeDt = new Date(route.addedDate)
              if(routeDt > dt)
                newToday++;
            }

            if((routeDt.getDate()==dtt.getDate())&&((routeDt.getMonth()==dtt.getMonth())&&(routeDt.getFullYear()==dtt.getFullYear()))){
              forToday++
            }
          })
          const routeDayChart = {
            labels: ["Sun", "M", "T", "W", "T", "F", "Sat"],
            datasets: { label: "Routes", data: routesDayCount }
          }
          const routeMonthChart = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug","Sept","Oct","Nov","Dec"],
            datasets: { label: "Routes", data: routesMonthCount }
          }
          const routeHourChart = {
            labels: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
            datasets: { label: "Routes", data: routesHoursCount }
          }
          setAccordingDayChart(routeDayChart)
          setAccordingMonthChart(routeMonthChart)
          setAccordingHourChart(routeHourChart);
          setNewTrips(newToday);
          setNewTripsForToday(forToday);
          }
        )
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
}
////////////////////////////////////////////////////////////////////////////////////
const mostPopularChat=()=>{
  let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users" //change to ruppin later.. also make a new publish
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
          let dt = new Date()
          dt.setTime(dt.getTime() - 24*60*60*1000)
          let newToday = 0;
          result.Users.forEach(user => {
            // if(user.Dt != ""){
            //   let userDt = new Date(user.Dt)
            //   if(userDt > dt)
            //     newToday++;
            // }
          })
          setNewPopularChat(newPopularChat);
          }
        )
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="New Users"
                count={newUsers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "in the last 24 hours",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="save"
                title="Trips saved today"
                count={newTrips}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="map"
                title="Total Trips In Timely"
                count={allTrips}
                percentage={{
                  color: "success",
                  amount: newTripsForToday,
                  label: "Trips planned for today",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="chat"
                title="The most popular chat"
                count="add the name"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              {/* change here for charts */}
              {/* 
                {labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] }}
             */}
                <ReportsBarChart
                  color="info"
                  title="Trips are planned by day"
                  date="need to complite"
                  chart={accordingDayChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Trips are planned by month"
                  date="updated 4 min ago"
                  chart={accordingMonthChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Trips are planned by hours"
                  date="just updated"
                  chart={accordingHourChart}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
