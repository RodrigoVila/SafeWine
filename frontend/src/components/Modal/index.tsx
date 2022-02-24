import styles from './styles.module.css';

interface Props {
    children: any;
    toggleModal: () => void;
}

const Modal = ({ children, toggleModal }: Props) => {
    return (
        <div className={styles.container} onClick={toggleModal}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
