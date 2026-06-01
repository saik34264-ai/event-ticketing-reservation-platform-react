import React, { useState } from "react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const user = {
      name,
      email,
      password
    };

    localStorage.setItem(
      "customer",
      JSON.stringify(user)
    );

    alert("Signup Successful!");
    setIsLogin(true);
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("customer")
    );

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      alert("Login Successful");
      onLogin(savedUser);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px"
      }}
    >
      <h2>
        {isLogin
          ? "Customer Login"
          : "Customer Signup"}
      </h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      {isLogin ? (
        <>
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px"
            }}
          >
            Login
          </button>

          <p>
            New Customer?{" "}
            <button
              onClick={() =>
                setIsLogin(false)
              }
            >
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              padding: "10px"
            }}
          >
            Sign Up
          </button>

          <p>
            Already Registered?{" "}
            <button
              onClick={() =>
                setIsLogin(true)
              }
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}