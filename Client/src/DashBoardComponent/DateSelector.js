import React, {useState} from 'react'
import DatePicker from 'react-date-picker';
import dateFormat from 'dateformat';
import moment from 'moment';
import * as audio from './Sounds'
import '../cssComponents/Dashboard.css'

export default function DateSelector() {
const [selectedDate, onChange] = useState(new Date());


  return (
   <React.Fragment>
        <div className='DatapickerDiv'>
         <label className='selectDatelable'> Select Date :   </label>
         <DatePicker className='datepicker'  onChange={onChange} value={selectedDate} maxDate={moment().toDate()} />
         <label className='displayDate'>{"Selected Date is  : " + dateFormat(selectedDate, "mmmm dS, yyyy") }</label>
        </div>
   </React.Fragment>
  )
}
