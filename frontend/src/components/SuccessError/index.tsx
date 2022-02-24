import React from 'react';
import styles from './styles.module.css';
import { GoVerified } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { ImSad2 } from 'react-icons/im';

interface Props {
    isErrorModal?: boolean;
    toggleModal: () => void;
}

const SuccessErrorScreen = ({ toggleModal, isErrorModal = false }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {isErrorModal ? (
                    <ImSad2 size={100} />
                ) : (
                    <GoVerified size={100} />
                )}
                <div className={styles.closeIcon} onClick={toggleModal}>
                    <IoMdClose size={35} />
                </div>
                <div className={styles.title}>
                    {isErrorModal ? 'Oh dear!' : 'Success!'}
                </div>
                <div className={styles.description}>
                    {isErrorModal
                        ? "We can't verify this is authentic."
                        : 'We can verify that this bottle is authentic!'}
                </div>
                <div className={styles.list}>
                    <div className={styles.item}>
                        Proccessed At: --Cellar Info --
                    </div>
                    <div className={styles.item}>
                        Birth date: --Date Info--.
                    </div>
                    <div className={styles.item}>
                        Current owner is --Owner info--
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessErrorScreen;
