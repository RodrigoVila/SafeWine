import React, { useEffect, useState } from 'react';

import Button from '../Buttons/Filled';
import Navbar from '../Navbar';
import useWeb3 from '../../hooks/useWeb3';
import styles from './styles.module.css';
import useIPFS from '../../hooks/useIPFS';

const AddBottle = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isDataUploaded, setDataUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { mint } = useWeb3();
    const {
        fileBUffer,
        handleFileInput,
        uploadFileToIPFS,
        uploadMetadataToIPFS,
    } = useIPFS();

    const clearMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const clearInputs = () => {
        setName('');
        setDescription('');
    };

    const handleSubmit = async (tokenURI: string) => {
        await mint(tokenURI)
            .then(() => {
                setSuccessMessage('Success!');
                setIsLoading(false);
                clearInputs();
            })
            .catch((e) => {
                setErrorMessage(`Error: ${e}`);
                setIsLoading(false);
            });
    };

    const uploadData = async (e) => {
        e.preventDefault();
        if (!name || !description || fileBUffer === []) {
            alert('Every input is mandatory');
            return;
        }
        setIsLoading(true);

        clearMessages();

        await uploadFileToIPFS().then((fileURI) => {
            fileURI !== undefined &&
                uploadMetadataToIPFS(
                    name,
                    description,
                    fileURI.toString()
                ).then((tokenURI) => {
                    tokenURI && handleSubmit(tokenURI);
                });
        });
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.form}>
                    <label className={styles.title}>Add Bottle</label>
                    <label className={styles.label}>Name</label>
                    <input
                        required
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.label}>Description</label>
                    <input
                        required
                        type="text"
                        className={styles.input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className={styles.label}>Select NFT Image</label>
                    <input
                        required
                        type="file"
                        className={styles.input}
                        onChange={(e) => handleFileInput(e)}
                    />

                    {isLoading ? (
                        <Button label="Loading..." onClick={() => {}} />
                    ) : (
                        <Button label="Create" onClick={uploadData} />
                    )}
                </div>
                {errorMessage && (
                    <p className={`${styles.message} ${styles.errorMessage}`}>
                        {errorMessage}
                    </p>
                )}
                {successMessage && (
                    <p className={`${styles.message} ${styles.successMessage}`}>
                        {successMessage}
                    </p>
                )}
            </div>
        </>
    );
};

export default AddBottle;
