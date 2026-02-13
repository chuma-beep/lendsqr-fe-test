"use client";

import React, {
  FC,
  FunctionComponent,
  ReactComponentElement,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import styles from "../styles/dropdown.module.scss";


const optionsList = ["10", "25", "50", "100"];

const Dropdown = ({
  updatePaginatedResults,
}: {
  updatePaginatedResults: any;
}) => {
  const [resultsPerPage, setResultsPerPage]: [
    resultsPerPage: string | number,
    setResultsPerPage: Function
  ] = useState(localStorage.getItem("resultsPerPage") || 10);
  const [showOptions, setShowOptions]: [
    showOptions: boolean,
    setShowOptions: Function
  ] = useState(false);

  useEffect(() => {
    !resultsPerPage && localStorage.setItem("resultsPerPage", "100");
    updatePaginatedResults(resultsPerPage);
  }, [resultsPerPage]);

  return (
    <div
      className={styles.container}
      data-testid="dropdown"
      id="dropdown"
      onClick={() => setShowOptions(!showOptions)}
    >
      <p data-testid="value">{resultsPerPage}</p>
      <Image src="/dashboard/caret-down.svg" alt="caret-down" width={12} height={12} unoptimized />
      {showOptions && (
        <div className={styles.options}>
          {optionsList.map((option, i) => (
            <p
              key={i}
              onClick={() => {
                localStorage.setItem("resultsPerPage", option),
                  setResultsPerPage(option);
                updatePaginatedResults(option);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;