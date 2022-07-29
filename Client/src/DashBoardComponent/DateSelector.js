import React, {useState} from 'react'
// import DatePicker from 'react-datepicker';
import DatePicker from "react-date-picker";
import dateFormat from 'dateformat';
import moment from 'moment';
// import * as audio from './Sounds'
import '../cssComponents/Dashboard.css'


export default function DateSelector() {
const [selectedDate, onChange] = useState(new Date());
// const [startDate, setStartDate] = useState(new Date());

const style = {
    display: "flex",
    /* visibility: hidden; */
    // flex-direction: row;
    width: "400px",
    height: "30px",
    backgroundColor: "transparent",
    // alignContent: flex-start;
}
  return (
   <React.Fragment>
        <div className='DatapickerDiv'>
         <label className='selectDatelable'> Select Date :   </label>
         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}

         {/* <DatePicker /> */}
         <DatePicker className='datepicker'   onChange={onChange} value={selectedDate} maxDate={moment().toDate()} />
         <label className='displayDate'>{"Selected Date is  : " + dateFormat(selectedDate, "mmmm dS, yyyy") }</label>
        </div>
   </React.Fragment>
  )
}
