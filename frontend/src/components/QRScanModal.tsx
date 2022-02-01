import QrReader from "react-qr-scanner";
import styles from "../../styles/QRScanModal.module.css";
import Button from "./Button";

interface Props {
  handleData: (data: any) => void;
  handleError: (error: any) => void;
  onCloseModal: () => void;
}

const QRScanModal = ({ handleData, handleError, onCloseModal }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.text}>Place code inside the box</p>
        <div className={styles.qrContainer}>
          <QrReader
            delay={100}
            style={{ height: 320, width: 420 }}
            onError={handleError}
            onScan={handleData}
          />
        </div>
        <div className={styles.button}>
          <Button label="Close Modal" type="outline" onClick={onCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default QRScanModal;
