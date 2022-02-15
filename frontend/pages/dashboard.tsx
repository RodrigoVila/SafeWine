import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Dashboard.module.css";
import Sidebar from "../src/components/Sidebar";
import Router from "next/router";
import useWeb3 from "../src/hooks/useWeb3";
import Link from "next/link";
import Product from "../src/components/Product";
import FilledButton from "../src/components/Buttons/Filled";

const Dashboard: NextPage = () => {
  const { currentAccount, tokens } = useWeb3();

  useEffect(() => {
    !currentAccount.address && Router.push("/");
  }, [currentAccount]);

  useEffect(() => {
    console.log("!tokens", tokens);
  }, [tokens]);

  const parseDate = (epoch: string) => {
    const date = new Date(parseInt(epoch) * 1000).toString();
    const spliced = date.slice(4, 15);
    return spliced;
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h2 className={styles.title}>Owned bottles by this account:</h2>
        <div className={styles.list}>
          {tokens.map((token) => {
            return (
              <Product
                key={token.id}
                name={token.name}
                description={token.description}
                uri={token.uri}
                isValid={token.isAvailable}
                mintedAt={parseDate(token.mintedAt)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
