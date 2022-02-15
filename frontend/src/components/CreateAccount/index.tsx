import { useEffect, useState, ChangeEvent } from "react";
import Router from "next/router";
import Button from "../Buttons/Filled";
import useWeb3 from "../../hooks/useWeb3";
import styles from "./CreateAccount.module.css";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setSelectedAccountType(event.target.value);

  const createAccount = async () => {
    setErrorMessage("");
    if (!currentAccount) {
      alert("Connect to Metamask First");
      return;
    }

    if (!name || !description || selectedAccountType === "none") {
      setErrorMessage("All inputs required");
      return;
    }

    selectedAccountType === "cellar"
      ? await createCellarAccount(name, description)
      : await createShopAccount(name, description);

    // Router.push("/dashboard");
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
          <Button
            label="Create account"
            onClick={createAccount}
            color="#722f37"
          />
        </div>
        <p className={`${styles.message} ${styles.errorMessage}`}>
          {errorMessage}
        </p>
        <p className={`${styles.message} ${styles.successMessage}`}>
          {successMessage}
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
