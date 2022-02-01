import { MouseEvent } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Navbar from "../src/components/Navbar";
import EmptyContainer from "../src/components/EmptyContainer";
import Button from "../src/components/Button";
import Router from "next/router";
import useWeb3 from "../src/hooks/useWeb3";

const Home: NextPage = () => {
  const { currentAccount, getAcounts } = useWeb3();

  const createAcount = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/create");
  };

  const goToDashboard = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>SafeWine</h1>
            <p className={styles.description}>
              Exclusive birth certificates for each produced bottle
            </p>
            <p className={styles.description}>
              Avoid counterfeit and bring trust to your customers
            </p>
            <div className={styles.buttons}>
              {currentAccount?.address && !currentAccount?.name && (
                <Button
                  label="Create account"
                  type="outline"
                  size="lg"
                  onClick={createAcount}
                />
              )}

              {currentAccount?.name && (
                <Button
                  label="Go to Dashboard"
                  color="#722f37"
                  size="lg"
                  onClick={goToDashboard}
                />
              )}
            </div>
          </div>
        </div>
        <EmptyContainer />
      </div>
    </div>
  );
};

export default Home;
