import React from 'react';
import '../cssComponents/Dashboard.css'
import {useEffect , useState} from "react";
import { getUserRoleWhileLogin } from "../store/root-reducer";
import {useDispatch , connect} from 'react-redux';
import { getTeamMemberListWhileLogin } from '../store/root-reducer';

const Dashboard = (props) => {
  const dispatch = useDispatch();

let getCompID = 0;
let readyToGetTM = '';
const [userIsAdmin , setUserIsAdmin] = useState(false);

  const getIdOfCompany = async() => {
    await fetch("https://powercooling.staging.utilizecore.com/api/v2/companies/profile")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      try{
        console.log("The Response to get ID ===", response.company.id);
        getCompID = response.company.id;       
        return response;
      }
      catch(e){
        console.log("Error---", e);
        return null;
      }
    });
  }

  const getTheIdOfCurrentComp = () => {
    console.log("Length of array --", props.userRole.response.companies.length)
    let respArray = props.userRole.response.companies;

    let respFilter = respArray.filter(item => item.id === getCompID)
    if(respFilter){
      console.log("Filter === ", respFilter[0].role.name );

    if(respFilter.length > 0){
      if(respFilter[0].role.name === "Admin With Company Settings"){
        console.log("He is the Super Admin === > ");
        setUserIsAdmin(true);
        readyToGetTM = "yes";
        console.log("readyToGetTM ==", readyToGetTM);
          dispatch(getTeamMemberListWhileLogin());

      }
      else{
        console.log("He is the Normal User === > ");
        // setUserIsAdmin(false);
      }
    }
  }
  }
  useEffect(() => {
    console.log("1111111111111111111111111111111111111111111111111111111111");
    dispatch(getUserRoleWhileLogin());    
    },[]);
    
  useEffect(() => {
    console.log("222222222222222222222222222222222222222222222222");
    getCompanyInfo();    
    },[props.userRole]);

    const getCompanyInfo = async() => {
      await getIdOfCompany();
      console.log("getCompId--", getCompID);
      if(getCompID > 0){
        getTheIdOfCurrentComp()
      }
    }
      console.log("Team Members are  === ", props);
    return(
        <div className='stylDashboardView'>
            <h1>In a Dashboard.........................WELCOME...............</h1>
            <div hidden={userIsAdmin ? false : true} >I AM THE ADMIN</div>
        </div>
    );
}

//LISTENER FROM SAGA
const mapStateToProps = state => ({
    userRole : state.getRoleApiReducer,
    teamMembers : state.getTeamMemberApiReducer,
    
  });
  
export default connect(mapStateToProps)(Dashboard);