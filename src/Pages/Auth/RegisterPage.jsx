import SigninComponent from "../../Components/SigninComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../Shared/Schema/RegisterSchema";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";
import { registerApi } from "../../Services/AuthServices";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
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
  <section className="bg-transparent auth-body flex justify-center items-center min-h-screen mb-24">
    <div className="text-center">
      <SigninComponent />

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mx-auto inline-block"
      >
        <div className="neumorphic neumorphic-card">
          <h2 className="h1">Sign Up</h2>

          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              {...register("name")}
              className={`neumorphic neumorphic-input ${errors.name ? "input-error" : ""}`}
              placeholder="Name"
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              {...register("email")}
              className={`neumorphic neumorphic-input ${errors.email ? "input-error" : ""}`}
              placeholder="Email"
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="form-group relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`neumorphic neumorphic-input ${errors.password ? "input-error" : ""} pr-10`}
              placeholder="Password"
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 bottom-1 -translate-y-1/2 flex items-center text-green-500"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Re-enter Password */}
          <div className="form-group relative">
            <input
              type={showRePassword ? "text" : "password"}
              {...register("rePassword")}
              className={`neumorphic neumorphic-input ${errors.rePassword ? "input-error" : ""} pr-10`}
              placeholder="Re-enter Password"
            />
            {errors.rePassword && <span className="error-message">{errors.rePassword.message}</span>}
            <button
              type="button"
              onClick={() => setShowRePassword((prev) => !prev)}
              className="absolute right-2 bottom-1 -translate-y-1/2 flex items-center text-green-500"
            >
              {showRePassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`neumorphic neumorphic-input ${errors.dateOfBirth ? "input-error" : ""}`}
            />
          </div>

          {/* Gender */}
          <label className="neumorphic-label">Gender</label>
          <div className="w-full max-w-[450px] mb-6">
            <div className="flex flex-row gap-2 justify-center flex-wrap">
              <button
                type="button"
                onClick={() => setValue("gender", "male")}
                className={`flex-1 min-w-[45%] neumorphic neumorphic-button ${gender === "male" ? "selected-button" : ""}`}
              >
                Male
              </button>

              <button
                type="button"
                onClick={() => setValue("gender", "female")}
                className={`flex-1 min-w-[45%] neumorphic neumorphic-button ${gender === "female" ? "selected-button" : ""}`}
              >
                Female
              </button>
            </div>
            {errors.gender && <span className="error-message">{errors.gender.message}</span>}
          </div>

          {/* Hidden Gender Field */}
          <input
            type="hidden"
            {...register("gender", { required: "Gender is required" })}
          />

          {/* Submit */}
          <button
            type="submit"
            className="neumorphic neumorphic-button mt-5"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Sign In"}
          </button>

          <p className="mt-4 text-[#6d7582] text-sm dark:text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} replace className="text-[#0036ff] dark:text-[#D3006C] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  </section>
);

};

export default RegisterPage;
