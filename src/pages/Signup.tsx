import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
const initialValues = {
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
};
export const Signup = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(initialValues);
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = (values) => {
    const errors = initialValues;

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    } else if (values.firstName.length <= 3) {
      errors.firstName = 'Must be 3 characters or more';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    } else if (values.lastName.length <= 3) {
      errors.lastName = 'Must be 3 characters or more';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password number is required';
    } else if (values.password.length <= 8) {
      errors.password = 'Password length must be more than 7';
    }

    if (values.password !== values.confirmPassword) {
      errors.password = 'Password does not match!';
    }
    setIsError(!!errors.firstName || !!errors.lastName || !!errors.password || !!errors.email);
    setErrors(errors);
    return errors;
  };

  const onSubmitSignupForm = async (e) => {
    e.preventDefault();
    validateForm(formData);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password).then(
        (userCredential) => {
          setLoading(false);
          const user = userCredential.user;
          console.log(user);
          navigate('/login');
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrors(errorMessage);
      setLoading(false);
      console.log(errorCode, errorMessage);
    }

    await updateProfile(auth.currentUser, {
      displayName: `${formData.firstName} ${formData.lastName}`
    })
      .then(() => {
        console.log('updated successfully');
      })
      .catch((error) => {
        console.log('error updating name');
        console.log(error);
      });
  };

  const handleChange = (value, label) => {
    setFormData({ ...formData, [`${label}`]: value });
    setTouched({ ...touched, [`${label}`]: 'Y' });
    setIsError(false);
  };

  return (
    <main>
      <section>
        <div className="grid md:grid-cols-1 h-screen justify-center">
          <div className="md:w-full w-2/5 mx-auto ">
            <div className="flex md:w-2/5  mx-auto flex-col justify-center h-screen ">
              <div>
                <div>
                  <div className="text-2xl text-center font-bold mb-2">
                    Baseball Fan <span className="text-tertiary">Cast</span>
                  </div>

                  <h2 className="text-center text-sm md:text-xs tracking-tight text-gray-900">
                    Are you new? Sign up today
                  </h2>
                </div>

                {/* <div className='mt-4 text-xs' style={{ color: "red" }}>
                                    {errors && errors}
                                </div> */}

                <div>
                  <form className="mt-8 space-y-6" onSubmit={onSubmitSignupForm}>
                    <div className=" space-y-6 rounded-md shadow-sm">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          First name
                        </label>
                        <input
                          type="firstName"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange(e.target.value, 'firstName')}
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="First name"
                        />
                        <p className="text-xs" style={{ color: 'red' }}>
                          {errors.firstName && touched.firstName && errors.firstName}
                        </p>
                      </div>

                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Last name
                        </label>
                        <input
                          type="lastName"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange(e.target.value, 'lastName')}
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Last name"
                        />
                        <p className="text-xs" style={{ color: 'red' }}>
                          {errors.lastName && touched.lastName && errors.lastName}
                        </p>
                      </div>

                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange(e.target.value, 'email')}
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Email address"
                        />

                        <p className="text-xs" style={{ color: 'red' }}>
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => handleChange(e.target.value, 'password')}
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Password"
                        />
                        <p className="text-xs" style={{ color: 'red' }}>
                          {errors.password && touched.password && errors.password}
                        </p>
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isError}
                        className="group relative flex w-full justify-center text-white rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>{loading ? 'Creating Account ...' : ' Sign up'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <p className="mt-10 text-sm text-center">
                Already have an account?{' '}
                <NavLink to="/" className="underline text-tertiary text-blue-500">
                  Sign in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
