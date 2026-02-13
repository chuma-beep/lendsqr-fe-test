"use client";

import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  handleMenuBtn?: () => void;
  navState?: boolean;
  [key: string]: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  handleMenuBtn,
  navState,
  ...props
}) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export default DashboardLayout;