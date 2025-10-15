import React from "react";

function Contact() {
  return (
    <section id="contact" className="bg-light py-5 mt-5">
      <div className="container text-center">
        <h2 className="mb-4">Contact Us</h2>
        <form className="mx-auto" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
