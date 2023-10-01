import Link from "next/link";
import routesPaths from "../routes";

const Menu = () => {
  return (
    <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <Link href={routesPaths.search.path}>Search</Link>
      </li>
      <li>
        <Link href={routesPaths.myList.path}>My List</Link>
      </li>
    </ul>
  );
};

export default Menu;
