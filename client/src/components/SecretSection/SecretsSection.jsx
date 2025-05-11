import { motion } from "framer-motion";
import "./SecretsSection.css";

const SecretsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="secrets-section" id="secrets">
      <motion.div
        className="secrets-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="secrets-title" variants={itemVariants}>
          Секрет нашего долголетия?
        </motion.h2>

        <motion.p className="secrets-subtitle" variants={itemVariants}>
          Мы не продаем шкафы — мы проектируем пространство, где:
        </motion.p>

        <motion.ul className="secrets-list">
          <motion.li className="secret-item" variants={itemVariants}>
            Утро начинается с ароматного кофе на идеальной кухне
          </motion.li>
          <motion.li className="secret-item" variants={itemVariants}>
            Дети смеются, находя «тайники» в своей новой комнате
          </motion.li>
          <motion.li className="secret-item" variants={itemVariants}>
            Гости замирают у вашей гостиной, спрашивая: «Где вы это взяли?»
          </motion.li>
        </motion.ul>

        <motion.p className="secrets-cta" variants={itemVariants}>
          Расскажите нам свою историю — превратим ее в интерьер
        </motion.p>

        <motion.a
          className="secrets-button"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="sms:+79665577999"
        >
          Рассказать свою историю
        </motion.a>
      </motion.div>
    </section>
  );
};

export default SecretsSection;
