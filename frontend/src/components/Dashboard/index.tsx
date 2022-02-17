import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Sidebar from '../Sidebar';
import useWeb3 from '../../../src/hooks/useWeb3';
import Product from '../Product';
import FilledButton from '../Buttons/Filled';

const Dashboard = () => {
    const { currentAccount, tokens } = useWeb3();

    const navigate = useNavigate();

    useEffect(() => {
        !currentAccount.address && navigate('/');
    }, [currentAccount.address]);

    useEffect(() => {
        console.log('!tokens', tokens);
    }, [tokens]);

    const parseDate = (epoch: string) => {
        const date = new Date(parseInt(epoch) * 1000).toString();
        const sliced = date.slice(4, 15);
        return sliced;
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <h2 className={styles.title}>Owned bottles by this account:</h2>
                <div className={styles.list}>
                    {tokens.map((token) => {
                        return (
                            <Product
                                key={token.id}
                                name={token.name}
                                description={token.description}
                                uri={token.uri}
                                isValid={token.isAvailable}
                                mintedAt={parseDate(token.mintedAt)}
                                onClick={getOwnerByTokenID(token.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
