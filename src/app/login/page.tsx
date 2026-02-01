"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/login.module.scss";
import Image from "next/image";
import illustration from "../../assets/illustration.svg";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (password.length < 1) return;
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const handleLogin = (
    e: React.FormEvent,
    nav: (path: string) => void,
    obj: { email: string; password: string }
  ): void => {
    e.preventDefault();

    const newObj = {
      email: "",
      password: "",
    };
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!emailRegex.test(obj.email))
      newObj.email = "Please input valid email address";

    if (obj.email.trim().length < 1) newObj.email = "Please input email";

    if (obj.password.trim().length < 6)
      newObj.password = "Password must be at least 6 characters long";

    if (obj.password.trim().length < 0)
      newObj.password = "Please input password";

    if (
      JSON.stringify(newObj) ===
      JSON.stringify({
        email: "",
        password: "",
      })
    ) {
      nav("/dashboard");
    } else {
      setErrorMessage(newObj);
    }
  };

  return (
    <div className={styles.container} data-testid="login">
      <div className={styles.mainbox}>
        <Image
          className={styles.illustration}
          src={illustration}
          width={400}
          height={300}
          alt="login illustration"
        />
        <div className={styles.form_container}>
          <h1>Welcome!</h1>
          <p className={styles.subheading}>Enter details to login.</p>
          <form>
            <div>
              <div className={styles.email}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => (e.target.value = email.trim())}
                  data-testid={"username"}
                />
              </div>
              <p className={styles.error}>{errorMessage.email}</p>
            </div>
            <div>
              <div className={styles.password}>
                <input
                  type={inputType}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => (e.target.value = password.trim())}
                  placeholder="Password"
                  data-testid={"password"}
                />
                <button onClick={(e) => handleShowPassword(e)}>
                  {inputType === "password" ? "SHOW" : "✕"}
                </button>
              </div>
              <p className={styles.error}>{errorMessage.password}</p>
            </div>
            <p className={styles.forgot_password}>FORGOT PASSWORD?</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage({
                  email: "",
                  password: "",
                });
                handleLogin(e, (path: string) => router.push(path), { email, password });
              }}
              className={styles.login_btn}
              data-testid={"login-btn"}
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;