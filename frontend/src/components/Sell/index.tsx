import React, { useEffect, useState } from 'react';

import Button from '../Buttons/Filled';
import Sidebar from '../Sidebar';
import QRScanner from '../QRScanner';
import useWeb3 from '../../hooks/useWeb3';
import styles from './Sell.module.css';

const SellBottle = () => {
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
                    <QRScanner
                        handleData={handleData}
                        handleError={handleError}
                    />
                </div>
            </div>
        </div>
    );
};

export default SellBottle;
