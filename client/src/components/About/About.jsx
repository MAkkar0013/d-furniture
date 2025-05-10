import { FaAward, FaUsers, FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";
import aboutImage from "../../images/about.jpg";
import "./About.css";

const AboutSection = () => {
  // Варианты анимации
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
    <section className="about-section" id="about">
      <motion.div
        className="about-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="about-image" variants={itemVariants}>
          <img src={aboutImage} alt="Наше производство мебели" />
        </motion.div>

        <motion.div className="about-content" variants={itemVariants}>
          <motion.h2 className="about-title" variants={itemVariants}>
            О нашей компании
          </motion.h2>

          <motion.p className="about-text" variants={itemVariants}>
            15 лет назад мы начали создавать мебель, которая становится частью
            домашнего уюта и бизнес-успеха. "Дивидни" — это не просто
            производство корпусной мебели в Кургане и Тюмени. Это мастерство,
            доведенное до совершенства: от классических кухонь до смелых офисных
            решений. Мы верим, что мебель должна отражать характер своих
            владельцев, поэтому каждую деталь проектируем в диалоге с вами.
          </motion.p>

          <motion.p className="about-text" variants={itemVariants}>
            Наша философия - это внимание к деталям, использование только лучших
            материалов и индивидуальный подход к каждому клиенту. Мы создаем
            мебель, которая становится частью вашей жизни на долгие годы.
          </motion.p>

          <motion.div className="about-features" variants={itemVariants}>
            <motion.div className="feature-item" variants={itemVariants}>
              <FaAward className="feature-icon" />
              <span className="feature-text">15 лет на рынке</span>
            </motion.div>

            <motion.div className="feature-item" variants={itemVariants}>
              <FaUsers className="feature-icon" />
              <span className="feature-text">500+ довольных клиентов</span>
            </motion.div>

            <motion.div className="feature-item" variants={itemVariants}>
              <FaProjectDiagram className="feature-icon" />
              <span className="feature-text">150+ реализованных проектов</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
