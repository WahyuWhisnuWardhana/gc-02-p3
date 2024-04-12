import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Navbar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <div className="navbar" data-theme="dark">
      <div className="flex-1 gap-96">
        <Link href="/">
          <img
            src="https://i.ibb.co/f4jkhRs/amazing-logo.png"
            alt="amazing-logo"
            className="w-24 h-20 "
          />
        </Link>

        <div
          className="form-control justify-center items-center content-center "
          data-theme="corporate"
        >
          <form action="/products" method="GET">
            <div className="join">
              <input
                className="join-item input input-bordered w-96"
                placeholder="Search"
                name="search"
              />
              <button className="join-item btn bg-orange-400 ">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex px-5 gap-10">
        {token ? (
          <>
            <div className="menu menu-horizontal  text-white">
              <Link href="/wishlists">
                <button
                  className="btn btn-ghost rounded-btn text-white text-lg "
                  type="button"
                >
                  Check my Wishlists
                </button>
              </Link>
            </div>
            <form
              action={async () => {
                "use server";
                cookies().get("token") && cookies().delete("token");
                redirect("/login");
              }}
            >
              <button
                type="submit"
                className="btn btn-ghost rounded-btn text-white hover:text-red-500 mr-5 text-lg"
              >
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/register">
              <button
                className="btn btn-ghost rounded-btn text-white hover:text-green-500 text-lg"
                type="button"
              >
                Sign up
              </button>
            </Link>
            <Link href="/login">
              <button
                className="btn btn-ghost rounded-btn text-white hover:text-blue-500 text-lg"
                type="button"
              >
                Sign in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
