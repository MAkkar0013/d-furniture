import "./HeroSection.css";
import furnitureImg1 from "../../images/947.jpg";
import furnitureImg2 from "../../images/kitch.jpg";

const HeroSection = () => {
  return (
    <section className="dark-hero" id="home">
      <div className="blocks-container">
        {/* Блок 1: Главный фото-блок (левый верхний, большой) */}

        <div className="block main-block">
          <img
            src={furnitureImg1}
            alt="Корпусная мебель"
            className="block-image"
          />
          <div className="content-overlay">
            <h2>"Дивидни"— создаем пространство вашего комфорта </h2>
            <p>
              Мебель, которая рассказывает вашу историю — 15 лет воплощаем
              интерьеры Кургана и Тюмени в жизнь
            </p>
          </div>
        </div>

        {/* Блок 4: Фото производства (правый средний) */}
        <div className="blocks">
          <div className="block image-block">
            <img
              src={furnitureImg2}
              alt="Производство"
              className="block-image"
            />
          </div>
          <div className="f-blocks">
            <div className="block feature-block">
              <h3>Собственное производство</h3>
            </div>
            <div className="block feature-block">
              <h3>Гарантия от 1 до 5 лет</h3>
            </div>

            {/* Блок 3: Преимущество 2 (левый средний) */}
            <div className="block feature-block">
              <h3>Индивидуальный дизайн</h3>
            </div>
          </div>
        </div>

        {/* Блок 2: Преимущество 1 (правый верхний) */}

        {/* Блок 5: Преимущество 3 (нижний, на всю ширину) */}
      </div>
    </section>
  );
};

export default HeroSection;
