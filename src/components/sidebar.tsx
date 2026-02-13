"use client";

import { ReactElement, useState } from "react";
import styles from "../styles/sidebar.module.scss";
import sidebarData from "../data/sidebarLinks.json";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ navState }: { navState: boolean }): ReactElement => {
  return (
    <div
      className={navState ? styles.container : styles.sidebar_closed}
      data-testid="sidebar"
    >
      <div className={styles.uppersection}>
        <div className={styles.section_navlink_org}>
          <Image 
            className={styles.icon}
            src={`/sidebar/organization.png`}
            alt="switch organization"
            height={20}
            width={20}
          />
          <p>Switch Organization</p>
          <Image
           className={styles.icon}
          src={`/sidebar/caret-down.svg`} 
          alt="dropdown" 
          width={10}
          height={6}
           />
          </div>
        <div className={styles.section_navlink}>
          <Image
            width={20}
            height={20}
          className={styles.icon}
           src={`/sidebar/dashboard.svg`}
          alt="dashboard"
           />
          <p>Dashboard</p>
        </div>
      </div>

      {Object.entries(sidebarData).map((navSection: [string, string[]], index) => (
        <div key={index} className={styles.section}>
          <p className={styles.section_header}>{navSection[0]}</p>
          {navSection[1].map((navLink: string, ind: number) => (
            <div
              key={navLink}
              className={
                navLink.toLocaleLowerCase() === "users"
                  ? styles.section_active_navlink
                  : styles.section_navlink
              }
            >
              <Image
                  width={10}
                  height={15}
                className={styles.icon}
                src={`/sidebar/icons/${navLink
                  .toLowerCase()
                  .split(" ")
                  .join("-")}.png`}
                alt={navLink}
              />

              <p>{navLink}</p>
            </div>
          ))}
        </div>
      ))}
      <hr className={styles.divider} />
      <div className={styles.section_navlink_org}>
        <Image
         className={styles.icon}
          src={`/sidebar/logout.svg`} 
           height={20}
           width={20}
          alt="logout" />
        <Link href={"/login"}>
          <p className={styles.logout}>Logout</p>
        </Link>
      </div>
      <p className={styles.version}>v1.2.0</p>
    </div>
  );
};

export default Sidebar;