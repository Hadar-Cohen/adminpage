
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove} from "firebase/database";
import React, {useState, useEffect } from 'react';
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

  useEffect(() => {
    getAllChats()
  }, [])

  const unblockUser=(id)=>{
    let api = "https://proj.ruppin.ac.il/bgroup54/test2/tar6/api/Users"
    fetch(api + '?id='+ id, {
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
      const db = ref(database, `Profane/${id}`)
      remove(db).then(() => getAllChats())
      },
      (error) => {
      console.log("err post=", error);
      });
      
  }

  const getAllChats=()=>{
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
                <MDButton variant="gradient" color="error" onClick={() => {unblockUser(msg.id)}} fullWidth>
                Unblock
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

  
  return {
    columns: [
      { Header: "User Name", accessor: "UserName", align: "left" },
      { Header: "User Id", accessor: "UserId",  align: "left" },
      { Header: "Text", accessor: "Text", align: "center" },
      { Header: "Unblock", accessor: "Unblock", align: "center" },
    ],
    rows:allChats

    
  };
}
