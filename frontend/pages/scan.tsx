import { useState } from "react";
import { NextPage } from "next";
import Sidebar from "../src/components/Sidebar";
import styles from "../styles/Scan.module.css";
import QRScanner from "../src/components/QRScanner";

const Scanner: NextPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleData = (data: any) => setData(data);
  const handleError = (error: any) => setError(error);

  return (
    <div className={styles.container}>
      <Sidebar />

      <QRScanner handleData={handleData} handleError={handleError} />
    </div>
  );
};

export default Scanner;
