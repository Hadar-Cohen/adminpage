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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import React, {useState, useEffect} from "react";


function OrdersOverview() {
  useEffect(() => {
    getPopularDestinations();
  }, [])

  const [PopularDestinations, setPopularDestinations] = useState(0);

  const getPopularDestinations=()=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/RouteRequest" //change to ruppin later.. also make a new publish
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
            const target = result.map((dest,index)=>{
            if(index == (result.length)-1)
              return(<TimelineItem
                color="primary"
                icon="place"
                title={dest}
                dateTime=""
                lastItem
              />)
            return(<TimelineItem
            color="primary"
            icon="place"
            title={dest}

          />);

            }) 
            setPopularDestinations(target);
            }
          )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }


  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Popular destinations
        </MDTypography>
   
      </MDBox>
      {/* change here for popular destinations statistics  - Din*/}
      <MDBox p={2}> 
      {PopularDestinations}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
