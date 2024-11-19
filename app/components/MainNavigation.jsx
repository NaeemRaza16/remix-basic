import { NavLink } from "@remix-run/react";

export default function MainNavigation() {
  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/notes">My Notes</NavLink>
            </li>
        </ul>
    </nav>
  )
}
