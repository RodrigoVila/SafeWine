import { MouseEvent } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { BsPlusLg } from "react-icons/bs";
import { FiUsers, FiMinus } from "react-icons/fi";
import { IoMdQrScanner } from "react-icons/io";
import { GoGift } from "react-icons/go";
import { SiDatabricks } from "react-icons/si";
import useWeb3 from "../../hooks/useWeb3";
import AddressAndBrandInfo from "../AddressAndBrandInfo";

const Sidebar = () => {
  const { currentAccount } = useWeb3();

  const createAccount = () => {};

  return (
    <div className={styles.container}>
      <AddressAndBrandInfo />
      <div className={styles.navLinks}>
        {currentAccount?.type === "cellar" && (
          <>
            <Link href={"/dashboard"}>
              <a className={styles.link}>
                <SiDatabricks />
                <p className={styles.linkText}>Dashboard</p>
              </a>
            </Link>
            <Link href={"/scan"}>
              <a className={styles.link}>
                <IoMdQrScanner />
                <p className={styles.linkText}>Scan</p>
              </a>
            </Link>
            <Link href={"/add"}>
              <a className={styles.link}>
                <BsPlusLg />
                <p className={styles.linkText}>Add bottle</p>
              </a>
            </Link>
            <Link href={"/delete"}>
              <a className={styles.link}>
                <FiMinus />
                <p className={styles.linkText}>Delete bottle</p>
              </a>
            </Link>
            <Link href={"/ownership"}>
              <a className={styles.link}>
                <FiUsers />
                <p className={styles.linkText}>Change ownership</p>
              </a>
            </Link>
          </>
        )}
        {currentAccount?.type === "shop" && (
          <>
            <Link href={"/dashboard"}>
              <a className={styles.link}>
                <SiDatabricks />
                <p className={styles.linkText}>Dashboard</p>
              </a>
            </Link>
            <Link href={"/scan"}>
              <a className={styles.link}>
                <IoMdQrScanner />
                <p className={styles.linkText}>Scan</p>
              </a>
            </Link>
            <Link href={"/sell"}>
              <a className={styles.link}>
                <GoGift />
                <p className={styles.linkText}>Sell bottle</p>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
