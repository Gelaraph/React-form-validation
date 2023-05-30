import React from "react";

const Form = ({ onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
