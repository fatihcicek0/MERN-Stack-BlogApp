import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Forms/AuthForm";

export default function Login() {

    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
        else {
            navigate('/login');
        }
    }, [isAuthenticated])
    return (
        <AuthForm login={true} button={"Login"} />
    )
}