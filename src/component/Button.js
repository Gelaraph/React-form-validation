import React from "react";

const Button = ({ type, disabled, children, loading, ...rest }) => {
  return (
    <button
      className="button"
      type={type}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
