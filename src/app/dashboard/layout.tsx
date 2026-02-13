import { ReactNode } from "react";
import DashboardHeader from "../../components/dashboardHeader";
import Sidebar from "../../components/sidebar";
import layoutStyles from "../../styles/dashboardlayout.module.scss";
import styles from "../../styles/dashboard.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={layoutStyles.container}>
      <DashboardHeader />
      <main className={styles.main_content}>
        {/* <main> */}
       <Sidebar navState={true} />
        {children}
      </main>
    </div>
  );
}