import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import useWeb3 from '../../../src/hooks/useWeb3';
import Product from '../Product';
import FilledButton from '../Buttons/Filled';
import QRModal from '../Modal';
import QRCode from 'react-qr-code';
import Modal from '../Modal';
import QRScanner from '../QRScanner';
import SuccessErrorScreen from '../SuccessError';

const Dashboard = () => {
    const [isQRModalShown, setShowQRModal] = useState(false);
    const [isQRScannerModalOpen, setQRScannerModalOpen] = useState(false);
    const [isSuccessErrorModalOpen, setSuccessErrorModalOpen] = useState(false);
    const [QRData, setQRData] = useState(null);
    const [errorData, setErrorData] = useState(null);

    const handleData = (data: any) => setQRData(data);
    const handleError = (error: any) => setErrorData(error);
    const [tokenURI, setTokenURI] = useState('');
    const { tokens } = useWeb3();

    const parseDate = (epoch: string) => {
        const date = new Date(parseInt(epoch) * 1000).toString();
        const sliced = date.slice(4, 15);
        return sliced;
    };

    const toggleShowQRModal = () => setShowQRModal(!isQRModalShown);
    const toggleSuccessErrorModal = () =>
        setSuccessErrorModalOpen(!isSuccessErrorModalOpen);

    const handleModal = (tokenID: string) => {
        const url = `http://localhost:3000/token/${tokenID}`;
        setTokenURI(url);
        toggleShowQRModal();
    };

    return (
        <>
            {isSuccessErrorModalOpen && (
                <Modal toggleModal={toggleSuccessErrorModal}>
                    <SuccessErrorScreen toggleModal={toggleSuccessErrorModal} />
                </Modal>
            )}
            {isQRModalShown && tokenURI && (
                <Modal toggleModal={toggleShowQRModal}>
                    <QRCode value={tokenURI} />
                    <p style={{ color: '#fff' }}>{tokenURI}</p>
                </Modal>
            )}
            <>
                <Navbar />
                <div className={styles.container}>
                    <div className={styles.mainContent}>
                        <h2 className={styles.title}>
                            {tokens.length > 0
                                ? 'Owned bottles by this account:'
                                : "This account doesn't owe any token"}
                        </h2>
                        <div className={styles.list}>
                            {tokens.map((token) => {
                                return (
                                    <Product
                                        key={token.id}
                                        id={token.id}
                                        name={token.name}
                                        description={token.description}
                                        uri={token.uri}
                                        mintedAt={parseDate(token.mintedAt)}
                                        onClick={() => handleModal(token.id)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default Dashboard;
