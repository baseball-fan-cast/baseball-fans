import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  //  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true);
    navigate('/');
  };

  // const handleChange = () => {

  // }

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  // }
  return (
    <div>
      <button onClick={handleLogin}>Authenticate</button>
      {/* <form onSubmit={handleSubmit}>
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
            </form> */}
    </div>
  );
};
