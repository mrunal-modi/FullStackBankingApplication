import React from "react";
import CardB from "../components/CardB";
import { RenderContent } from "../components/renderContent";

export default function Home() {
  return (
    <div className="home container">
      <div className="row">
        <div className="col-sm-8">
          <CardB
            txtcolor="black"
            header={
              <div>
                Welcome to the Bank
              </div>
            }
            // title="For all your banking needs"
            text="For all your banking needs"
            body="Body"
          />
        </div>

        <div className="col-sm-4">
          <RenderContent instruction_type="Home"/>
        </div>

      </div>
    </div>
  );
}
