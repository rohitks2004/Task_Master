import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";
import Loading from "./Loader.jsx";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox.jsx";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
export const ChangePassword = ({ open, setOpen }) => {
const {
register, handleSubmit, formState: { errors }, } = useForm();
const [changeUserPassword, { isLoading}] = useChangePasswordMutation();

const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
    toast.warning("Passwords doesn't match");
    return;
    }
    try {
    const res = await changeUserPassword (data).unwrap();
    toast.success("Password Changed successfully");
    setTimeout(() => {
    setOpen(false);
    }, 1500);
    } catch (err) {
    console.log(err);
    toast.error(err?.data?.message || err.error);
    I
    }
    };

return (
    <>
<ModalWrapper open={open} setOpen={setOpen}>
<form onSubmit={handleSubmit(handleOnSubmit)} className=''>
<Dialog.Title
as='h2'
className='text-base font-bold leading-6 text-gray-900 mb-4'
>
Change Passowrd
</Dialog.Title>
<div className='mt-2 flex flex-col gap-6'>
<Textbox
placeholder='New Passowrd'
type='password'
name='password'
label='New Passowrd'
className='w-full rounded'
register={register("password", {
required: "New Passowrd is required!",
})}
error={errors.password? errors.password.message: ""}/>
<Textbox
placeholder='Confirm New Passowrd'
type='password'
name='cpass'
label='Confirm New Passowrd'
className='w-full rounded'
register={register("cpass", {
required: "Confirm New Passowrd is required!",
})}
error={errors.password? errors.password.message: ""}/>

</div>


{isLoading ? (
    <div className="py-5">
        <Loading/>
    </div>
):(
<div className="py-3 mt-4 sm:flex-row-reverse">
    <Button
    type='submit'
    className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700'
    label='save'
    />
    <button
    type="button"
    className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
    onClick={()=>setOpen(false)}
    >
        Cancel
    </button>
    </div>
)}

</form>
</ModalWrapper>

 </>

)};
