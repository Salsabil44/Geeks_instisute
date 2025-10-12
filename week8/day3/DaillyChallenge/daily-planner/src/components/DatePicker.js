import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../plannerSlice";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <ReactDatePicker
        selected={new Date(selectedDate)}
        onChange={(date) => dispatch(setDate(date.toISOString().split("T")[0]))}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default DatePicker;
