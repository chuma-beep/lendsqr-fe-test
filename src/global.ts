export type AccountStatus = {
  backgroundColor: string;
  color: string;
};

export type pageNumberState = [number, (value: number | ((prev: number) => number)) => void];
export type userMenuState = [userMenuObject, (value: userMenuObject) => void];
export type userMenuObject = {
  menuId: null | number;
  menuIsOpen: boolean;
};
export type filterProps = {
  left: number;
  children?: React.ReactNode;
};
export type userDetailsState = [object | null, (value: object | null) => void];
export type usersState = [object[], (value: object[]) => void];

export type userObject = {
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
  };
  accountBalance: string;
  accountNumber: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  id: string;
};