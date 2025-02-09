import React, { useState } from 'react';
import requestApi from '../../helper/api';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../util';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoad, setIsLoad] = useState(true)
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoad) {
      setIsLoad(false);
      await requestApi('auth/login', 'POST', { email, password })
        .then(res => {
          console.log(res);

          if (res.data.status === 404) {
            toast.error(res.data.response.data.messages.join(' | '));
          }
          if (res.data.token) {
            setToken('token', res.data.token);
            toast.success("Login success")
            navigate('/');
          }
        }).catch(err => {
          if (err.response && err.response.data) {
            const errorMessages = err.response.data.messages;

            if (Array.isArray(errorMessages)) {
              errorMessages.forEach(message => toast.error(message));
            } else {
              toast.error("Có lỗi xảy ra vui lòng thử lại");
            }
          } else {
            toast.error("Có lỗi xảy ra vui lòng thử lại");
          }
        });


      setTimeout(() => {
        setIsLoad(true);
      }, 1000);
    }
    if (!isLoad) {
      toast.warn("Vui lòng đợi trong giây lát",);
    }
  };

  return (<>
    <section className="bg-light  p-xl-5">
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-6">
                  <img
                    className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
                    alt="Welcome back you've been missed!"
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-5">
                            <h4 className="text-center">Welcome back you've been missed!</h4>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="row gy-3 overflow-hidden">
                          <div className="col-12">
                          <label htmlFor="email" className="form-label">
                                Email
                              </label>
                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                              />
                             
                            </div>
                          </div>
                          <div className="col-12">
                          <label htmlFor="password" className="form-label">
                                Password
                              </label>
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                              />
                            
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                name="remember_me"
                                id="remember_me"
                              />
                              <label className="form-check-label text-secondary" htmlFor="remember_me">
                                Keep me logged in
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button className="btn btn-dark btn-lg" type="submit">
                                Log in now
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <Link to="/register" className="link-secondary text-decoration-none">
                              Create new account
                            </Link>
                            <a href="#!" className="link-secondary text-decoration-none">
                              Forgot password
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Login;
