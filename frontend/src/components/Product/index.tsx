import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { BsFillPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs';
import useWeb3 from '../../hooks/useWeb3';

interface Props {
    id: string;
    name: string;
    description: string;
    uri: string;
    mintedAt: string;
    onClick: () => void;
}

const Product = ({ id, name, description, uri, mintedAt, onClick }: Props) => {
    const [isTokenValid, setTokenValid] = useState(true);
    const { isValidToken, tokens } = useWeb3();

    useEffect(() => {
        if (id && tokens.length > 0) {
            const getTokenValidity = async () => {
                const valid = await isValidToken(id);
                setTokenValid(valid);
            };
            getTokenValidity();
        }
    }, [id, tokens]);

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.imageContainer}>
                {uri && (
                    <img src={uri} alt="Product" className={styles.image} />
                )}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.title}>{name}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.description}>DoB: {mintedAt}</div>
            </div>
            <div className={styles.validityContainer}>
                {isTokenValid ? (
                    <BsFillPatchCheckFill size={48} color="lightblue" />
                ) : (
                    <BsPatchExclamationFill size={48} color="#ff4444" />
                )}
            </div>
        </div>
    );
};

export default Product;
