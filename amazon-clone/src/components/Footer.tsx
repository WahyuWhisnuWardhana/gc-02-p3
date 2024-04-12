import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        data-theme="dark"
        className="footer footer-center p-4  text-base-content mt-10"
      >
        <div className="flex flex-col gap-5 text-base-content">
          <Link href="/about">
            <div>About us</div>
          </Link>
          <div>
            Copyright © 2024 - All right reserved by Amazing Industries Ltd
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
