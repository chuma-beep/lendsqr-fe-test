import { useEffect, useState } from "react";
import { usersState, userObject } from "../global";
import { calculatePages } from "../lib/dashboard";

export const useFetchUsers: Function = (): object => {
  const [users, setUsers]: usersState = useState<object[]>([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cachedUsers: object[] = Object.values(JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem("lendsqUsers") || "[]" : "[]"
    ));
    const resultsPerPage: string | number =
      typeof window !== 'undefined' ? localStorage.getItem("lendsqResultsPerPage") || 100 : 100;

    setError("");

    const fetchAllUsers: Function = (): void => {
      setIsLoading(true);
      fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users ")
        .then((result) => result.json())
        .then((usersData) => {
          setUsers(usersData);
          setPages(calculatePages(usersData.length, resultsPerPage));
          if (typeof window !== 'undefined') {
            localStorage.setItem("lendsqUsers", JSON.stringify(usersData));
          }
        })
        .catch((error) =>
          setError("Error fetching data, please check your network.")
        )
        .finally(() => setIsLoading(false));
    };
    cachedUsers.length > 0
      ? (setUsers(cachedUsers), setIsLoading(false))
      : fetchAllUsers();
    setPages(calculatePages(cachedUsers.length, resultsPerPage));
  }, []);

  return { users: users as userObject[], pages, isLoading, error };
};
