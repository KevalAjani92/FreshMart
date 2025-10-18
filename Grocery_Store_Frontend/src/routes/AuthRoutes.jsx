import { Route, Routes } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}
export default AuthRoutes;