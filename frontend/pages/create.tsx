import { useEffect, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import Router from "next/router";
import Button from "../src/components/Button";
import Navbar from "../src/components/Navbar";
import useWeb3 from "../src/hooks/useWeb3";
import styles from "../styles/CreateAccount.module.css";
import EmptyContainer from "../src/components/EmptyContainer";

const CreateAccount: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    currentAccount,
    createCellarAccount,
    createShopAccount,
  } = useWeb3();

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setAccountType(event.target.value);

  const createAccount = async () => {
    setErrorMessage("");
    if (!currentAccount) {
      alert("Connect to Metamask First");
      return;
    }

    if (!name || !description || accountType === "none") {
      setErrorMessage("All inputs required");
      return;
    }

    // if (accountType === "cellar" && !hasCellarAccount) {
    //   setErrorMessage("User already has a Cellar Account");
    //   return;
    // }

    // if (accountType === "shop" && !hasShopAccount) {
    //   setErrorMessage("User already has a Shop Account");
    //   return;
    // }
    accountType === "cellar"
      ? await createCellarAccount(name, description)
      : await createShopAccount(name, description);

    Router.push("/dashboard");
  };

  // useEffect(() => {
  //   hasShopAccount || (hasCellarAccount && Router.push("/dashboard"));
  // }, [third]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <div className={styles.form}>
            <label className={styles.label}>Account Type</label>
            <select
              value={accountType}
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
              type="fill"
            />
            <Button
              type="fill"
              label="currentAccount"
              color="#722f37"
              onClick={() => console.log("currAcc", currentAccount)}
            />
          </div>
          <p className={`${styles.message} ${styles.errorMessage}`}>
            {errorMessage}
          </p>
          <p className={`${styles.message} ${styles.successMessage}`}>
            {successMessage}
          </p>
        </div>
        <EmptyContainer />
      </div>
    </div>
  );
};

export default CreateAccount;
