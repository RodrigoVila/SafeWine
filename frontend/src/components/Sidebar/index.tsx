import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { FiUsers, FiMinus } from 'react-icons/fi';
import { IoMdQrScanner } from 'react-icons/io';
import { GoGift } from 'react-icons/go';
import { SiDatabricks } from 'react-icons/si';
import useWeb3 from '../../hooks/useWeb3';
import AddressAndBrandInfo from '../AddressAndBrandInfo';

const Sidebar = () => {
    const { currentAccount } = useWeb3();

    const createAccount = () => {};

    return (
        <div className={styles.container}>
            <AddressAndBrandInfo />
            <div className={styles.navLinks}>
                {currentAccount?.type === 'cellar' && (
                    <>
                        <Link to="/dashboard" className={styles.link}>
                            <SiDatabricks />
                            <p className={styles.linkText}>Dashboard</p>
                        </Link>
                        <Link to="/scan" className={styles.link}>
                            <IoMdQrScanner />
                            <p className={styles.linkText}>Scan</p>
                        </Link>
                        <Link to="/add" className={styles.link}>
                            <BsPlusLg />
                            <p className={styles.linkText}>Add bottle</p>
                        </Link>
                        <Link to="/delete" className={styles.link}>
                            <FiMinus />
                            <p className={styles.linkText}>Delete bottle</p>
                        </Link>
                        <Link to="/ownership" className={styles.link}>
                            <FiUsers />
                            <p className={styles.linkText}>Change ownership</p>
                        </Link>
                    </>
                )}
                {currentAccount?.type === 'shop' && (
                    <>
                        <Link to="/dashboard" className={styles.link}>
                            <SiDatabricks />
                            <p className={styles.linkText}>Dashboard</p>
                        </Link>
                        <Link to="/scan" className={styles.link}>
                            <IoMdQrScanner />
                            <p className={styles.linkText}>Scan</p>
                        </Link>
                        <Link to="/sell" className={styles.link}>
                            <GoGift />
                            <p className={styles.linkText}>Sell bottle</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
