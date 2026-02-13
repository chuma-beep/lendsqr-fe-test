"use client";

import { ReactNode, useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardHeader";
import Sidebar from "../../components/sidebar";
import layoutStyles from "../../styles/dashboardlayout.module.scss";
import styles from "../../styles/dashboard.module.scss";
import sidebarStyles from "../../styles/sidebar.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 1080;
        setIsMobile(mobile);
        setSidebarOpen(!mobile);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const handleMenuBtn = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={layoutStyles.container}>
      <DashboardHeader onMenuToggle={handleMenuBtn} showMenuBtn={isMobile} sidebarOpen={sidebarOpen} />
      <main className={styles.main_content}>
        <div className={sidebarOpen ? sidebarStyles.container : sidebarStyles.sidebar_closed}>
          <Sidebar navState={sidebarOpen} />
        </div>
        {children}
        {isMobile && sidebarOpen && (
          <div onClick={handleMenuBtn} />
        )}
      </main>
    </div>
  );
}