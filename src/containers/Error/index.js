/*
 * Error container
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import Button from "components/UI/Button";

import s from "./styles.module.scss";

const Error = () => (
  <main role="main" className={s.root}>
    <h3>Oops... The page you were looking for doesn't exist</h3>
    <p>You may have mistyped the address or the page may have moved</p>
    <Button text="Go to Home Page" to="/" />
  </main>
);

export default Error;
