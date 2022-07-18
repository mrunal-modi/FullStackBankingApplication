import React, { useContext } from "react";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";
import AppContext from "../components/context";

export default function Home() {
  const { user, setUser } = useContext(AppContext);
  return (
    <div className="home container">
      <div className="row">
        <div className="col-sm-8">
          <CardB
            txtcolor="black"
            header={
              <div>
                Welcome to the Bank {user?.displayName}
              </div>
            }
            // title="For all your banking needs"
            text="For all your banking needs"
          />
        </div>

        <div className="col-sm-4">
          <RenderContent instruction_type="Home"/>
        </div>

      </div>
    </div>
  );
}
