import { useState, ChangeEvent } from 'react';
import styles from './styles.module.css';
import Button from '../Button';

interface Props {
    currentAccount: string | object;
    createCellarAccount: (name: string, description: string) => void;
    createShopAccount: (name: string, description: string) => void;
}

const CreateAccount = ({
    currentAccount,
    createCellarAccount,
    createShopAccount,
}: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccountType, setSelectedAccountType] = useState('none');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
        setSelectedAccountType(event.target.value);

    const createAccount = async () => {
        setIsLoading(true);
        setErrorMessage('');
        if (!currentAccount) {
            alert('Connect to Metamask First');
            return;
        }

        if (!name || !description || selectedAccountType === 'none') {
            setErrorMessage('All inputs required');
            return;
        }

        selectedAccountType === 'cellar'
            ? await createCellarAccount(name, description)
            : await createShopAccount(name, description);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.form}>
                    <label className={styles.title}>Create Account</label>
                    <label className={styles.label}>Account Type</label>
                    <select
                        value={selectedAccountType}
                        className={styles.dropdown}
                        onChange={handleSelect}
                        placeholder="Select an option"
                    >
                        <option disabled value="none">
                            Select an option
                        </option>
                        <option value="cellar">Cellar</option>
                        <option value="shop">Shop</option>
                    </select>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.label}>Description</label>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {isLoading ? (
                        <Button label="Loading..." onClick={() => {}} />
                    ) : (
                        <Button
                            label="Create account"
                            onClick={createAccount}
                            color="#722f37"
                        />
                    )}
                </div>
                <p className={`${styles.message} ${styles.errorMessage}`}>
                    {errorMessage}
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;
