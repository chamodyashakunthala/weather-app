import { NavLink } from 'react-router-dom';

function NavBar() {
    const linkClass = ({ isActive }) =>
        `px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-700'
        }`;

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 flex justify-center gap-6 p-4 bg-white/70 backdrop-blur-sm">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/history" className={linkClass}>History</NavLink>
        </nav>
    );
}

export default NavBar;