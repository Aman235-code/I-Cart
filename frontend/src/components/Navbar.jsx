import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.products);
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header className="fixed top-0 w-full z-20 bg-white backdrop-blur border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/ICart.png"
            alt="ICart"
            className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
          />

          <h1 className="text-2xl font-extrabold tracking-tight text-purple-600">
            I<span className="text-purple-400">-</span>Cart
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <li>
              <Link to="/" className="hover:text-pink-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-pink-600 transition">
                Products
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  className="hover:text-pink-600 transition"
                >
                  Hello, {user.firstName}
                </Link>
              </li>
            )}
            {admin && (
              <li>
                <Link
                  to={`/dashboard/sales`}
                  className="hover:text-pink-600 transition"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-pink-600"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full px-1.5">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <Button
              onClick={logoutHandler}
              size="sm"
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              size="sm"
              className="bg-linear-to-tr hover:cursor-pointer from-blue-600 to-purple-600 text-white hover:bg-blue-500"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
