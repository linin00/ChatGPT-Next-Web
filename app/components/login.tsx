import React, { useState } from "react";
import styles from "./login.module.scss";

export type User = {
  name: string;
  role: string;
  token: string;
};

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Form data:", { username, password });

    // 发送表单数据到后端
    try {
      const response = await fetch("http://linin.xyz:8010/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("登录成功");
        // 处理登录成功的逻辑，例如跳转到主页
        response.json().then((body) => {
          const user: User = body.data;
          console.log(user); // 打印读取到的数据
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
        });
      } else {
        console.log("登录失败");
        alert("登录失败");
        // 处理登录失败的逻辑，例如显示错误消息
      }
    } catch (error) {
      console.error("请求错误:", error);
      alert("登录失败，请稍后再试");
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login__container"]}>
        <div className={styles["login__text"]}>
          <h1>Sign in to ChatGPT</h1>
        </div>
        <div className={styles["login__input"]}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function isLogin() {
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  //todo: check token
  if (user) {
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("user");
  window.location.href = "/";
}

export function getUser() {
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  return user;
}
