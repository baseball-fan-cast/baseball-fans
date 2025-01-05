// import { useForm } from "../hooks/useForm"
import React from 'react';

export const Register = () => {
  // const [email, setForm] = useState()

  // const { handleChange, pass, email } = useForm({
  //     initialState: {
  //         email: '',
  //         pass: ''
  //     }
  // })
  const handleChange = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container-auth">
      <h2>Create an account</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          // value={email}
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          // value={pass}
        />
        <div className="container-buttons">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};
