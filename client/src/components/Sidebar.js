import React from "react";
import styles from "../styles/Sidebar.module.css";
import { BiUser, BiStore } from "react-icons/bi";
import { GiGrapes } from "react-icons/gi";
import Link from "next/link";

const Sidebar = ({ selected }) => {
  return (
    <div className={styles.container}>
      <Link href="/user">
        <div
          className={`${styles.navlink} ${
            selected === "user" && styles.selected
          }`}
        >
          <BiUser className={styles.icon} />
          <p className={styles.textlink}>User</p>
        </div>
      </Link>
      <Link href="/winestore">
        <div
          className={`${styles.navlink} ${
            selected === "winestore" && styles.selected
          }`}
        >
          <BiStore className={styles.icon} />
          <p className={styles.textlink}>Store</p>
        </div>
      </Link>

      <Link href="/producer">
        <div
          className={`${styles.navlink} ${
            selected === "producer" && styles.selected
          }`}
        >
          <GiGrapes className={styles.icon} />
          <p className={styles.textlink}>Producer</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
