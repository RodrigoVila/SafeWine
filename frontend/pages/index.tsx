import { MouseEvent, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Button from "../src/components/Buttons/Filled";
import Router from "next/router";
import useWeb3 from "../src/hooks/useWeb3";
import AddressAndBrandInfo from "../src/components/AddressAndBrandInfo";
import CreateAccount from "../src/components/CreateAccount";
import { Spinner } from "../src/utils/Spinner";

const Home: NextPage = () => {
  const [isCreateAccount, setCreateAccount] = useState(false);
  const {
    currentAccount,
    connectToMetamask,
    createCellarAccount,
    createShopAccount,
  } = useWeb3();

  // const currentAccount = { address: "", name: "" };

  const goToDashboard = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/dashboard");
  };

  const toggleCreateAccount = () => setCreateAccount(!isCreateAccount);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>SafeWine</p>
        <p className={styles.description}>
          Exclusive birth certificates for each produced bottle
        </p>
        <p className={styles.description}>
          Avoid counterfeit and bring trust to your customers
        </p>
        <div className={styles.buttons}>
          {!currentAccount?.address ? (
            <>
              <Button
                label="Connect to Metamask"
                color="#722f37"
                size="lg"
                onClick={connectToMetamask}
              />
            </>
          ) : currentAccount?.name ? (
            <Button label="Go to Dashboard" size="lg" onClick={goToDashboard} />
          ) : isCreateAccount ? (
            <CreateAccount
              currentAccount={currentAccount}
              createCellarAccount={createCellarAccount}
              createShopAccount={createShopAccount}
            />
          ) : (
            <Button
              label="Create account"
              size="lg"
              onClick={toggleCreateAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
