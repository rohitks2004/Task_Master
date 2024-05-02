import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredential } from "../redux/slices/authSlice";
import Loading from "../components/Loader";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [login,{isLoading}]=useLoginMutation()
  
async function onsubmit(data) {
try {
const result = await login(data).unwrap();
dispatch(setCredential(result));
navigate("/");

} catch (error) {
  console.log(error);
  toast.error(error?.data?.message || error.message);
}

  }
    
  useEffect(() => {
    if(user) navigate("/dashboard");
  }, [user]);

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] ">
        <img className="fixed md:left-6 lg:left-24 xl:left-32 opacity-70 z-1 hidden md:block rounded-xl shadow-md shadow-blue-500 bg-blend-screen outline-none shadow-none " width="450px" height="450px" src="https://cdni.iconscout.com/illustration/premium/thumb/freelance-designer-doing-multitasking-6771562-5587390.png" alt="image" />
        <div className="z-50 bg-transparent w-full sm:w-2/3 md:w-auto flex flex-col md:flex-row gap-0 md:gap-0 item-center justify-center rounded-xl">
          {/* left-side */}
          <div className=" h-full w-full flex flex-col  justify-center items-center text-gray-800 md:mx-20 md:mt-5 md:gap-8">
              <h1 className="text-2xl font-bold text-center mt-3 mb-0">Welcome Back!</h1>
              <h1 className="text-3xl text-blue-500 font-bold text-center mt-3 mb-0">Manage All of your <br/>tasks in <span className="text-blue-600">one place.</span><br/>with <span className="text-gray-900">TaskMaster</span></h1>
              {/* <img className="hidden md:block rounded-xl shadow-md shadow-blue-500 bg-blend-screen outline-none shadow-none hover:scale-105" width="230px" height="230px" src="https://cdni.iconscout.com/illustration/premium/thumb/freelance-designer-doing-multitasking-6771562-5587390.png" alt="image" /> */}
            </div>
          {/* right-side */}
          <div className="flex flex-col align-center justify-center m-0">
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="form-container  w-full md:w-[400px] flex flex-col self-center gap-y-8 bg-transparent m-0 px-10 pt-14 pb-14 rounded-lg shadow shadow-slate-200"
            >
              <div className="flex flex-col gap-y-5 font-semibold">
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
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">Forgot password</span>
              {isLoading ?( <Loading/>) :(<Button
              type="submit"
               label="submit" 
               className="w-full h-10 bg-blue-700 text-white rounded-full duration-100 hover:bg-blue-500 active:bg-gray-50 hover:text-gray-900 hover:border border-gray-300"
               />) }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
