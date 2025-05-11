import { motion } from "framer-motion";
import "./CtaBanner.css";

const CtaBanner = () => {
  return (
    <section className="cta-banner">
      <motion.div
        className="cta-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="cta-title">
          Устали от мебели, которая просто занимает место?
        </h2>

        <p className="cta-subtitle">
          <em>Давайте создадим ту, которая будет работать на вас!</em>
        </p>

        <div className="cta-steps">
          <div className="cta-step">
            <span className="cta-number">1</span>
            <span>Оставьте заявку</span>
          </div>

          <div className="cta-arrow">→</div>

          <div className="cta-step">
            <span className="cta-number">2</span>
            <span>Заберите скидку 20%</span>
          </div>

          <div className="cta-arrow">→</div>

          <div className="cta-step">
            <span className="cta-number">3</span>
            <span>Начните новую главу вашего интерьера!</span>
          </div>
        </div>

        <motion.a
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="sms:+79665577999"
        >
          Получить скидку
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
