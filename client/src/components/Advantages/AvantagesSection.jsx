import { motion } from "framer-motion";
import { FaHandshake, FaRulerCombined, FaTools, FaLeaf } from "react-icons/fa";
import "./AvantagesSection.css";

const advantages = [
  {
    id: 1,
    icon: <FaHandshake />,
    title: "Опыт, который ценится",
    description:
      "15 лет, множество реализованных проектов, 98% клиентов рекомендуют нас друзьям. ",
  },
  {
    id: 2,
    icon: <FaRulerCombined />,
    title: "Местное производство — ваши преимущества",
    description:
      "Никаких посредников. Быстрые сроки (от 14 дней), контроль качества на каждом этапе, гибкие цены.",
  },
  {
    id: 3,
    icon: <FaLeaf />,
    title: "Экология как стандарт",
    description:
      "Используем материалы с сертификатами E0 и E1 (безопасны для детских и спален).",
  },
  {
    id: 4,
    icon: <FaTools />,
    title: "Дизайн без шаблонов",
    description:
      "Ваш шкаф, ваши правила: нестандартные размеры, скрытые ниши, подсветка, фурнитура-невидимка. ",
  },
];

const AdvantagesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="advantages-section" id="advantages">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="section-title">Наши преимущества</h2>
        <p className="section-b-subtitle">
          Почему клиенты выбирают ДИВИДНИ для создания своей мебели
        </p>
      </motion.div>

      <motion.div
        className="advantages-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {advantages.map((advantage) => (
          <motion.div
            key={advantage.id}
            className="advantage-card"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="advantage-icon">{advantage.icon}</div>
            <h3 className="advantage-title">{advantage.title}</h3>
            <p className="advantage-text">{advantage.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AdvantagesSection;
