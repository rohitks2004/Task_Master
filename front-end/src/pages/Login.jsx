import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Textbox from "../components/Textbox";
import Button from "../components/Button";

const Login = () => {
  const user = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  function onsubmit(data) {
    console.log("submitted");
    console.log(data);
  }

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-content flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-0 md:gap-40 item-center justify-center">
          {/* left-side */}
          <div></div>
          {/* right-side */}
          <div className="flex flex-col align-center justify-center">
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
            >
              <div className="flex flex-col gap-y-5">
                <Textbox
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="email@gmail.com"
                  className="w-full rounded-full"
                  register={register("email", { required: "Email required" })}
                  error={errors.Username ? errors.Username.message : " "}
                />
                <Textbox
                name="password"
                label="password"
                type="password"
                placeholder="your password"
                className="w-full rounded-full"
                register={register("password", { required: "password required" })}
                error={errors.password ? errors.password.message : " "}
              />
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor pointer">Forgot password</span>
              <Button type="submit" label="submit" className="w-full h-10 bg-blue-700 text-white rounded-full"/> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
