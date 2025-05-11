import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiCamera } from "react-icons/fi";
import "./Catalog.css";
import img1 from "../../images/garderob.jpg";
import img2 from "../../images/kitchen.jpg";
import img3 from "../../images/office.jpg";
import img4 from "../../images/children.jpg";

const catalogItems = [
  {
    id: 1,
    title: "Кухни-трансформеры",
    description:
      "От миниатюрных до островных, с интегрированной техникой и умным хранением.",
    image: img2,
  },
  {
    id: 2,
    title: "Гардеробные-хамелеоны",
    description: "Системы, которые адаптируются под ваш образ жизни.",
    image: img1,
  },
  {
    id: 3,
    title: "Офисная мебель с характером",
    description: "От строгих кабинетов до креативных open-space.",
    image: img3,
  },
  {
    id: 4,
    title: "Детская мебель «на вырост»",
    description: "Модули, которые меняются вместе с увлечениями ребенка. ",
    image: img4,
  },
  {
    id: 5,
    type: "calculation",
    title: "Расчет по фото",
    description:
      "Отправьте фото проекта нам в Telegram и мы сообщим примерную цену для вашего проекта.",
    buttonText: "Отправить фото",
  },
];

const CatalogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollToCard = (index) => {
    const carousel = carouselRef.current;
    const card = carousel.children[index];
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setCurrentIndex(index);
  };

  const nextCard = () => {
    const newIndex = (currentIndex + 1) % catalogItems.length;
    scrollToCard(newIndex);
  };

  const prevCard = () => {
    const newIndex =
      (currentIndex - 1 + catalogItems.length) % catalogItems.length;
    scrollToCard(newIndex);
  };

  const handlePhotoSubmit = () => {
    // Здесь можно добавить логику для открытия Telegram или формы отправки
    window.open("https://t.me/Hastyha5", "_blank");
  };

  return (
    <section className="catalog-section" id="catalog">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="section-title">Что мы создаем</h2>
      </motion.div>

      <div className="carousel-container">
        <button className="nav-button prev" onClick={prevCard}>
          <FiChevronLeft size={24} />
        </button>

        <div className="carousel-track" ref={carouselRef}>
          {catalogItems.map((item) => (
            <motion.div
              key={item.id}
              className={`card ${
                item.type === "calculation" ? "calculation-card" : ""
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {item.type === "calculation" ? (
                <>
                  <div className="card-icon">
                    <FiCamera />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                  <button className="card-button" onClick={handlePhotoSubmit}>
                    {item.buttonText}
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <button className="nav-button next" onClick={nextCard}>
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default CatalogSection;
