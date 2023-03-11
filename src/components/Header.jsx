import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen md:p-6 md:px-16 p-3 px-4 bg-primary ">
      {/* Desktop & Tab*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Logo}
            className="w-8 object-cover"
            alt="logo"
          />
          <motion.p
            whileTap={{ scale: 0.6 }}
            className="text-headingColor text-xl font-bold"
          >
            City
          </motion.p>
        </Link>

        <div className="flex items-center justify-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <motion.li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              whileTap={{ scale: 0.8 }}
            >
              Home
            </motion.li>
            <motion.li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              whileTap={{ scale: 0.8 }}
            >
              Menu
            </motion.li>
            <motion.li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              whileTap={{ scale: 0.8 }}
            >
              About Us
            </motion.li>
            <motion.li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              whileTap={{ scale: 0.8 }}
            >
              Service
            </motion.li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <motion.div whileTap={{ scale: 0.6 }}>
              <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            </motion.div>
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user?.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "narasimmaraj20032003@gmail.com" && (
                  <Link to="/createItem">
                    <motion.p
                      whileTap={{ scale: 0.8 }}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </motion.p>
                  </Link>
                )}
                <motion.p
                  whileTap={{ scale: 0.8 }}
                  className="m-2 px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-300 rounded-md    
                      transition-all duration-100 ease-in-out text-textColor text-base bg-gray-200 justify-center"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Moile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <motion.div whileTap={{ scale: 0.6 }}>
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
          </motion.div>
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={Logo}
            className="w-8 object-cover"
            alt="logo"
          />
          <motion.p
            whileTap={{ scale: 0.7 }}
            className="text-headingColor text-xl font-bold"
          >
            City
          </motion.p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "narasimmaraj20032003@gmail.com" && (
                <Link to="/createItem">
                  <motion.p
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                            transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </motion.p>
                </Link>
              )}
              <ul className="flex flex-col">
                <motion.li
                  whileTap={{ scale: 0.8 }}
                  className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </motion.li>
                <motion.li
                  whileTap={{ scale: 0.8 }}
                  className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </motion.li>
                <motion.li
                  whileTap={{ scale: 0.8 }}
                  className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </motion.li>
                <motion.li
                  whileTap={{ scale: 0.8 }}
                  className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </motion.li>
              </ul>
              <motion.p
                whileTap={{ scale: 0.9 }}
                className="m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer hover:bg-slate-300 
                      transition-all duration-100 ease-in-out text-textColor text-base bg-gray-200 justify-center"
                onClick={logout}
              >
                Logout <MdLogout />
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
