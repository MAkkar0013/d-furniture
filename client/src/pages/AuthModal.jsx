import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin ? "/login" : "/register";
      const response = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onLogin(response.data.user);
      } else {
        setIsLogin(true);
      }

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Произошла ошибка");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#1e1e1e] rounded-lg p-8 w-full max-w-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#c19a6b]">
              {isLogin ? "Вход" : "Регистрация"}
            </h2>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">login</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#121212] rounded text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Пароль</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#121212] rounded text-white"
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#121212] rounded text-white"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#121212] rounded text-white"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="bg-[#c19a6b] text-[#121212] px-4 py-2 rounded font-medium"
                >
                  {isLogin ? "Войти" : "Зарегистрироваться"}
                </button>

                <button
                  type="button"
                  className="text-[#c19a6b]"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? "Нет аккаунта? Зарегистрируйтесь"
                    : "Уже есть аккаунт? Войдите"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
