import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const images = [
    { src: "1.jpg", title: "Hong Kong" },
    { src: "2.webp", title: "Macao" },
    { src: "3.webp", title: "Japan" },
    { src: "4.webp", title: "Las Vegas" },
  ];

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🌍 Travel Destinations</h2>

      {/* === Bootstrap Carousel === */}
      <div id="travelCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img src={img.src} className="d-block w-100 main-image" alt={img.title} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{img.title}</h5>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#travelCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#travelCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* === Clickable thumbnails below === */}
      <div className="row justify-content-center">
        {images.map((img, index) => (
          <div className="col-6 col-sm-3 mb-3" key={index}>
            <img
              src={img.src}
              alt={img.title}
              className="img-fluid rounded thumbnail"
              data-bs-target="#travelCarousel"
              data-bs-slide-to={index}   // This makes it clickable
            />
            <p className="mt-2">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
