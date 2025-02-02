import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for feedback message and its type (success or error)
  const [feedback, setFeedback] = useState({
    message: "",
    isSuccess: false, // Track if the feedback is for a success
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    // Check if fields are empty
    if (!formData.name.trim()) {
      newErrors.name = "Du behöver skriva in ditt namn";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Du behöver skriva in din email-adress";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email-en är felaktig";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Du behöver skriva ett meddelande";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      // Send the form data to the API
      const response = await axios.post(
        "https://js2-ecommerce-api.vercel.app/api/messages",
        formData
      );

      // Handle success response
      if (response.status === 200) {
        setFeedback({
          message: "Ditt meddelande är skickat!",
          isSuccess: true, // Set feedback as success
        });
        // Clear the form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 400) {
        setFeedback({
          message: "Kunde inte skicka meddelandet. Kontrollera dina uppgifter.",
          isSuccess: false, // Set feedback as error
        });
      } else {
        setFeedback({
          message: "Ett fel inträffade. Försök igen senare.",
          isSuccess: false, // Set feedback as error
        });
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Kontakta oss</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Namn
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Meddelande
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white"
            rows="4"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-2 px-4 rounded hover:bg-slate-700"
        >
          Skicka meddelande
        </button>
      </form>

      {feedback.message && (
        <p
          className={`mt-4 text-center ${
            feedback.isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
};

export default ContactPage;