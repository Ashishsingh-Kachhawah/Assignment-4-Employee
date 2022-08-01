import React, { useState } from "react";
import DatePicker from "react-datepicker";
import '../cssComponents/Dashboard.css'
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import moment from 'moment';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomdateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <React.Fragment>
      <div className="DatapickerDiv">
        <div>
          <label className="selectDatelable"> Select Date : </label>
        </div>
        <div>
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={moment().toDate()}
          />
        </div>
        <div>  <label className="displayDate">
          {"Selected Date is  : " + dateFormat(startDate, "mmmm dS, yyyy")}
        </label></div>
      
      </div>
    </React.Fragment>
  );
};

export default CustomdateSelector;