import { Navigate } from "react-router-dom";

export default function RotaFuncionario({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const isAdmin = localStorage.getItem("is_admin") || sessionStorage.getItem("is_admin");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin !== "true") {
        alert("Acesso negado: Área restrita para funcionários.");
        return <Navigate to="/" replace />;
    }

    return children;
}