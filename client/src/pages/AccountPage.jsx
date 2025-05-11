import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiHome, FiLogOut } from "react-icons/fi";
import "./Account.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to load user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="account-container">
      {/* Добавленная кнопка возврата */}
      <button className="home-btn" onClick={() => navigate("/")}>
        <FiHome />
      </button>

      <h1>Аккаунт</h1>
      {user && (
        <>
          <div className="user-info">
            <p>
              <strong>Имя:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.phone && (
              <p>
                <strong>Номер:</strong> {user.phone}
              </p>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut style={{ marginRight: "8px" }} /> Выйти
          </button>
        </>
      )}
    </div>
  );
};

export default AccountPage;
