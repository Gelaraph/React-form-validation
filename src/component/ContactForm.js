import React, { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import Card from "./Card";
import Form from "./Form";
import TextInput from "./TextInput";
import { nanoid } from "nanoid";

const ContactForm = () => {
  const [state, setState] = useState({
    name: {
      name: "name",
      label: "Name",
      value: "",
      focus: false,
    },
    email: {
      name: "email",
      label: "Email",
      value: "",
      focus: false,
    },
    subject: {
      name: "subject",
      label: "Subject",
      value: "",
      focus: false,
    },
    message: {
      name: "message",
      label: "Message",
      value: "",
      focus: false,
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    // subject: "",
    message: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  const [submissionError, setSubmissionError] = useState(null);

  const [loading, setLoading] = useState(false);

  function handleFocus(e) {
    const name = e.target.name;
    const updatedState = { ...state };
    updatedState[name].focus = true;
    setState(updatedState);
  }

  function handleBlur(e) {
    const name = e.target.name;
    const updatedState = { ...state };
    updatedState[name].focus = false;
    setState(updatedState);
  }

  function handleChange(e) {
    const name = e.target.name;
    const updatedState = { ...state };
    updatedState[name].value = e.target.value;
    setState(updatedState);

    // clear error for the field when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // check if all required fields have been filled
    const { name: nameField, email, subject, message } = updatedState;
    const isFormValid =
      nameField.value.trim() !== "" &&
      email.value.trim() !== "" &&
      // subject.value.trim() !== "" &&
      message.value.trim() !== "";
    setFormIsValid(isFormValid);
    setIsSendButtonDisabled(!isFormValid);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // set loading state to true
    setLoading(true);

    // perform validation
    const { name, email, subject, message } = state;
    const validationErrors = {};

    if (!name.value.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.value.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      validationErrors.email = "Email is invalid";
    }

    // if (!subject.value.trim()) {
    //   validationErrors.subject = "Subject is required";
    // }

    if (!message.value.trim()) {
      validationErrors.message = "Message is required";
    }

    // update errors state
    if (Object.values(validationErrors)?.length) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // update formIsValid state
    const isFormValid =
      name.value.trim() !== "" &&
      email.value.trim() !== "" &&
      // subject.value.trim() !== "" &&
      message.value.trim() !== "";
    setFormIsValid(isFormValid);

    if (isFormValid) {
      // prepare data to send
      const id = nanoid();
      const data = {
        id,
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };

      // send data to API endpoint
      fetch(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Submission failed");
          }
          return response.json();
        })
        .then((data) => {
          // reset form fields
          setState({
            name: {
              ...state.name,
              value: "",
            },
            email: {
              ...state.email,
              value: "",
            },
            subject: {
              ...state.subject,
              value: "",
            },
            message: {
              ...state.message,
              value: "",
            },
          });

          // reset loading state
          setLoading(false);

          // show success message
          setSubmissionSuccessful(true);
          window.alert("Your message has been sent successfully!");
          setSubmissionError(null);
        })
        .catch((error) => {
          // show error message
          setLoading(false);
          window.alert(
            "There were errors in the form. Please fix them and try again."
          );
          setSubmissionSuccessful(false);
        });
    }
  }

  const { name, email, message, subject } = state;

  return (
    <div className="container">
      {submissionSuccessful && (
        <div className="success-message">{submissionSuccessful}</div>
      )}
      {submissionError && (
        <div className="error-message">{submissionError}</div>
      )}
      <Card>
        <h1>Send us a Message!</h1>
        <Form onSubmit={handleSubmit}>
          <TextInput
            {...name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.name}
          />
          <TextInput
            {...email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email}
          />
          <TextInput
            {...subject}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextArea
            {...message}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.message}
          />
          <Button
            type="submit"
            // disabled={isSendButtonDisabled}
            style={{
              backgroundColor: isSendButtonDisabled ? "grey" : "",
            }}
            loading={loading}
          >
            Send
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ContactForm;
