import React, { useContext, useState } from "react";
import style from "../../Shared/Css/Register.module.css";
import SigninComponent from "../../Components/SigninComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../../Shared/Schema/LoginSchema";
import { loginApi } from "../../Services/authServices";
import { addToast } from "@heroui/react";
import Cookies from "js-cookie";
import { authContext } from "../../Context/authContext";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "ahmed.lab505@gmail.com",
      password: "A7med@123",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  async function handleLogin(formData) {
    setIsLoading(true);
    const data = await loginApi(formData);
    setIsLoading(false);

    if (typeof data === "string") {
      addToast({
        title: "error",
        description: data,
        color: "danger",
        variant: "flat",
      });
    } else {
      addToast({
        title: "sucess",
        description: "successfully logged in",
        color: "success",
        variant: "flat",
      });
      Cookies.set("token", data.token, {
        expires: 7,
        sameSite: "Strict",
      });
      setIsLoggedIn(true);
      const payhName = location.pathname;
      navigate(payhName == '/login' ? '/login' : payhName);
    }
  }

return (
  <section className="auth-body flex justify-center items-center min-h-screen">
    <div className="text-center">
      <SigninComponent />

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mx-auto inline-block"
      >
        <div className={`${style.neumorphic} ${style["neumorphic-card"]}`}>
          <h2 className={`${style.h1} text-2xl`}>Sign In</h2>

          <input
            type="email"
            {...register("email")}
            className={`${style.neumorphic} ${style["neumorphic-input"]} ${
              errors.email ? style["input-error"] : ""
            }`}
            placeholder="Email"
          />

          <input
            type="password"
            {...register("password")}
            className={`${style.neumorphic} ${style["neumorphic-input"]} ${
              errors.password ? style["input-error"] : ""
            }`}
            placeholder="Password"
          />

          <button
            type="submit"
            className={`mt-5 ${style.neumorphic} ${style["neumorphic-button"]}`}
            disabled={isLoading}
          >
            {isLoading ? <span className={style.loader}></span> : "Sign In"}
          </button>

          <p style={{ marginTop: "15px", color: "#6d7582", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to={"/register"} replace style={{ color: "#4a90e2" }}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  </section>
);


};

export default LoginPage;
