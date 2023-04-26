import React from "react";

const TextArea = (props) => {
  return (
    <div className="text-area">
      <label
        className={props.focus || props.value !== "" ? "label-focus" : ""}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <textarea
        className={`form-control ${
          props.focus || props.value !== "" ? "input-focus" : ""
        } ${props.error ? "is-invalid" : ""}`}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default TextArea;
