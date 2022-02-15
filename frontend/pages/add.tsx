import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import Button from "../src/components/Buttons/Filled";
import Sidebar from "../src/components/Sidebar";
import QRScanner from "../src/components/QRScanner";
import useWeb3 from "../src/hooks/useWeb3";
import styles from "../styles/AddBottle.module.css";
import useIPFS from "../src/hooks/useIPFS";
import Router from "next/router";
import FilledButton from "../src/components/Buttons/Filled";

const AddBottle: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isScannerShown, setShowScanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDataUploaded, setDataUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentAccount, mintNFT, getSender, getToken } = useWeb3();
  const {
    fileBUffer,
    handleFileInput,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  } = useIPFS();

  const handleSubmit = async (tokenURI: string) => {
    await mintNFT(name, description, tokenURI)
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Mint error: ", e);
        setIsLoading(false);
      });
  };

  const uploadData = async (e) => {
    e.preventDefault();
    if (!name || !description || fileBUffer === []) {
      alert("Every input is mandatory");
      return;
    }
    setIsLoading(true);
    await uploadFileToIPFS().then((fileURI) => {
      fileURI !== undefined &&
        uploadMetadataToIPFS(name, description, fileURI.toString()).then(
          (tokenURI) => {
            tokenURI && handleSubmit(tokenURI);
          }
        );
    });
  };

  const handleData = (data) => {};
  const handleError = (error) => {
    error && alert(`Error pulling data: ${error}`);
  };

  const toggleModal = () => setShowScanner(!isScannerShown);

  useEffect(() => {
    if (currentAccount.type !== "cellar") {
      alert("Please create cellar account first");
      Router.push("./dashboard");
    }
  }, [currentAccount]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <label className={styles.title}>Add Bottle</label>
          <label className={styles.label}>Name</label>
          <input
            required
            type="text"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label}>Description</label>
          <input
            required
            type="text"
            className={styles.input}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={styles.label}>Select NFT Image</label>
          <input
            required
            type="file"
            className={styles.input}
            onChange={(e) => handleFileInput(e)}
          />
          {!isScannerShown && (
            <>
              {isLoading ? (
                <Button label="Loading..." onClick={() => {}} />
              ) : isDataUploaded ? (
                <Button label="Submit" onClick={handleSubmit} />
              ) : (
                <>
                  <Button label="Upload Data to IPFS" onClick={uploadData} />
                  <FilledButton
                    label="getSender"
                    onClick={getSender}
                    color="#5ca3"
                  />
                  <FilledButton
                    label="getToken"
                    onClick={() => getToken(3)}
                    color="#fa3c"
                  />
                </>
              )}
            </>
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
            <QRScanner handleData={handleData} handleError={handleError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBottle;
