import React from 'react';
import '../cssComponents/Dashboard.css'
import { useEffect, useState, useRef } from "react";
import { getUserRoleWhileLogin } from "../store/root-reducer";
import { useDispatch, connect } from 'react-redux';
import { getTeamMemberListWhileLogin } from '../store/root-reducer';
// import DashboardNavBar from '../navigation/DashboardNavBar';
// import DateSelector from './DateSelector';
import * as audio from "./Sounds";
import Attendance from './Attendance';
import GoogleMap from './GoogleMap';
// import store from '../store/store';
import CustomdateSelector from './CustomDateSelector';
// import { get } from 'immer/dist/internal';

const Dashboard = (props) => {
  const childCompRef = useRef()
  const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
  // const email = store.getState().reducer.email;

  var Username = window.localStorage.getItem("UserName");
  console.log("in Dashboard the Name is", Username);
  useEffect(() => {
    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      // window.location.reload();
      // this.forceUpdate();

    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  const dispatch = useDispatch();

  let getCompID = 0;
  let readyToGetTM = '';
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(null);

  const getIdOfCompany = async () => {
    await fetch("/api/v2/companies/profile")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        try {
          console.log("The Response to get ID ===", response.company.id);
          getCompID = response.company.id;
          return response;
        }
        catch (e) {
          console.log("Error---", e);
          return null;
        }
      });
  }

  const getTheIdOfCurrentComp = () => {
    console.log("Length of array --", props.userRole.response.companies.length)
    let respArray = props.userRole.response.companies;

    let respFilter = respArray.filter(item => item.id === getCompID)
    if (respFilter) {
      console.log("Filter === ", respFilter[0].role.name);

      if (respFilter.length > 0) {
        if (respFilter[0].role.name === "Admin With Company Settings") {
          console.log("He is the Super Admin === > ");
          setUserIsAdmin(true);
          readyToGetTM = "yes";
          console.log("readyToGetTM ==", readyToGetTM);
          dispatch(getTeamMemberListWhileLogin());

        }
        else {
          console.log("He is the Normal User === > ");
          setUserIsAdmin(false);
        }
      }
    }
  }
  useEffect(() => {
    console.log("1111111111111111111111111111111111111111111111111111111111");
    dispatch(getUserRoleWhileLogin());
  }, []);

  useEffect(() => {
    console.log("222222222222222222222222222222222222222222222222");
    getCompanyInfo();
  }, [props.userRole]);

  useEffect(() => {
    console.log("Child comp ref---");
    setTimeout(() => {
      fetch("http://127.0.0.1:3002/employeedetails/copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("response data copy= ", data);
          if(childCompRef && childCompRef.current && childCompRef.current.getEmpAttendanceData){
            childCompRef.current.getEmpAttendanceData();
        }
        })
        .catch((error) => {
          console.log("Error copy api fetch = ", error);
        })
  if(childCompRef && childCompRef.current && childCompRef.current.getEmpAttendanceData){
      childCompRef.current.getEmpAttendanceData();
  }
    }, 1000);
  }, [props.teamMembers]);

  const getCompanyInfo = async () => {
    await getIdOfCompany();
    console.log("getCompId--", getCompID);
    if (getCompID > 0) {
      getTheIdOfCurrentComp()
    }
  }
  console.log("Team Members are  === ", props);
  // console.log("Team Members are  === ",);
  // var route = [
  //   { lat: 21.161639, lng: 79.659862 },
  //   { lat: 21.173117, lng: 79.658434 },
  //   { lat: 21.188337, lng: 79.661873 },
  //   { lat: 21.204019, lng: 79.67098 },
  //   { lat: 21.221012, lng: 79.65773 },
  //   { lat: 21.229919, lng: 79.64817 },
  // ];
  // window.location.reload();
  const [IsAttendance, setIsAttendance] = useState(true);
  return (
    <React.Fragment>
      <div className="stylDashboardView">
        {/* <h1>In a Dashboard.........................WELCOME...............</h1> */}
        <div className="AdminContainer" >
          <div className="Usernamediv">Welcome Back {Username} </div>
          <div className='Admindiv' hidden={userIsAdmin ? false : true}>I AM THE ADMIN </div>

        </div>

        <header className="header">{/* <DashboardNavBar /> */}</header>
        <div className="dashboardmainContainer">
          <div className="AttendanceDiv">
            <button
              type="button"
              onClick={() => {
                {
                  audio.SelectClick.play();
                }
                setIsAttendance(true);
              }}
              id={
                IsAttendance == true ? "trueattendancebtn" : "attendancebtn"
              }
              class="btn btn-primary btn-lg btn-block"
            >
              ATTENDANCE
            </button>
          </div>
          <div className="LocationDiv">
            <button
              type="button"
              onClick={() => {
                {
                  audio.SelectClick.play();
                }
                setIsAttendance(false);
              }}
              id={IsAttendance == false ? "truelocationbtn" : "locationbtn"}
              class="btn btn-primary btn-lg btn-block"
            >
              LOCATION
            </button>
          </div>
          {/* <DateSelector /> */}
          <CustomdateSelector />
          <div>
            <div className="UserList">{/* <SideDrawer /> */}</div>
            {IsAttendance && <Attendance userIsAdmin={userIsAdmin} ref={childCompRef} />}
            {!IsAttendance && (
              <GoogleMap
                center={{ lat: 21.126109, lng: 79.1146691 }}
                zoom={14}
                userIsAdmin={userIsAdmin}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

//LISTENER FROM SAGA
const mapStateToProps = state => ({
  userRole: state.getRoleApiReducer,
  teamMembers: state.getTeamMemberApiReducer,

});

export default connect(mapStateToProps)(Dashboard);