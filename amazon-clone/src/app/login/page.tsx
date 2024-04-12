import Link from "next/link";
import { loginHandler } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";
const Login = () => {
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
          <h1 className="text-3xl font-semibold text-center pb-3 ">Sign In</h1>
          <ClientFlashComponent />
          <form action={loginHandler} className="space-y-6">
            <div>
              <label className="label">
                <span className="text-base font-bold">Email</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base font-bold">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="w-full input input-bordered bg-slate-100 text-black"
              />
            </div>
            <div className="pt-5">
              <button
                type="submit"
                className="btn btn-block bg-yellow-400 text-black hover:!bg-yellow-600 hover:!text-black rounded-lg"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
        <p className="underline mb-100 text-center mt-5">New to Amazing?</p>

        <div className="flex flex-row gap-3 justify-center items-center">
          <Link href="/register">
            <div
              className="flex justify-center mt-5 item-center"
              data-theme="corporate"
            >
              <button className="btn bg-green-300 btn-wide hover:text-white hover:bg-blue-700">
                Sign up
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

export default Login;
