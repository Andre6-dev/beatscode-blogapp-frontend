import React from "react";
import mainLogo from "../../../img/Logo1.png";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import backgrounAuth from "../../../img/robotSignIn.png";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";

// FORM SCHEMA
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  // DISPATCH
  const dispatch = useDispatch();

  // FORMIK
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // DISPATCH THE ACTION
      dispatch(loginUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  // REDIRECT AFTER LOGIN
  const store = useSelector((state) => state?.users);
  console.log(store);
  const { userAuth, loading, serverError, appError } = store;
  // if (userAuth) return <Redirect to="/profile" />;

  return (
    <>
      <div className="h-screen min-h-full flex bg-gradient-to-tl from-darkPurple via-darkPurple to-darkPink">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-2 text-3xl font-extrabold text-white text-center">
                Login
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Login with your account
                  </p>
                </div>
              </div>

              {/*FORM FIELDS*/}
              <div className="mt-6">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/*ALERT ERROR VALIDATION */}
                  <div className="text-sm text-red-400 mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/*ALERT ERROR VALIDATION */}
                  <div className="text-sm text-red-400 mb-2">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-200"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-500 hover:text-indigo-300"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  {/*DISPLAY ERROR IF USER EXISTS OR SERVER ERROR*/}
                  {appError || serverError ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                      role="alert"
                    >
                      <span className="font-medium">Error! </span>
                      {serverError} {appError}
                    </div>
                  ) : null}

                  <div>
                    {/* CHECK FOR LOADING STATE*/}
                    {loading ? (
                      <button
                        disabled
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                      text-sm font-medium text-white bg-purple-600 hover:bg-rose-300 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                      text-sm font-medium text-white bg-purple-600 hover:bg-rose-300 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-tl from-darkPurple via-darkPurple to-darkPink hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-none object-center"
            src={backgrounAuth}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
