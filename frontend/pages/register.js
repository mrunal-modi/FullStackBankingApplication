/* /pages/register.js */

import React, { useState, useContext } from "react";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";
import { registerUser } from "../components/auth";
import AppContext from "../components/context";
import Card from "../components/Card";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  return (
    <div className="home container">
      <div className="row">
        <div className="col-sm-8">
          <CardB
            txtcolor="black"
            header={
              <div>
                Create Account
              </div>
            }
            // title="For all your banking needs"
            text="Explore our range of bank accounts including everyday and savings accounts, to help you stay on track and in control of your money."
            body={
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading}
                      onClick={() => {
                        setLoading(true);
                        registerUser(data.username, data.email, data.password)
                          .then((res) => {
                            // set authed user in global context object
                            appContext.setUser(res.user);
                            console.log(res);
                            setLoading(false);
                            console.log(`registered user: ${JSON.stringify(res.user)}`);
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
                  </FormGroup>
                </fieldset>
              </Form>
            }
          />
        </div>

        <div className="col-sm-4">
          <RenderContent instruction_type="Create"/>
        </div>

      </div>
    </div>
  );
};
export default Register;
