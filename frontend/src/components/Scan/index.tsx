import { useState } from 'react';
import Sidebar from '../Sidebar';
import styles from './Scan.module.css';
import QRScanner from '../QRScanner';

const Scanner = () => {
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
