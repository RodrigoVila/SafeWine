import React from 'react';
import QrReader from 'react-qr-reader';
import styles from './styles.module.css';
import Navbar from '../Navbar';

const QRScanner = () => {
    const handleError = () => {};
    const handleData = () => {};

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <p className={styles.text}>Place code inside the box</p>
                    <div className={styles.qrContainer}>
                        <QrReader
                            delay={100}
                            style={{ height: 320, width: 420 }}
                            onResult={(result, error) => {
                                !!result && handleData(result);
                                !!error && handleError(error);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default QRScanner;
