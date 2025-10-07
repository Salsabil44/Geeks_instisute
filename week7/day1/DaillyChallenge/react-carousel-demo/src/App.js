import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

function App() {
  const slides = [
    { src: "1.jpg", title: "Hong Kong" },
    { src: "2.webp", title: "Macao" },
    { src: "3.webp", title: "Japan" },
    { src: "4.webp", title: "Las Vegas" },
  ];

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">🌍 Travel Destinations</h2>

      <Carousel
        showArrows
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={800}
        emulateTouch
        showThumbs
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.src} alt={slide.title} />
            <p className="carousel-caption">{slide.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
