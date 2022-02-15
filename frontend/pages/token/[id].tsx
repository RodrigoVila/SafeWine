import React from "react";
import { useRouter } from "next/router";

const Token = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <div>{pid}</div>;
};

export default Token;
