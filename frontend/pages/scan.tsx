import { useState } from "react";
import { NextPage } from "next";
import EmptyContainer from "../src/components/EmptyContainer";
import Navbar from "../src/components/Navbar";
import QRScanner from "../src/components/QRScanModal";
import styles from "../styles/Scanner.module.css";

const Scanner: NextPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleData = (data: any) => setData(data);
  const handleError = (error: any) => setError(error);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <p className={styles.label}>Scan bottle QR code</p>
          <div className={styles.scannerContainer}>
            <QRScanner handleData={handleData} handleError={handleError} />
          </div>
          {error && error}
        </div>
        <EmptyContainer />
      </div>
    </div>
  );
};

export default Scanner;
