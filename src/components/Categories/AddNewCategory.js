import React from "react";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import robotCreate from "../../img/robotCreate.png";
import { createCategoryAction } from "../../redux/slices/category/categorySlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

// FORM SCHEMA
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const AddNewCategory = () => {
  const dispatch = useDispatch();

  // FORMIK
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      // DISPATCH THE ACTION
      dispatch(createCategoryAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  // GET DATA FROM STORE
  const store = useSelector((state) => state?.category);

  const { userAuth, loading, serverError, appError } = store;

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkPurple py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-auto w-auto object-center"
            src={robotCreate}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-400 hover:text-indigo-200">
              These are the categories user will select when creating a post
            </p>
          </p>
          {/*DISPLAY ERROR IF USER EXISTS OR SERVER ERROR*/}
          {appError || serverError ? (
            <div
              className="p-4 m-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {serverError} {appError}
            </div>
          ) : null}
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-500 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-purple-400 hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-white group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-white group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
