import React, { useState, useMemo, useRef } from 'react';
import styles from './input.module.css';

interface IProps {
  placeholder?: string;
  text?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  onChange?: (element: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  buttonStyle?: string;
  type: string;
  pattern?: string;
  inputStyle?: string
}

const Input = (props: IProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { placeholder, text, onFocus, onBlur, onClick, onChange, value, buttonStyle, type, pattern, inputStyle } = props;


  return (
    <div className={styles.container}>
      <input
        ref={ref}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className={inputStyle}
        value={value}
        placeholder={placeholder}
        pattern={pattern}
      />
     {buttonStyle && (
        <button className={buttonStyle} onClick={onClick}>
        {text}
      </button>
     )}
    </div>
  );
};

export default React.forwardRef(Input);
