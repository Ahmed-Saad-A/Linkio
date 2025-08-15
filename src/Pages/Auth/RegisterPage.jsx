import style from "../../Shared/Css/Register.module.css";
import SigninComponent from "../../Components/SigninComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../Shared/Schema/RegisterSchema";
import { registerApi } from "../../Services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "a7medsaad01025@gmail.com",
      password: "A7med@123",
      rePassword: "A7med@123",
      dateOfBirth: "",
      gender: "meal",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
  });
  const gender = watch("gender");
  async function handleRegister(formData) {
    try {
      setIsLoading(true);
      const data = await registerApi(formData);
      
      setIsLoading(false);

      if (typeof data === "string") {
        addToast({
          description: data,
          color: "danger",
        });
        return;
      }

      if (data?.error) {
        addToast({
          description: data.error,
          color: "danger",
        });
      } else if (data?.message) {
        addToast({
          description: data.message,
          color: "success",
        });
        reset();
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
      addToast({
        description: err?.message || "Something went wrong",
        color: "danger",
      });
    }
  }

return (
  <section className="auth-body flex justify-center items-center min-h-screen">
    <div className="text-center">
      <SigninComponent />

      <form onSubmit={handleSubmit(handleRegister)} className="mx-auto inline-block">
        <div className={`${style.neumorphic} ${style["neumorphic-card"]}`}>
          <h2 className={style.h1}>Sign Up</h2>

          {/* Name */}
          <div className={style["form-group"]}>
            <input
              type="text"
              {...register("name")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.name ? style["input-error"] : ""
              }`}
              placeholder="Name"
            />
            {errors.name && (
              <span className={style["error-message"]}>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className={style["form-group"]}>
            <input
              type="email"
              {...register("email")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.email ? style["input-error"] : ""
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <span className={style["error-message"]}>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className={style["form-group"]}>
            <input
              type="password"
              {...register("password")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.password ? style["input-error"] : ""
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <span className={style["error-message"]}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Re-enter Password */}
          <div className={style["form-group"]}>
            <input
              type="password"
              {...register("rePassword")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.rePassword ? style["input-error"] : ""
              }`}
              placeholder="Re-enter Password"
            />
            {errors.rePassword && (
              <span className={style["error-message"]}>
                {errors.rePassword.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className={style["form-group"]}>
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`${style.neumorphic} ${style["neumorphic-input"]} ${
                errors.dateOfBirth ? style["input-error"] : ""
              }`}
            />
          </div>

          {/* Gender */}
          <label className={style["neumorphic-label"]}>Gender</label>
          <div style={{ width: "100%", maxWidth: "450px", marginBottom: "25px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => setValue("gender", "male")}
                className={`
                  ${style.neumorphic}
                  ${style["neumorphic-button"]}
                  ${gender === "male" ? style["selected-button"] : ""}
                `}
                style={{ flex: "1 1 45%" }}
              >
                Male
              </button>

              <button
                type="button"
                onClick={() => setValue("gender", "female")}
                className={`
                  ${style.neumorphic}
                  ${style["neumorphic-button"]}
                  ${gender === "female" ? style["selected-button"] : ""}
                `}
                style={{ flex: "1 1 45%" }}
              >
                Female
              </button>
            </div>

            {errors.gender && (
              <span className={style["error-message"]}>
                {errors.gender.message}
              </span>
            )}
          </div>

          {/* Hidden Gender Field */}
          <input
            type="hidden"
            {...register("gender", { required: "Gender is required" })}
          />

          {/* Submit */}
          <button
            type="submit"
            className={`${style.neumorphic} ${style["neumorphic-button"]}`}
            disabled={isLoading}
          >
            {isLoading ? <span className={style.loader}></span> : "Sign In"}
          </button>

          <p style={{ marginTop: "15px", color: "#6d7582", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to={"/login"} replace style={{ color: "#4a90e2" }}>
              Sig In
            </Link>
          </p>
        </div>
      </form>
    </div>
  </section>
);

};

export default RegisterPage;
