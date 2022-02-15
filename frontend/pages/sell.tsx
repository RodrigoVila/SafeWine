import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import Button from "../src/components/Buttons/Filled";
import Sidebar from "../src/components/Sidebar";
import QRScanner from "../src/components/QRScanner";
import useWeb3 from "../src/hooks/useWeb3";
import styles from "../styles/AddBottle.module.css";

const SellBottle: NextPage = () => {
  const {} = useWeb3();

  const createAccount = async () => {};

  const handleData = () => {};
  const handleError = () => {};

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Button
          label="Create a Shop account"
          onClick={() => {}}
          color="#000"
          type="outline"
        />
        <div className={styles.scannerContainer}>
          <QRScanner handleData={handleData} handleError={handleError} />
        </div>
      </div>
    </div>
  );
};

export default SellBottle;
