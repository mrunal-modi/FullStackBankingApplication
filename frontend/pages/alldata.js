import React, { useState, useContext, useEffect } from "react";
import Router from "next/router";
import AppContext from "../components/context";
import axios from "../components/axios";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";
import Table from "../components/table";

export default function AllData(props) {
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const [data, setData] = useState([]);

  function getUsers() {
    axios
      .get(`/account/all`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (user && user.role === "admin") {
      getUsers();
    }
  }, []);

  if (!user || user.role !== "admin") {
    //prevent function from being ran on the server
    if (typeof window !== "undefined") {
      Router.push("/");
    }
    return null;
  }
  // return <div>{JSON.stringify(data)}</div>;

  console.log(data);
  const header = ["Email", "UID", "Role", "Balance"];
  const rows = data?.map((el) => {
    return [el.email, el.uid, el.role, el.balance];
  });
  console.log(rows);

    // [{"email":"bb@bb.com","uid":"CnARL3jb64NwPMwfdgyFn4byKvC3","role":"user","balance":300},

return(
  <div className="alldata container">
      <div className="row">
        <div className="col-sm-8">
          <CardB
            maxWidth="100%"
            txtcolor="black"
            header="All Data"
            title="Admin Access"
            body={
                <Table header={header} rows={rows} />
            }
          />
        </div>
        <div className="col-sm-4">
        <RenderContent instruction_type="AllData"/>
        </div>
      </div>
    </div>
)
}