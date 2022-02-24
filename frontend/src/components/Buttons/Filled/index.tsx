import React, { MouseEvent } from "react";
import styles from "./styles.module.css";

interface Props {
  label: string;
  color?: string;
  size?: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

const FilledButton = ({ label, color, size, onClick }: Props) => {
  return (
    <button
      className={styles.button}
      style={{
        backgroundColor: color,
        borderColor: color,
      }}
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

export default FilledButton;
