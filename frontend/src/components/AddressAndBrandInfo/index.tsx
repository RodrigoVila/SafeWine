import React from "react";
import styles from "./Address.module.css";
import useWeb3 from "../../hooks/useWeb3";
import { GiWineBottle } from "react-icons/gi";

const AddressAndBrandInfo = () => {
  const { currentAccount } = useWeb3();

  const trimmedAccount = () => {
    const { address } = currentAccount;
    if (address) {
      const firstSix = address.slice(0, 4);
      const lastSix = address.slice(-6);

      return `${firstSix}....${lastSix}`;
    } else return "";
  };
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <GiWineBottle />
        <div className={styles.brandName}>SafeWine</div>
      </div>
      <div className={styles.userAccount}>
        {currentAccount && trimmedAccount()}
      </div>
    </div>
  );
};

export default AddressAndBrandInfo;
