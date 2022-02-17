import { useState, useEffect } from "react";
import styles from "./Product.module.css";
import { BsFillPatchCheckFill, BsPatchExclamation } from "react-icons/bs";
import { getProductImage } from "../../services";

interface Props {
    name: string;
    description: string;
    uri: string;
    isValid: boolean;
    mintedAt: string;
    onClick: () => void;
}

const Product = ({
    name,
    description,
    uri,
    isValid,
    mintedAt,
    onClick,
}: Props) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const getImage = async () => {
            if (uri) {
                const url = await getProductImage(uri);
                setImageUrl(url);
            }
        };
        getImage();
    }, [uri]);

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.image}>
                {imageUrl && <image src={imageUrl} width={150} height={150} />}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.title}>{name}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.description}>Minted At: {mintedAt}</div>
            </div>
            <div className={styles.validityContainer}>
                {isValid ? (
                    <BsFillPatchCheckFill size={48} />
                ) : (
                    <BsPatchExclamation size={48} />
                )}
            </div>
        </div>
    );
};

export default Product;
