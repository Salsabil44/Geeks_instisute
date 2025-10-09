import React, { useState } from "react";
import FormComponent from "./Components/FormComponent";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    lactoseFree: false,
    veganMeal: false,
    nutsFree: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "boolean") value = value ? "on" : "off";
      queryParams.append(key, value);
    });
    const newUrl = `${window.location.origin}?${queryParams.toString()}`;
    window.history.pushState(null, "", newUrl);
    alert("Form submitted! Check your URL 👇");
  };

  return (
    <div className="App">
      <h1>React Form Container</h1>
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
