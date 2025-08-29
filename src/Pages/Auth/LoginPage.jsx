import React, { useContext, useState } from "react";
import style from "../../Shared/Css/Register.module.css";
import SigninComponent from "../../Components/SigninComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../../Shared/Schema/LoginSchema";
import { addToast } from "@heroui/react";
import Cookies from "js-cookie";
import { loginApi } from "../../Services/AuthServices";
import { AuthContext } from "../../Context/AuthContextProvider";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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
      navigate(payhName == "/login" ? "/login" : payhName);
    }
  }

  return (
    <section className="auth-body flex justify-center items-center min-h-screen mb-24 dark:text-white">
      <div className="text-center">
        <SigninComponent />

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mx-auto inline-block  dark:bg-black dark:text-white"
        >
          <div className={`${style.neumorphic} ${style["neumorphic-card"]}`}>
            <h2 className={`${style.h1} text-2xl text-white`}>Sign In</h2>

            <input
              type="email"
              {...register("email")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.email ? style["input-error"] : ""
              }`}
              placeholder="Email"
            />

            {/* <input
            type="password"
            {...register("password")}
            className={`${style.neumorphic} ${style["neumorphic-input"]} ${
              errors.password ? style["input-error"] : ""
            }`}
            placeholder="Password"
          /> */}

            <div className={`${style["form-group"]} relative`}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                  errors.password ? style["input-error"] : ""
                } pr-10`} // ← مهم لترك مساحة للأيقونة
                placeholder="Password"
              />
              {errors.password && (
                <span className={style["error-message"]}>
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-green-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className={`mt-5 ${style.neumorphic} ${style["neumorphic-button"]}`}
              disabled={isLoading}
            >
              {isLoading ? <span className={style.loader}></span> : "Sign In"}
            </button>

            <p
              style={{ marginTop: "15px", color: "#6d7582", fontSize: "14px" }}
            >
              Don't have an account?{" "}
              <Link to={"/register"} replace style={{ color: "#0036ff" }}>
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
