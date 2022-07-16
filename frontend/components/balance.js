import React, { useState, useContext } from "react";
import AppContext from "../components/context";
import axios from "../components/axios";

export default function Balance(props) {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [balance, setBalance] = useState(0);

  function getBalance(uuid) {
    if (uuid) {
      axios
        .get(`/account/findOne/`)
        .then((res) => {
          console.log(res.data.balance);
          setBalance(res.data.balance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getBalance(user?.uid);

  return <div>{balance && <p>{balance}</p>}</div>;
}
