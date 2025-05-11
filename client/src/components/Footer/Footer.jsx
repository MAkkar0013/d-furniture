import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { BsTelegram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  const links = [
    { id: 1, text: "Главная", url: "#home" },
    { id: 2, text: "Каталог", url: "#catalog" },
    { id: 3, text: "О нас", url: "#about" },
    { id: 4, text: "Этапы работы", url: "#steps" },
    { id: 5, text: "Преимущества", url: "#advantages" },
    { id: 6, text: "Контакты", url: "#contact" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#home" className="footer-logo">
            <span>ДИВИДНИ</span>
          </a>
          <p className="footer-text">
            Создаем эксклюзивную мебель премиум-класса с 2010 года.
            Индивидуальный подход и внимание к деталям - наш принцип работы.
          </p>
          <div className="social-links">
            <a href="https://t.me/Hastyha5" className="social-link">
              <BsTelegram size={20} />
            </a>
            <a href="https://t.me/Hastyha5" className="social-link">
              <BsWhatsapp size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="footer-heading">Навигация</h3>
          <ul className="footer-links">
            {links.map((link) => (
              <motion.li
                key={link.id}
                className="footer-link-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href={link.url} className="footer-link">
                  {link.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="footer-heading">Контакты</h3>
          <div className="contact-item">
            <FiMapPin className="contact-icon" />
            <span>г. Москва, ул. Мебельная, 15</span>
          </div>
          <div className="contact-item">
            <FiPhone className="contact-icon" />
            <a href="tel:+79665577999" className="footer-link">
              +7 (966) 557-79-99
            </a>
          </div>
          <div className="contact-item">
            <FiMail className="contact-icon" />
            <a href="mailto:Dividni999@yandex.ru" className="footer-link">
              Dividni999@yandex.ru
            </a>
          </div>
          <div className="contact-item">
            <FiClock className="contact-icon" />
            <span>Пн-Пт: 9:00 - 20:00</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="footer-heading">Рассылка</h3>
          <p className="footer-text">
            Подпишитесь на нашу рассылку, чтобы получать новости о коллекциях и
            специальные предложения.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Ваш email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Подписаться
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div
        className="copyright"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        © {new Date().getFullYear()} ДИВИДНИ. Все права защищены.
      </motion.div>
    </footer>
  );
};

export default Footer;
