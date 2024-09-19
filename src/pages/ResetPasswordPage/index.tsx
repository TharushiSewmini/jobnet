import React from "react";
import user from "../../assets/Illustration.png";
import JobNetTopBar from "../../components/JobNetTopBar";
import SignInTextField from "../../components/SignInTextField";
import ReusableButton from "../../components/ReusableButton";
const ResetPasswordPage = () => {
  return (
    <div className="w-full h-full bg-green-600 flex-col overflow-y-hidden">
      <JobNetTopBar />
      <div className="w-full h-full bg-green-600 flex flex-col  justify-start items-center sm:flex-row sm:justify-between">
        <div className="flex justify-center items-center sm:flex-1">
          <img src={user} className="sm:w-1/2 h-1/2 object-cover" />
        </div>
        <div className="flex sm:flex-1 h-full w-full justify-center items-center ">
          <div className="bg-white rounded-2xl w-full sm:w-3/4 h-full p-6 sm:h-2/3 sm:p-10  flex-col ">
            <h2 className="text-2xl pb-6 sm:pb-28">Reset Password</h2>
            <div className=" flex flex-col gap-4 mb-12 sm:mb-8">
              <SignInTextField
                placeHolderValue={"New Password"}
                value={""}
                onChange={function (e: any): void {
                  
                }}
              />
              <SignInTextField
                placeHolderValue={"Confirm Password"}
                value={""}
                onChange={function (e: any): void {
               
                }}
              />
            </div>

            <ReusableButton
              buttonText={"Reset Password"}
              onClick={function (e: any): void {
               
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
