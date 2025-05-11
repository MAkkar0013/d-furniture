import { useState, useEffect } from "react";
import axios from "axios";
import "./Catalog.css";

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState("kitchens");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Подгружаем данные пользователя при загрузке
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных пользователя:", err);
      }
    };

    fetchUserData();
  }, []);

  const categories = [
    { id: "kitchens", name: "Кухни" },
    { id: "living", name: "Гостиные" },
    { id: "bedrooms", name: "Спальни" },
    { id: "wardrobes", name: "Гардеробы" },
  ];

  const products = {
    kitchens: [
      {
        id: 1,
        name: 'Кухня "Милан"',
        price: "от 120 000 ₽",
        image: "/images/kitchen1.jpg",
      },
      {
        id: 2,
        name: 'Кухня "Барселона"',
        price: "от 150 000 ₽",
        image: "/images/kitchen2.jpg",
      },
    ],
    living: [
      {
        id: 1,
        name: 'Гостиная "Токио"',
        price: "от 200 000 ₽",
        image: "/images/living1.jpg",
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем авторизацию
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Для отправки заявки необходимо войти в аккаунт");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Используем данные из userData или из formData (если userData нет)
      const requestData = {
        name: userData?.name || formData.name,
        tel: userData?.phone || formData.phone,
        email: userData?.email || formData.email,
        "text-message": formData.message,
        product: selectedItem.name,
        productPrice: selectedItem.price,
        productCategory: activeCategory,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("/api/send-request", requestData, config);
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
      setSelectedItem(null);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      // Обработка ошибок...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="catalog-sect">
      <div className="cont">
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Каталог мебели
        </h2>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {products[activeCategory]?.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button
                  className="request-btn"
                  onClick={() => setSelectedItem(product)}
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="request-modal">
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={() => setSelectedItem(null)}
              >
                &times;
              </button>
              <h3>Заявка на {selectedItem.name}</h3>

              <form onSubmit={handleSubmit}>
                {/* Скрытые поля для данных */}
                <input
                  type="hidden"
                  name="name"
                  value={userData?.name || formData.name}
                />
                <input
                  type="hidden"
                  name="tel"
                  value={userData?.phone || formData.phone}
                />
                <input
                  type="hidden"
                  name="email"
                  value={userData?.email || formData.email}
                />

                {/* Только поле для сообщения остается видимым */}
                <div className="form-group">
                  <label>Ваши пожелания</label>
                  <textarea
                    value={formData.message}
                    name="text-message"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Информация о пользователе */}
                <div className="user-info-notice">
                  <p style={{ color: "black" }}>
                    Заявка будет отправлена со следующими данными:
                  </p>
                  <div className="user-details">
                    <p>
                      <strong>Имя:</strong> {userData?.name || "Не указано"}
                    </p>
                    <p>
                      <strong>Email:</strong> {userData?.email || "Не указан"}
                    </p>
                    <p>
                      <strong>Телефон:</strong> {userData?.phone || "Не указан"}
                    </p>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Отправка..." : "Отправить заявку"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
