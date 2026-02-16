"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/dashboard.module.scss";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import Link from "next/link";
import Image from "next/image";
import usersSummary from "../../data/usersSummary.json";
import {
  pageNumberState,
  userMenuObject,
  userMenuState,
  userObject,
} from "../../global";
import UserStatus from "../../components/userStatus";
import { formatDate, handleUserMenu } from "../../lib/dashboard";
import Dropdown from "../../components/dropDown";
import FilterForm from "../../components/filterForm";
import Skeleton, { SkeletonTable } from "@/components/Skeleton";

const Dashboard = () => {
  const [pageNumber, setPageNumber]: pageNumberState = useState(1);
  const [userMenu, setUserMenu]: userMenuState = useState<userMenuObject>({
    menuId: null,
    menuIsOpen: false,
  });
  const [paginatedResults, setPaginatedResults]: [
    resultsPerPage: number | string,
    setResultsPerPage: Function
  ] = useState<number | string>(10);
  const [showFilter, setShowFilter] = useState<{
    currentTab: string;
    showFilter: boolean;
  }>({ currentTab: "", showFilter: false });
  const currentUserMenuIndex: { current: null | number } = useRef(null);
  const filterPosition = useRef(20);
  const pageRef = useRef<HTMLDivElement>(null);
  const [usersToDisplay, setUsersToDisplay] = useState<userObject[]>([]);
  const { users, pages, isLoading, error } = useFetchUsers();

  useEffect(() => {
    const stored = localStorage.getItem("resultsPerPage");
    if (stored) {
      setPaginatedResults(stored);
    }
  }, []);

  const handleFilter: Function = (e: any, currentTab: string): void => {
    userMenu.menuIsOpen && setUserMenu({ menuId: null, menuIsOpen: false });
    filterPosition.current =
      pageRef.current 
        ? e.clientX - (pageRef.current.offsetLeft + (900 / 1440) * 100)
        : 0;
    console.log(e);

    if (showFilter.showFilter === false) {
      setShowFilter({
        currentTab,
        showFilter: true,
      });
    } else if (showFilter.showFilter === true) {
      if (currentTab === showFilter.currentTab) {
        return setShowFilter({
          currentTab,
          showFilter: false,
        });
      }
      return setShowFilter({
        currentTab,
        showFilter: true,
      });
    }
  };
  const [totalPages, setTotalPages]: [
    totalPages: number,
    setTotalPages: Function
  ] = useState(
    Math.ceil(users.length / parseInt(String(paginatedResults), 10))
  );


  const updatePaginatedResults: CallableFunction = (value: string) =>
    setPaginatedResults(value);

  const paging: (number | string)[] = useMemo(() => {
    let pagingArray: any = [1, 2, "...", 9, 10];
    if (pageNumber === 1) pagingArray = [1, 2, "...", 9, 10];
    if (pageNumber === 2) pagingArray = [1, 2, 3, "...", 9, 10];
    if (pageNumber === 3) pagingArray = [1, 2, 3, 4, "...", 9, 10];
    if (pageNumber === 4) pagingArray = [1, "...", 3, 4, 5, "...", 10];
    if (pageNumber === 5) pagingArray = [1, "...", 4, 5, 6, "...", 10];
    if (pageNumber === 6) pagingArray = [1, "...", 5, 6, 7, "...", 10];
    if (pageNumber === 7) pagingArray = [1, "...", 6, 7, 8, "...", 10];
    if (pageNumber === 8) pagingArray = [1, 2, "...", 7, 8, 9, 10];
    if (pageNumber === 9) pagingArray = [1, 2, "...", 8, 9, 10];
    if (pageNumber === 10) pagingArray = [1, 2, "...", 9, 10];

    return pagingArray;
  }, [pageNumber]);

  // Event listeners for filter and user popup menu
  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      const path: any[] = e.composedPath();

      // Close filter if user clicks on any part of the screen that is not the pop-up menu or the user menu button
      if (
        path.some((element) => element.id === "filter") ||
        path.some((element) => element.id === "table_head")
      ) {
        return;
      } else {
        setShowFilter({ currentTab: "", showFilter: false });
      }

      // Close user menu if user clicks on any part of the screen that is not the pop-up menu or the user menu button
      if (
        path.some((element) => element.id === "user_menu") ||
        path.some((element) => element.id === "user_menu_btn")
      ) {
        return;
      } else {
        setUserMenu({ menuId: null, menuIsOpen: false });
      }
    });

    return () => {
      document.removeEventListener("click", (e: Event) => {
        const path: any[] = e.composedPath();

        if (
          userMenu.menuIsOpen === true &&
          path.some((element) => element?.id === "user_menu")
        )
          return;

        // Close user menu if user clicks on any part of the screen that is not the pop-up menu or the user menu button
        userMenu.menuIsOpen === true &&
          !path.some((element) => element?.id === "user_menu_btn") &&
          setUserMenu({ menuId: null, menuIsOpen: false });
      });
    };
  }, []);

  useEffect(() => {
    const startingPosition =
      pageNumber <= 1
        ? 0
        : (pageNumber - 1) * parseInt(String(paginatedResults)) - 1;
    setUsersToDisplay(
      users.slice(
        startingPosition,
        startingPosition + parseInt(String(paginatedResults))
      )
    );
    setTotalPages(
      Math.ceil(users.length / parseInt(String(paginatedResults), 10))
    );
  }, [users, pageNumber, paginatedResults]);

  useEffect(() => {
    setPageNumber(1);
  }, [paginatedResults]);

  return (
    <div data-testid="dashboard">
      {isLoading && (
        <div className={styles.dashboardWrapper}>
          <div className={styles.pageContainer}>
            <p className={styles.pageTitle}>Users</p>
            <div className={styles.summaryContainer}>
              <div className={styles.summaryGrid}>
                {[1, 2, 3, 4].map((info, index) => (
                  <div key={index} className={styles.summaryCard}>
                    <Skeleton width="40px" height="40px" />
                    <div className={styles.summaryCardText}>
                      <Skeleton width="80px" height="12px" />
                      <Skeleton width="60px" height="16px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SkeletonTable rows={10} columns={6} />
          </div>
        </div>
      )}
      {error && (
        <div className={styles.pageContainer}>
          <p>{error}</p>
        </div>
      )}

      {/* Display dashboard */}
      {users && users.length > 0 && (
        <div className={styles.dashboardWrapper}>
          <div className={styles.pageContainer} ref={pageRef}>
            <p className={styles.pageTitle}>Users</p>

            {/* Users summary section */}
            <div className={styles.summaryContainer}>
              <div className={styles.summaryGrid}>
                {usersSummary.map((info, index) => (
                  <div key={index} className={styles.summaryCard}>
                    <div
                      className={styles.iconContainer}
                    >
                      <Image
                        width={30}
                        height={30}
                        src={`/account_summary/${info.summary_name
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("-")}.png`}
                        alt="icon"
                      />
                    </div>
                    <p className={styles.summaryLabel}>{info.summary_name}</p>
                    <p className={styles.summaryValue}>
                      {info.value.toLocaleString("en-US")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Users table */}

            <div className={styles.tableContainer} data-testid="users-table">
              <div className={styles.table}>
                {/* Filter form */}
                {showFilter.showFilter && (
                  <FilterForm left={filterPosition.current} />
                )}

                {/* Users table */}
                <table cellSpacing={0} role="table">
                  <tr>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "organization")}
                        id="table_head"
                      >
                        organization
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "username")}
                        id="table_head"
                      >
                        username
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "email")}
                        id="table_head"
                      >
                        email
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "phone number")}
                        id="table_head"
                      >
                        phone number
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "date joined")}
                        id="table_head"
                      >
                        date joined
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={(e) => handleFilter(e, "status")}
                        id="table_head"
                      >
                        status
                                  <Image
                                   width={12}
                                   height={12}
                                   alt="table head icon"
                                   src="/dashboard/table-head-icon.svg"
                                   unoptimized />
                      </span>
                    </th>
                    <th className={styles.actionHeader}></th>
                  </tr>
                  <tbody data-testid="table-body">
                    {usersToDisplay.map((user: userObject, index: number) => (
                      <Fragment key={index}>
                        <tr
                          style={{
                            boxShadow: "0 1px rgba(33, 63, 125, 0.1)",
                          }}
                        >
                          <td>
                            <span
                              className={[
                                styles.tableData,
                                styles.organizationName,
                              ].join(" ")}
                            >
                              {user.orgName}
                            </span>
                          </td>
                          <td>
                            <Link href={`/dashboard/users/${user.id}`} className={styles.usernameLink}>
                              <span className={styles.tableData}>
                                {user.userName}
                              </span>
                            </Link>
                          </td>
                          <td>
                            <span className={styles.tableData}>
                              {user.email}
                            </span>
                          </td>
                          <td>
                            <span className={styles.tableData}>
                              {user.phoneNumber}
                            </span>
                          </td>
                          <td>
                            <span className={styles.tableData}>
                              {formatDate(new Date(user.createdAt))}
                            </span>
                          </td>
                          <td>
                            <span className={styles.tableData}>
                              <UserStatus />
                            </span>
                          </td>
                          <td
                            className={`${styles.actionButtonColumn} ${styles.actionCell}`}
                        
      >
                            {/* User menu */}
                            {userMenu.menuId === index &&
                              userMenu.menuIsOpen && (
                                <div
                                  className={styles.userMenu}
                                  id="user_menu"
                                >
                                  <Link href={`/dashboard/users/${user.id}`}>
                                    <p>
                                        <Image
                                      width={14}
                                      height={14}
                                      alt="view icon"
                                        src="/dashboard/view.svg"
                                        unoptimized />
                                      <span className={styles.linkText}>
                                        View Details
                                      </span>
                                    </p>
                                  </Link>
                                  <p>
                                      <Image
                                       width={14}
                                       height={14}
                                       alt="blacklist icon"
                                       src="/dashboard/blacklist.svg"
                                       unoptimized />
                                    <span>Blacklist User</span>
                                  </p>
                                  <p>
                                      <Image
                                       width={14}
                                       height={14}
                                       alt="activate icon"
                                       src="/dashboard/activate.svg"
                                       unoptimized />
                                    <span>Activate User</span>
                                  </p>
                                </div>
                              )}
                            <button
                              id="user_menu_btn"
                              data-index={index}
                              onClick={() => {
                                currentUserMenuIndex.current = index;
                                showFilter.showFilter &&
                                  setShowFilter({
                                    currentTab: "",
                                    showFilter: false,
                                  });
                                setUserMenu(handleUserMenu(index, userMenu));
                              }}
                            >
                                 <Image
                                  width={14}
                                  height={14}
                                  alt="more details"
                                  src="/dashboard/user-details-icon.svg"
                                  unoptimized
                               />
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Bar */}
            <div className={styles.paginationBar}>
              <div className={styles.pageResults}>
                <span>Showing</span>{" "}
                <Dropdown updatePaginatedResults={updatePaginatedResults} />{" "}
                <span>out of 100</span>
              </div>
              <div className={styles.paginationControls}>
                <div
                  className={
                    pageNumber === 1
                      ? styles.paginationButton
                      : styles.paginationButtonActive
                  }
                  onClick={() =>
                    pageNumber > 1 && setPageNumber((prev: number) => prev - 1)
                  }
                >
                  <Image className={styles.caretLeft} src="/dashboard/caret-down.svg" alt="previous" width={24} height={24} unoptimized />
                </div>
                <div className={styles.pageNumbersContainer}>
                  {totalPages < 5 ? (
                    Array(
                      Math.ceil(
                        users.length / parseInt(String(paginatedResults), 10)
                      )
                    )
                      .fill(0)
                      .map((_, i) => (
                        <button
                          key={i}
                          className={
                            pageNumber === i + 1
                              ? styles.pageNumberButtonActive
                              : styles.pageNumberButton
                          }
                          onClick={(e: React.MouseEvent<HTMLElement>) =>
                            setPageNumber(
                              parseInt((e.target as any).textContent)
                            )
                          }
                        >
                          {i + 1}
                        </button>
                      ))
                  ) : (
                    <div className={styles.pageNumbersContainer}>
                      {paging.map((p, i) => (
                        <button
                          key={i}
                          className={
                            p === "..."
                              ? styles.ellipses
                              : p === pageNumber
                              ? styles.pageNumberButtonActive
                              : styles.pageNumberButton
                          }
                          onClick={(e: React.MouseEvent<HTMLElement>) =>
                            setPageNumber(
                              parseInt((e.target as any).textContent)
                            )
                          }
                          disabled={p === "..." ? true : false}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className={
                    pageNumber + 1 >
                    Math.ceil(
                      users.length / parseInt(String(paginatedResults), 10)
                    )
                      ? styles.paginationButton
                      : styles.paginationButtonActive
                  }
                  onClick={() => {
                    pageNumber + 1 <=
                      Math.ceil(
                        users.length / parseInt(String(paginatedResults), 10)
                      ) && setPageNumber((prev: number) => prev + 1);
                  }}
                >
                  <Image className={styles.caretRight} src="/dashboard/caret-down.svg" alt="next" width={24} height={24} unoptimized />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;