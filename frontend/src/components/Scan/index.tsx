import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import useWeb3 from '../../hooks/useWeb3';

const QRScanner = () => {
    const navigate = useNavigate();

    const { chainError } = useWeb3();

    const handleError = (error: any) => console.error('!rerrrrr', error);

    const handleData = (result: any) => console.log('!resss', result);

    return (
        <>
            <Navbar />
            {!chainError && (
                <div className={styles.container}>
                    <div className={styles.mainContent}>
                        <p className={styles.text}>Place code inside the box</p>
                        <div className={styles.qrContainer}>
                            <QrReader
                                delay={100}
                                style={{ height: 320, width: 420 }}
                                onResult={(result, error) => {
                                    console.log('!!AAAAA', result);
                                    if (!!result) {
                                        console.log(result?.text);
                                    }

                                    if (!!error) {
                                        console.info(error);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QRScanner;
