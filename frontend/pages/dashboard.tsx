import { MouseEvent, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Dashboard.module.css";
import Navbar from "../src/components/Navbar";
import EmptyContainer from "../src/components/EmptyContainer";
import Button from "../src/components/Button";
import Router from "next/router";
import useWeb3 from "../src/hooks/useWeb3";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const { currentAccount } = useWeb3();

  const handleScanPress = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/scan");
  };

  const handleCreateBottle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/add");
  };

  const handleDeleteBottle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/delete");
  };

  const handleChangeOwnershop = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/ownership");
  };

  const handleSellBottle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Router.push("/sell");
  };

  useEffect(() => {
    console.log("curr", currentAccount.address);
    !currentAccount.address && Router.push("/");
  }, [currentAccount]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <div className={styles.buttons}>
            {currentAccount?.type === "cellar" && (
              <>
                <Button
                  label="Scanner"
                  type="outline"
                  size="lg"
                  onClick={handleScanPress}
                />
                <Button
                  label="Create Bottle"
                  type="outline"
                  size="lg"
                  onClick={handleCreateBottle}
                />
                <Button
                  label="Delete Bottle"
                  type="outline"
                  size="lg"
                  onClick={handleDeleteBottle}
                />
                <Button
                  label="Change Bottle ownershop"
                  type="outline"
                  size="lg"
                  onClick={handleChangeOwnershop}
                />
              </>
            )}
            {currentAccount?.type === "shop" && (
              <>
                <Button
                  label="Scanner"
                  type="outline"
                  size="lg"
                  onClick={handleScanPress}
                />
                <Button
                  label="Sell Bottle"
                  type="outline"
                  size="lg"
                  onClick={handleSellBottle}
                />
              </>
            )}
          </div>
        </div>
        <EmptyContainer />
      </div>
    </div>
  );
};

export default Dashboard;
