import { useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import useWeb3 from '../../../src/hooks/useWeb3';
import Product from '../Product';
import Modal from '../Modal';

const Dashboard = () => {
    const [isQRModalShown, setShowQRModal] = useState(false);
    const [tokenURI, setTokenURI] = useState('');

    const { tokens, chainError } = useWeb3();

    const parseDate = (epoch: string) => {
        const date = new Date(parseInt(epoch) * 1000).toString();
        const sliced = date.slice(4, 15);
        return sliced;
    };

    const toggleShowQRModal = () => setShowQRModal(!isQRModalShown);

    const handleModal = (tokenID: string) => {
        const url = `/token/${tokenID}`;
        setTokenURI(url);
        toggleShowQRModal();
    };

    return (
        <>
            {isQRModalShown && tokenURI && (
                <Modal toggleModal={toggleShowQRModal}>
                    <div className={styles.modalContainer}>
                        <QRCode value={tokenURI} />
                        <Link to={tokenURI} className={styles.link}>
                            {`http://localhost:3000${tokenURI}`}
                        </Link>
                    </div>
                </Modal>
            )}
            <>
                <Navbar />
                {!chainError && (
                    <div className={styles.container}>
                        <div className={styles.mainContent}>
                            <h2 className={styles.title}>
                                {tokens.length > 0 &&
                                    'Owned bottles by this account:'}
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
                                            onClick={() =>
                                                handleModal(token.id)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
};

export default Dashboard;
