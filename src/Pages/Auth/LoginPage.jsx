import React, { useContext, useState } from "react";
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
    <section className="bg-transparent auth-body flex justify-center items-center min-h-screen mb-24">
      <div className="text-center">
        <SigninComponent />

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mx-auto inline-block outline-amber-700"
        >
          <div className="neumorphic neumorphic-card">
            <h2 className="h1">Sign In</h2>

            <input
              type="email"
              {...register("email")}
              className={`neumorphic neumorphic-input ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Email"
            />

            {/* <div className="form-group relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`neumorphic neumorphic-input ${
                  errors.password ? "input-error" : ""
                } pr-10`}
                placeholder="Password"
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div> */}

            <div className="form-group relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`neumorphic neumorphic-input ${
                    errors.password ? "input-error" : ""
                  } pr-10`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 pt-6 -translate-y-1/2 text-green-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 neumorphic neumorphic-button"
              disabled={isLoading}
            >
              {isLoading ? <span className="loader"></span> : "Sign In"}
            </button>

            <p className="mt-4 text-[#6d7582] text-sm dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                replace
                className="text-[#0036ff] dark:text-[#D3006C] hover:underline"
              >
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
