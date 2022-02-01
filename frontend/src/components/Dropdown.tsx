import React from "react";
import Link from "next/link";
import styles from "../../styles/Dropdown.module.css";
import { Url } from "url";

interface Content {
  label: string;
  href?: string;
  onClick?: () => void;
}

type Props = {
  label: string;
  content: Content[];
  hasLinks?: boolean;
};

const Dropdown = ({ label, content, hasLinks = false }: Props) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropbtn}>{label}</div>
      <div className={styles.dropdownContent}>
        {content.map((c) => {
          hasLinks ? (
            <Link href={c.href || "./"}>{c.label}</Link>
          ) : (
            <div onClick={c.onClick}>{c.label}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
