import React from "react";
import styles from "../../styles/Button.module.css";

interface Props {
  label: string;
  color?: string;
  type?: string;
  size?: string;
  onClick: () => void;
}

const Button = ({ label, color, type = "fill", size, onClick }: Props) => {
  return (
    <button
      className={type === "fill" ? styles.fill : styles.outline}
      style={
        type === "fill"
          ? {
              backgroundColor: color,
              borderColor: color,
            }
          : { color, borderColor: color }
      }
      onClick={onClick}
    >
      <p
        className={styles.label}
        style={{ fontSize: size === "lg" ? "1.3rem" : "1rem" }}
      >
        {label}
      </p>
    </button>
  );
};

export default Button;
