import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDay } from "../redux/tasksActions";

export default function DatePicker() {
  const dispatch = useDispatch();
  const selected = useSelector(s => s.selectedDay);

  return (
    <div>
      <label style={{fontWeight:700,color:"#374151"}}>Pick a date</label>
      <div style={{marginTop:8, display:"flex", gap:8, alignItems:"center"}}>
        <input
          type="date"
          value={selected}
          onChange={e => dispatch(selectDay(e.target.value))}
          className="input"
        />
        <div style={{color:"var(--muted)",fontSize:13}}>Selected: <strong style={{color:"var(--accent)"}}>{selected}</strong></div>
      </div>
    </div>
  );
}
