"use client";

import { ReactElement, useRef } from "react";
import accountStatus from "../data/accountStatus.json";
import { handleStatusStyles } from "../lib/dashboard";
import styles from "../styles/user-status.module.scss";

const UserStatus = (): ReactElement => {
  const length: number = accountStatus.length;
  const randomNumber: { current: number } = useRef(
    Math.floor(Math.random() * length)
  );

  const statusClass = handleStatusStyles(accountStatus[randomNumber.current]);

  return (
    <div className={`${styles.container} ${statusClass}`}>
      <span className={statusClass} data-testid="status">
        {accountStatus[randomNumber.current]}
      </span>
    </div>
  );
};

export default UserStatus;