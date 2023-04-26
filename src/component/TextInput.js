import React from "react";

const TextInput = (props) => {
  return (
    <div className="text-input">
      <label
        className={props.focus || props.value !== "" ? "label-focus" : ""}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <input
        className={`${props.focus || props.value !== "" ? "input-focus" : ""} ${
          props.error ? "form-control is-invalid" : "form-control"
        }`}
        type="text"
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

export default TextInput;
