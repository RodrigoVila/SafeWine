import React from 'react';
import { QrReader } from 'react-qr-reader';
import styles from './QRScanner.module.css';

interface Props {
    handleError: (error: any) => void;
    handleData: (data: any) => void;
}

const QRScanner = ({ handleError, handleData }: Props) => {
    return (
        <>
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
        </>
    );
};

export default QRScanner;
