import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import { IoMdQrScanner } from 'react-icons/io';
import { SiDatabricks } from 'react-icons/si';
import { BiTransfer } from 'react-icons/bi';
import useWeb3 from '../../hooks/useWeb3';
import { GiWineBottle } from 'react-icons/gi';

const Sidebar = () => {
    const { currentAccount } = useWeb3();

    const trimmedAccount = () => {
        const { address } = currentAccount;
        if (address) {
            const firstSix = address.slice(0, 4);
            const lastSix = address.slice(-6);

            return `${firstSix}....${lastSix}`;
        } else return '';
    };

    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <GiWineBottle size={35} />
                <div className={styles.brandName}>SafeWine</div>
            </div>
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

                        <Link to="/transfer" className={styles.link}>
                            <BiTransfer />
                            <p className={styles.linkText}>Transfer bottle</p>
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
                            <FiMinus />
                            <p className={styles.linkText}>Sell bottle</p>
                        </Link>
                    </>
                )}
            </div>
            <div className={styles.userAccount}>
                {currentAccount && trimmedAccount()}
            </div>
        </div>
    );
};

export default Sidebar;
