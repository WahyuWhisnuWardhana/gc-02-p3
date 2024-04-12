import Link from "next/link";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { registerHandler } from "./action";
const Register = () => {
  return (
    <>
      <div className="flex justify-center h-24 ml-5 items-center">
        <img
          src="https://i.ibb.co/f4jkhRs/amazing-logo.png"
          alt="amazing-logo"
        />
      </div>
      <div data-theme="corporate" className="h-screen">
        <div className="w-full p-6 m-auto  rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg bg-slate-50">
          <h1 className="text-3xl font-semibold text-center pb-3 ">Sign Up</h1>
          <ClientFlashComponent />
          <form action={registerHandler} className="space-y-2">
            <div>
              <label className="label">
                <span className="text-base font-bold">Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base font-bold">
                  Username <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base font-bold">
                  Email <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Must be a valid email address"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base font-bold">
                  Password <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 5 characters"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div className="pt-5">
              <button
                type="submit"
                className="btn btn-block bg-yellow-400 text-black hover:!bg-yellow-600 hover:!text-black rounded-lg"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
        <p className="underline mb-100 text-center mt-5">
          Already have an account?
        </p>
        <div className="flex flex-row gap-3 justify-center items-center">
          <Link href="/login">
            <div
              className="flex justify-center mt-5 item-center"
              data-theme="corporate"
            >
              <button className="btn bg-blue-300 btn-wide hover:text-white hover:bg-blue-700">
                Sign in
              </button>
            </div>
          </Link>
          <Link href="/">
            <div
              className="flex justify-center mt-5 item-center"
              data-theme="corporate"
            >
              <button className="btn bg-orange-300 btn-wide hover:text-white hover:bg-orange-700">
                Go Back to Homepage
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
