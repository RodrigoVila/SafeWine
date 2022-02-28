import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../Button';
import Navbar from '../Navbar';
import useWeb3 from '../../hooks/useWeb3';
import Modal from '../Modal';
import SuccessErrorScreen from '../SuccessError';

const VerifyToken = () => {
    const [isValid, setIsValid] = useState(null);
    const [tokenInfo, setTokenInfo] = useState({});

    let { slug: tokenID } = useParams();

    const { tokens, isValidToken, getTokenByID } = useWeb3();

    useEffect(() => {
        if (tokenID && tokens.length > 0) {
            const getTokenValidity = async () => {
                const valid = await isValidToken(tokenID);
                setIsValid(valid);
            };
            const getTokenInfo = async () => {
                const info = await getTokenByID(tokenID);
                setTokenInfo(info);
            };
            getTokenValidity();
            getTokenInfo();
        }
    }, [tokenID, tokens]);

    useEffect(() => {
        console.log('!!!isValid', isValid);
    }, [isValid]);

    useEffect(() => {
        console.log('!!!tokenInfo', tokenInfo);
    }, [tokenInfo]);

    return (
        <Modal>
            {isValid !== null && (
                <SuccessErrorScreen tokenID={tokenID} isErrorModal={!isValid} />
            )}
        </Modal>
    );
};

export default VerifyToken;
