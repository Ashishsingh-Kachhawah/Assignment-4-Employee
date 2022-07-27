import React, {useState} from 'react'
import DatePicker from 'react-datepicker';

import dateFormat from 'dateformat';
import moment from 'moment';
import * as audio from './Sounds'
import '../cssComponents/Dashboard.css'

export default function DateSelector() {
// const [selectedDate, onChange] = useState(new Date());
const [startDate, setStartDate] = useState(new Date());

  return (
   <React.Fragment>
        <div className='DatapickerDiv'>
         <label className='selectDatelable'> Select Date :   </label>
         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

         {/* <DatePicker /> */}
         {/* <DatePicker className='datepicker'  onChange={onChange} value={selectedDate} maxDate={moment().toDate()} /> */}
         <label className='displayDate'>{"Selected Date is  : " + dateFormat(startDate, "mmmm dS, yyyy") }</label>
        </div>
   </React.Fragment>
  )
}
