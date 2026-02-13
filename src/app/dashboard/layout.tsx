import { ReactNode } from "react";
import DashboardHeader from "../../components/dashboardHeader";
import Sidebar from "../../components/sidebar";
import styles from "../../styles/dashboard.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <main className={styles.main_content}>
        <Sidebar navState={true} />
        {children}
      </main>
    </div>
  );
}