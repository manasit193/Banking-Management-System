"use client";

import { useState } from "react";
import BackButton from "@/components/auth/BackButton.forgot";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import ResetPasswordStep from "./ResetPasswordStep";

export default function ForgotPasswordForm(){

const [step,setStep]=useState(1);

const [email,setEmail]=useState("");

const [otp,setOtp]=useState("");

return(

<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border-2 border-red-500">

<BackButton />

<h1 className="text-3xl font-bold text-red-500">

Forgot Password

</h1>

<p className="mt-2 text-gray-500">

Reset your banking account password.

</p>

<div className="mt-8">

{step===1&&(

<EmailStep

email={email}

setEmail={setEmail}

next={()=>setStep(2)}

/>

)}

{step===2&&(

<OtpStep

email={email}

otp={otp}

setOtp={setOtp}

next={()=>setStep(3)}

back={()=>setStep(1)}

/>

)}

{step===3&&(

<ResetPasswordStep

email={email}

otp={otp}

back={()=>setStep(2)}

/>

)}

</div>

</div>

)

}