import GuestSession from "./guest-session";
import Menu from "./menu";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-primary normal-case text-xl">
          Movie Catalog
        </a>
      </div>
      <div className="navbar-center">
        <Menu />
      </div>
      <div className="navbar-end">
        <GuestSession />
      </div>
    </div>
  );
};

export default Navbar;
