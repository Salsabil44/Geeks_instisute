import React from "react";

export default function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Gender:
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
      </label>
      <br />

      <label>
        Destination:
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        >
          <option value="">-- Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="Brazil">Brazil</option>
        </select>
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree}
          onChange={handleChange}
        />
        Lactose Free
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="veganMeal"
          checked={formData.veganMeal}
          onChange={handleChange}
        />
        Vegan Meal
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="nutsFree"
          checked={formData.nutsFree}
          onChange={handleChange}
        />
        Nuts Free
      </label>
      <br />


      <button type="submit">Submit</button>
      <hr />

      <h3>Entered Information:</h3>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Age: {formData.age}</p>
      <p>Gender: {formData.gender}</p>
      <p>Destination: {formData.destination}</p>
      <p>Lactose Free: {formData.lactoseFree ? "Yes ✅" : "No ❌"}</p>
        <p>Vegan Meal: {formData.veganMeal ? "Yes ✅" : "No ❌"}</p>
      <p>Nuts Free: {formData.nutsFree ? "Yes ✅" : "No ❌"}</p>
    </form>
  );
}
