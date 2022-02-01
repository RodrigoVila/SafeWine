import { MouseEvent } from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { FaWineBottle } from "react-icons/fa";
import useWeb3 from "../hooks/useWeb3";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Router from "next/router";

const Navbar = () => {
  const { currentAccount, getAccount } = useWeb3();

  const trimmedAccount = () => {
    const { address } = currentAccount;
    if (address) {
      const firstSix = address.slice(0, 4);
      const lastSix = address.slice(-6);

      return `${firstSix}....${lastSix}`;
    } else return "";
  };

  const handleBrandClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.brand} onClick={handleBrandClick}>
        <FaWineBottle /> SafeWine
      </div>
      {currentAccount && trimmedAccount() && (
        <div className={styles.account}>{`- ${trimmedAccount()}`}</div>
      )}
    </div>
  );
};

export default Navbar;
