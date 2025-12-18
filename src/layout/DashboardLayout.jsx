import { Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaBook,
  FaPencilAlt,
  FaChalkboardTeacher,
  FaCreditCard,
  FaBookOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaUser,
  FaHome,
  FaBars,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Spinner from "../components/Shared/Spinner";
import ThemeToggle from "../components/Shared/ThemeToggle";
import { AuthContext } from "../providers/AuthContext";

const DashboardLayout = () => {
  const { user, loading: userLoading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [role, isRoleLoading] = useRole();

  if (isRoleLoading || userLoading) return <Spinner />;
  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 flex flex-col shadow-2xl ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/20">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Close sidebar"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {/* Student Routes */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-tuitions"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaBook size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">My Tuitions</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/post-tuition"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaPencilAlt size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Post Tuition</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/applied-tutors"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaChalkboardTeacher size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Applied Tutors</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/payments"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaCreditCard size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Payments</span>
                    )}
                  </NavLink>
                </li>
              </>
            )}

            {/* Tutor Routes */}
            {role === "tutor" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/active-tuitions"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaBookOpen size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Active Tuitions</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaClipboardList size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Manage Applications</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/earnings"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaMoneyBillWave size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Earnings</span>
                    )}
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaUsers size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">User Management</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/tuition-management"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaTasks size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Tuition Management</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/reports"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <FaChartBar size={18} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">Reports</span>
                    )}
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/dashboard/profile"
                onClick={() => setIsMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <FaUser size={18} className="shrink-0" />
                {isSidebarOpen && <span className="font-medium">Profile</span>}
              </NavLink>
            </li>
            {/* Divider */}
            <li className="pt-4 mt-4 border-t border-white/20"></li>
          </ul>
        </nav>

        {/* Back to Home */}
        <div className="p-3 border-t border-white/20">
          <NavLink
            to="/"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <FaHome size={18} className="shrink-0" />
            {isSidebarOpen && <span className="font-medium">Back to Home</span>}
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="shadow-md p-4 flex items-center justify-between sticky top-0 z-30"
          style={{ backgroundColor: "var(--color-card-bg)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <FaBars size={20} style={{ color: "var(--color-text-dark)" }} />
            </button>
            <h1
              className="text-xl flex justify-center items-center sm:text-2xl font-bold"
              style={{ color: "var(--color-text-dark)" }}
            >
              <FaGraduationCap className="" /> EduPlus
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="dashboard" />
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              }}
            >
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-white hover:border-white/80 transition-all hover:scale-105"
                  aria-label="User menu"
                >
                  <div className="w-8 sm:w-10 rounded-full overflow-hidden">
                    <img
                      alt={user?.displayName || "User"}
                      src={user?.photoURL}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-200"
                  style={{ backgroundColor: "var(--color-card-bg)" }}
                >
                  <li className="menu-title px-4 py-2">
                    <span className="text-sm font-semibold truncate">
                      {user?.displayName}
                    </span>
                  </li>
                  <li className="px-2 py-1">
                    <span className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          style={{ backgroundColor: "var(--color-bg-soft)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
