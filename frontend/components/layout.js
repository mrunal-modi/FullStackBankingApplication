/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import { logout } from "./auth";
import Logo from "./Logo";
import styles from "../styles/layout.module.css"

const Layout = (props) => {
  const title = "Fullstack MERN Bank Project";
  const { user, setUser } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

        <Nav className="navbar navbar-light bg-light">
          <NavItem className="nav-item">
            <Link className="nav-link" href="/">
              <a className="logo">
                <Logo/>
              </a>
            </Link>
          </NavItem>

          {user && (
          <NavItem className="nav-item">
            <Link className="nav-link" href="/deposit">
            <a className="nav-link DepositPage">Deposit</a>
            </Link>
          </NavItem>)}

          {user && (
          <NavItem className="nav-item">
            <Link className="nav-link" href="/withdraw">
            <a className="nav-link">Withdraw</a>
            </Link>
          </NavItem>)}

          {(user && user.role === "admin") && (
          <NavItem className="nav-item">
            <Link className="nav-link" href="/alldata">
            <a className="nav-link">All Data</a>
            </Link>
          </NavItem>)}

          <NavItem className="ml-auto">
            {user ? (
              <h5 className={styles.Username}>{user.displayName}</h5>
            ) : (
              <Link className="nav-link" href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link className="nav-link" href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link className="nav-link" href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>

      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
