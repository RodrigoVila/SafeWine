import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";
import QRScanner from "../src/components/QRScanModal";
import useWeb3 from "../src/hooks/useWeb3";
import styles from "../styles/AddBottle.module.css";

const SellBottle: NextPage = () => {
  const { account, cellarAccountExists, createCellarAccount } = useWeb3();
  const [hasToRegisterAccount, setHasToRegisterAccount] = useState(false);

  const createAccount = async () => {
    await createCellarAccount();
  };

  const handleData = () => {};
  const handleError = () => {};

  useEffect(() => {
    cellarAccountExists().then((data) => setHasToRegisterAccount(data));
  }, [account]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        {hasToRegisterAccount ? (
          <Button
            label="Create a Shop account"
            onClick={createAccount}
            color="#000"
            type="outline"
          />
        ) : (
          <div className={styles.scannerContainer}>
            <QRScanner handleData={handleData} handleError={handleError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellBottle;
