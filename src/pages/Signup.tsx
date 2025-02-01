import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Eye, EyeOff } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = (values) => {
    const errors = initialValues;

    if (!values.firstName && touched.firstName) {
      errors.firstName = 'First name is required';
    } else if (values.firstName.length < 2 && touched.firstName) {
      errors.firstName = 'Must be 3 characters or more';
    } else {
      errors.firstName = '';
    }

    if (!values.lastName && touched.lastName) {
      errors.lastName = 'Last name is required';
    } else if (values.lastName.length < 2 && touched.lastName) {
      errors.lastName = 'Must be 3 characters or more';
    } else {
      errors.lastName = '';
    }

    if (!values.email && touched.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) && touched.email) {
      errors.email = 'Invalid email address';
    } else {
      errors.email = '';
    }

    if (!values.password && touched.password) {
      errors.password = 'Password number is required';
    } else if (values.password.length < 6 && touched.password) {
      errors.password = 'Password length must be more than 7';
    } else {
      errors.password = '';
    }

    setErrors(errors);
    return errors;
  };

  const onSubmitSignupForm = async (e) => {
    e.preventDefault();
    setIsError(!!errors.firstName || !!errors.lastName || !!errors.password || !!errors.email);
    if (!!errors.firstName || !!errors.lastName || !!errors.password || !!errors.email) return null;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password).then(() => {
        setLoading(false);
        // const user = userCredential.user;
        navigate('/login');
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message;
      setErrors(errorMessage);
      setLoading(false);
    }

    await updateProfile(auth.currentUser, {
      displayName: `${formData.firstName} ${formData.lastName}`
    })
      .then(() => {
        console.log('updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (value, label) => {
    setFormData({ ...formData, [`${label}`]: value });
    validateForm(formData);
    setTouched({ ...touched, [`${label}`]: 'Y' });
    setIsError(!!errors.firstName || !!errors.lastName || !!errors.password || !!errors.email);
  };

  return (
    <main>
      <section>
        <div className="grid md:grid-cols-1 h-screen justify-center bg-sky-950">
          <div className="flex md:w-2/5 m-auto flex-col justify-center h-auto bg-white px-4 py-9">
            <div>
              <div>
                <div className="text-2xl text-center font-bold mb-2">
                  Baseball Fan <span className="text-tertiary">Cast</span>
                </div>

                <h2 className="text-center text-sm md:text-xs tracking-tight text-gray-900">
                  New to MLB? Sign up today
                </h2>
              </div>
              <div>
                <form className="mt-8 space-y-6" onSubmit={onSubmitSignupForm}>
                  <div className=" space-y-6 rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email-address">First name</label>
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
                      <label htmlFor="email-address">Last name</label>
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
                      <label htmlFor="email-address">Email address</label>
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

                    <div className="relative">
                      <label htmlFor="password">Password</label>
                      <input
                        type={isVisiblePassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e.target.value, 'password')}
                        className="w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 sm:text-sm"
                        placeholder="Password"
                      />

                      <span
                        className="absolute inset-y-0 end-0 top-6 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md"
                        onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                      >
                        {isVisiblePassword ? <Eye /> : <EyeOff />}
                      </span>
                      <p className="text-xs" style={{ color: 'red' }}>
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>

                    <div className="relative">
                      <label htmlFor="password">Confirm Password</label>
                      <input
                        type={isVisible ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
                        className="block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                      <span
                        className="absolute inset-y-0 end-0 top-6 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <Eye /> : <EyeOff />}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'red' }}>
                      {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                    </p>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isError}
                      className={`group relative flex w-full justify-center text-white rounded-2xl border border-transparent ${isError ? 'bg-slate-400' : 'bg-blue-500'} py-2 px-4 text-sm font-medium`}
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
      </section>
    </main>
  );
};
