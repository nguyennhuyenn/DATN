import React, { useState } from 'react';
import requestApi from '../../helper/api';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../util';

const Register = () => {
    const formRegister = {
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }
    const [registerData, setRegisterForm] = useState(formRegister)
    const [isLoad, setIsLoad] = useState(true)
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoad) {
            setIsLoad(false);
            await requestApi('auth/register', 'POST', registerData)
                .then(res => {
                    toast.success("Đăng ký thành công");
                    navigate('/login');
                }).catch(err => {
                    if (err.response && err.response.data) {
                        const errorMessages = err.response.data.messages;

                        if (Array.isArray(errorMessages)) {
                            errorMessages.forEach(message => toast.error(message));
                        } else {
                            toast.error("Có lỗi xảy ra vui lòng thử lại");
                        }
                    } else {
                        // Trường hợp không có lỗi từ server
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
                <div className="row w -100">
                    <div className="col-12 col-xxl-11">
                        <div className="card border-light-subtle shadow-sm">
                            <div className="row g-0">
                                <div className="col-12 col-md-6">
                                    <img
                                        className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                                        loading="lazy"
                                        src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
                                        alt="Chào mừng bạn trở lại!"
                                    />
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="col-12 col-lg-11 col-xl-10">
                                        <div className="card-body p-3 p-md-4 p-xl-5">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-5">
                                                        <div className="text-center mb-4">
                                                            <a href="#!">
                                                                <img
                                                                    src="./assets/img/bsb-logo.svg"
                                                                    alt="Logo BootstrapBrain"
                                                                    width="175"
                                                                    height="57"
                                                                />
                                                            </a>
                                                        </div>
                                                        <h4 className="text-center">Chào mừng bạn trở lại!</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row gy-3 overflow-hidden">
                                                    <div className="col-12">
                                                        <label htmlFor="username" className="form-label">
                                                            Tên đăng nhập
                                                        </label>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="username"
                                                                id="username"
                                                                value={registerData.username}
                                                                onChange={handleChange}
                                                                placeholder="Nguyễn Nam"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                value={registerData.email}
                                                                onChange={handleChange}
                                                                placeholder="name@example.com"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="phoneNumber" className="form-label">
                                                            Số điện thoại
                                                        </label>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="phoneNumber"
                                                                id="phoneNumber"
                                                                value={registerData.phoneNumber}
                                                                onChange={handleChange}
                                                                placeholder="0123456789"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <label htmlFor="password" className="form-label">
                                                            Mật khẩu
                                                        </label>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                name="password"
                                                                id="password"
                                                                value={registerData.password}
                                                                onChange={handleChange}
                                                                placeholder="Mật khẩu"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="confirmPassword" className="form-label">
                                                            Xác nhận mật khẩu
                                                        </label>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                name="confirmPassword"
                                                                id="confirmPassword"
                                                                value={registerData.confirmPassword}
                                                                onChange={handleChange}
                                                                placeholder="Xác nhận mật khẩu"
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
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-dark btn-lg" type="submit">
                                                                Đăng ký ngay
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                                                        <Link to="/login" className="link-secondary text-decoration-none">
                                                            Đăng nhập với tài khoản
                                                        </Link>
                                                        <a href="#!" className="link-secondary text-decoration-none">
                                                            Quên mật khẩu
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

export default Register;