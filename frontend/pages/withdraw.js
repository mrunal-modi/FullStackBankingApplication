import React, { useState, useContext } from "react";
import Router from "next/router";
import AppContext from "../components/context";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "../components/axios";
import Balance from "../components/balance";

const handleWithdraw = (amount) => {
  console.log(amount);
  return axios.get(`/account/withdraw/${amount}`);
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
            header={<div>Withdraw Amount</div>}
            // title="For all your banking needs"
            text="A withdrawal involves removing funds from a bank account, savings plan, pension, or trust. In some cases, conditions must be met to withdraw funds without penalty, and penalty for early withdrawal usually arises when a clause in an investment contract is broken."
            body={
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Amount:</Label>
                    <Input
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
                    style={{ float: "right", width: 120 }}
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      handleWithdraw(data.amount)
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
          <RenderContent instruction_type="Withdraw" />
        </div>
      </div>
    </div>
  );
}
