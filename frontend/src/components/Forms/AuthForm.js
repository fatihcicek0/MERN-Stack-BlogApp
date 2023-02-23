import { useState } from "react";
import { useDispatch} from "react-redux";
import { Login, Register } from "../../store/authSlice";
import './form.css';

export default function AuthForm({ button, login }) {
    const dispatch = useDispatch();
    const [data, setData] = useState({ name: '', email: '', password: '' });

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (login) {
            dispatch(Login(data));
        } else {
            dispatch(Register(data));
        }
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div className="container">
            <div className="container-form">
                <h1>{login ? "Login" : "Register"}</h1>
                <form onSubmit={onFormSubmit} >
                    {!login && <input type="text" placeholder="Name" name="name" value={data.name} onChange={onChange}></input>}
                    <input type="text" placeholder="Email" name="email" value={data.email} onChange={onChange}></input>
                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={onChange}></input>
                    <button className="form-btn" type="submit">{button}</button>
                </form>
            </div>
        </div>
    )
}