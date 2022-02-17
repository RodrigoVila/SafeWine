import React, { useEffect, useState } from "react";
import styles from "./Transfer.module.css";

import Button from "../Buttons/Filled";
import Sidebar from "../Sidebar";
import QRScanner from "../QRScanner";
import useWeb3 from "../../hooks/useWeb3";
import useIPFS from "../../hooks/useIPFS";
import FilledButton from "../Buttons/Filled";

const TransferBottle = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isScannerShown, setShowScanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDataUploaded, setDataUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentAccount, mintNFT, getSender } = useWeb3();
  const {
    fileBUffer,
    handleFileInput,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  } = useIPFS();

  const handleSubmit = async (tokenURI: string) => {
    await mintNFT(tokenURI)
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

export default TransferBottle;
