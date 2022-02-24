import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../Buttons/Filled';
import useWeb3 from '../../hooks/useWeb3';
import AddressAndBrandInfo from '../AddressAndBrandInfo';
import CreateAccount from '../CreateAccount';

const Home = () => {
    const [isCreateAccount, setCreateAccount] = useState(false);
    const {
        currentAccount,
        connectToMetamask,
        createCellarAccount,
        createShopAccount,
    } = useWeb3();

    const toggleCreateAccount = () => setCreateAccount(!isCreateAccount);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.title}>SafeWine</p>
                <p className={styles.description}>
                    Exclusive birth certificates for each produced bottle
                </p>
                <p className={styles.description}>
                    Avoid counterfeit and bring trust to your customers
                </p>
                <div className={styles.buttons}>
                    {!currentAccount?.address ? (
                        <>
                            <Button
                                label="Connect to Metamask"
                                color="#722f37"
                                size="lg"
                                onClick={connectToMetamask}
                            />
                        </>
                    ) : currentAccount?.name ? (
                        <Link to="/dashboard">
                            <Button
                                label="Go to Dashboard"
                                size="lg"
                                onClick={() => {}}
                            />
                        </Link>
                    ) : isCreateAccount ? (
                        <CreateAccount
                            currentAccount={currentAccount}
                            createCellarAccount={createCellarAccount}
                            createShopAccount={createShopAccount}
                        />
                    ) : (
                        <Button
                            label="Create account"
                            size="lg"
                            onClick={toggleCreateAccount}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
