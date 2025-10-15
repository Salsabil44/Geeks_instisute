import React from "react";

function Card({ title, icon, text }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100 border-0">
        <div className="card-body text-center">
          <i className={`fa ${icon} fa-3x mb-3 text-primary`}></i>
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
