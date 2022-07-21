import React, { useState, useContext } from "react";
import Router from "next/router";
import AppContext from "../components/context";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import axios from "axios";
import Balance from "../components/balance";
import axios from "../components/axios";


const handleDeposit = (amount) => {
  console.log(amount);
  return axios.get(`/account/update/${amount}`
  );
};

export default function Deposit() {
  const [data, setData] = useState({ amount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  const user = appContext.user;
  if (!user) {
    //prevent function from being ran on the server
    if (typeof window !== "undefined") {
      Router.push("/");
    }
    return(null);
  }
  return (
    <div className="home container">
      <div className="row">
        <div className="col-sm-8">
          
          <CardB
            txtcolor="black"
            header={<div>Deposit Amount</div>}
            // title="For all your banking needs"
            text="Bank deposits consist of money placed into banking institutions for safekeeping. These deposits are made to deposit accounts such as savings accounts, checking accounts, and money market accounts. The account holder has the right to withdraw deposited funds, as set forth in the terms and conditions governing the account agreement."
            body={
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Amount:</Label>
                    <Input
                      className="Amount"
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, amount: e.target.value })
                      }
                      value={data.amount}
                      type="text"
                      name="amount"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <Button
                    className="Deposit-Button"
                    style={{ float: "right", width: 120 }}
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      handleDeposit(data.amount)
                        .then((res) => {
                          // set authed user in global context object
                          // appContext.setUser(res.data.user);
                          setLoading(false);
                          console.log(
                            `res: ${JSON.stringify(res)}`
                          );
                        })
                        .catch((error) => {
                          console.log(`error in register: ${error}`);
                          //setError(error.response.data);
                          setLoading(false);
                        });
                    }}
                  >
                    {loading ? "Loading.." : "Submit"}
                  </Button>
                  
                  <span>Current Balance{<Balance/>}</span>
                </fieldset>
              </Form>
            }
          />
        </div>

        <div className="col-sm-4">
          <RenderContent instruction_type="Deposit" />
        </div>
      </div>
    </div>
  );
}
