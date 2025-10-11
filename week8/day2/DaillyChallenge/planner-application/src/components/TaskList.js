import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../redux/tasksActions";

export default function TaskList() {
  const dispatch = useDispatch();
  const selected = useSelector(s => s.selectedDay);
  const tasks = useSelector(s => s.tasksByDay[selected] || []);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (task) => { setEditingId(task.id); setEditText(task.text); };
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    dispatch(editTask(selected, id, editText.trim()));
    setEditingId(null);
    setEditText("");
  };
  const remove = (id) => dispatch(deleteTask(selected, id));

  return (
    <div>
      <h3 style={{marginBottom:10,fontWeight:700,color:"#111827"}}>Tasks for <span style={{color:"var(--accent)"}}>{selected}</span></h3>
      {tasks.length === 0 ? (
        <div className="empty">No tasks for this day</div>
      ) : (
        tasks.slice().reverse().map(task => (
          <div key={task.id} className="task">
            <div className="left">
              <div className="title">{task.text}</div>
              <div className="meta">{selected}</div>
            </div>

            <div className="actions">
              {editingId === task.id ? (
                <>
                  <input value={editText} onChange={e=>setEditText(e.target.value)} className="input" style={{width:220}} />
                  <button className="btn primary" onClick={()=>saveEdit(task.id)}>Save</button>
                  <button className="btn ghost" onClick={()=>{setEditingId(null); setEditText("");}}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="icon-btn" onClick={()=>startEdit(task)}>✏️</button>
                  <button className="icon-btn" onClick={()=>remove(task.id)}>🗑️</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
