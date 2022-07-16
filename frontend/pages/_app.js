// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout"


function MyApp(props){
  var {user, setUser} = useContext(AppContext)
  const [state,setState] = useState({});
  const { Component, pageProps } = props;
  
  
  setUser = (user) => {
    setState({ user,  isAuthenticated: user ? true : false});
  };

  return (
    // We are using state as values to the context so that we can have dynamic values as compared to static values!
    <AppContext.Provider value={{user:state.user, isAuthenticated:state.isAuthenticated, setUser:setUser}}>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
    
      <Layout>
          <Component {...pageProps} />
      </Layout>

    </AppContext.Provider>
  );
  
}


export default MyApp;
