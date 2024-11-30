import { useNavigate } from "react-router-dom";

const useRoleCheck = (requiredRole) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || !currentUser.isSeller) {
    navigate("/not-found");
  }
};

export default useRoleCheck;
