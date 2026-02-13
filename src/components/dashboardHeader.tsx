"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/dashboard-header.module.scss";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  showMenuBtn?: boolean;
  sidebarOpen?: boolean;
}

export default function DashboardHeader({ onMenuToggle, showMenuBtn, sidebarOpen }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.container} data-testid="header">
      <Image
        className={styles.logo}
        src="/dashboard/logo-and-text.svg"
        width={150}
        height={140}
        alt="lendsqr-logo"
        onClick={() => router.push("/dashboard")}
        unoptimized
      />
      
      <div className={styles.searchbox} data-testid="search-box">
        <input type="text" name="search" placeholder="Search for anything" />
        <button type="button">
          <Image src="/dashboard/search-icon.svg" alt="search-icon" width={14} height={14} unoptimized />
        </button>
      </div>
      
      <div className={styles.toolsbox}>
        <Link href="#">Docs</Link>
        <Image 
          className={styles.bell} 
          src="/dashboard/notification-bell.svg" 
          alt="bell-icon" 
          width={26} 
          height={26} 
          unoptimized
        />
        <div className={styles.user_account}>
          <div className={styles.avatar_cont}>
          <Image 
            className={styles.avatar} 
            src="/dashboard/avatar.svg" 
            alt="avatar-image" 
            width={48} 
            height={48} 
            unoptimized
          />
          </div>
          <p className={styles.username}>Adedeji</p>
          <Image
            className={styles.arrow_down}
            src="/dashboard/arrow-down.svg"
            alt="dropdown-arrow"
            width={8}
            height={6}
            unoptimized
          />
        </div>
        {showMenuBtn && (
          <button className={styles.menu_btn} onClick={onMenuToggle} title={sidebarOpen ? "Close Menu" : "Open Menu"}>
            {sidebarOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}