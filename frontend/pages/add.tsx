import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";
import QRScanner from "../src/components/QRScanModal";
import useWeb3 from "../src/hooks/useWeb3";
import styles from "../styles/AddBottle.module.css";

const AddBottle: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [isScannerShown, setShowScanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { currentAccount } = useWeb3();

  const createAccount = async () => {};

  const handleData = (data) => {
    data && alert(`Data OK: ${data}`);
  };
  const handleError = (error) => {
    error && alert(`Error pulling data: ${error}`);
  };

  const toggleModal = () => setShowScanner(!isScannerShown);

  // useEffect(() => {
  //   cellarAccountExists().then((data) => setHasToRegisterAccount(data));
  // }, [account]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        {currentAccount?.type === "" ? (
          <Button
            label="Create a Cellar account"
            onClick={createAccount}
            color="#000"
            type="outline"
          />
        ) : (
          <>
            <div className={styles.form}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
              />
              <label className={styles.label}>Description</label>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className={styles.label}>Token URI</label>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => setTokenURI(e.target.value)}
              />
              {!isScannerShown && (
                <Button
                  label="Scan QR Code"
                  onClick={() => setShowScanner(true)}
                  type="outline"
                />
              )}
            </div>
            <p className={`${styles.message} ${styles.errorMessage}`}>
              {errorMessage}
            </p>
            <p className={`${styles.message} ${styles.successMessage}`}>
              {successMessage}
            </p>
            {isScannerShown && (
              <div className={styles.scannerContainer}>
                <QRScanner
                  handleData={handleData}
                  handleError={handleError}
                  onCloseModal={toggleModal}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddBottle;
