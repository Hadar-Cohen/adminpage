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
import React, {useState, useEffect} from 'react';
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
  let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users" //change to ruppin later.. also make a new publish
  fetch(api, {
    method: 'GET',
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
            if(user.Dt != ""){
              let userDt = new Date(user.Dt)
              if(userDt > dt)
                newToday++;
            }
          })
          result.GoogleUsers.forEach(user => {
            if(user.Dt != ""){
              let userDt = new Date(user.Dt)
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
                count="add the num"
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
                title="planned trips for today"
                count="add the num"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
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
                datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },}
             */}
                <ReportsBarChart
                  color="info"
                  title="Trips are planned by day"
                  date="need to complite"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Trips are planned by month"
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Trips are planned by houre"
                  date="just updated"
                  chart={tasks}
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
