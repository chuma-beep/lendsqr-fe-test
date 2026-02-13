"use client";

import React from "react";
import styles from "../styles/skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}

export function SkeletonRow({ columns = 6 }: { columns?: number }) {
  return (
    <div className={styles.row}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} height="16px" />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 10, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className={styles.table}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} columns={columns} />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <Skeleton width="60px" height="60px" borderRadius="50%" />
      <div className={styles.cardContent}>
        <Skeleton width="120px" height="16px" />
        <Skeleton width="80px" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonUserDetails() {
  return (
    <div className={styles.userDetails}>
      <div className={styles.userDetailsHeader}>
        <Skeleton width="100px" height="20px" />
        <div className={styles.userDetailsButtons}>
          <Skeleton width="120px" height="40px" borderRadius="8px" />
          <Skeleton width="120px" height="40px" borderRadius="8px" />
        </div>
      </div>

      <div className={styles.profileCard}>
        <Skeleton width="80px" height="80px" borderRadius="50%" />
        <div className={styles.profileInfo}>
          <Skeleton width="150px" height="20px" />
          <Skeleton width="100px" height="14px" />
        </div>
        <div className={styles.profileTier}>
          <Skeleton width="80px" height="14px" />
          <div className={styles.stars}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width="16px" height="16px" borderRadius="50%" />
            ))}
          </div>
        </div>
        <div className={styles.profileBank}>
          <Skeleton width="120px" height="20px" />
          <Skeleton width="150px" height="12px" />
        </div>
      </div>

      <div className={styles.navTabs}>
        {["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"].map((tab) => (
          <Skeleton key={tab} width="100px" height="16px" />
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <Skeleton width="150px" height="20px" />
          <div className={styles.grid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton width="80px" height="12px" />
                <Skeleton width="100px" height="14px" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionItem}>
          <Skeleton width="180px" height="20px" />
          <div className={styles.grid}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <Skeleton width="100px" height="12px" />
                <Skeleton width="120px" height="14px" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionItem}>
          <Skeleton width="80px" height="20px" />
          <div className={styles.grid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton width="60px" height="12px" />
                <Skeleton width="80px" height="14px" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionItem}>
          <Skeleton width="80px" height="20px" />
          <div className={styles.grid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton width="80px" height="12px" />
                <Skeleton width="100px" height="14px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
