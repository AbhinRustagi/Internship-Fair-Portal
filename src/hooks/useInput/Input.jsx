import React, { useState } from "react";
import styles from "./Input.module.scss";

export function useInput({
  type = "text",
  className = "",
  placeholder = "",
  label = "",
  description = "",
  minLength = 1,
  maxLength = 100,
  name = "",
  required = true,
}) {
  const [inputValue, setValue] = useState(null);

  const InputField = () => (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className="mb-s text-s">
        {label}
      </label>
      {description ? (
        <small className="mb-s text-xs text-gray">{description}</small>
      ) : null}
      <input
        type={type || "text"}
        value={inputValue}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`mb-s border-gray px-s py-xxs ${className}`}
        required={required || false}
        name={name}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );

  return [InputField, inputValue];
}
