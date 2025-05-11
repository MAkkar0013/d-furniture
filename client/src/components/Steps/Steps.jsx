import { motion } from "framer-motion";
import "./Steps.css";
import img1 from "../../images/wardroab.webp";
import img3 from "../../images/livingroom.jpg";
import img4 from "../../images/bedroom.jpg";
import img5 from "../../images/kabinet.webp";
import img6 from "../../images/prixojia.webp";

const steps = [
  {
    id: 1,
    title: "Ваша идея → наш эскиз",
    description: "Бесплатный выезд замерщика, 3D-визуализация",
    image: img1,
  },
  {
    id: 2,
    title: "Договор без сюрпризов",
    description: "Фиксированная цена, поэтапная оплата",
    image: img3,
  },
  {
    id: 3,
    title: "Производство в Кургане",
    description: "",
    image: img4,
  },
  {
    id: 4,
    title: "Монтаж с ювелирной точностью",
    description: "Свои бригады, чистота после установки",
    image: img5,
  },
  {
    id: 5,
    title: "Гарантия от 1 до 5 лет",
    description: "Пожизненная поддержка",
    image: img6,
  },
];

const WorkSteps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="work-steps" id="steps">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="section-title">Как мы работаем</h2>
        <p className="section-subtitle">5 шагов к вашей мечте</p>
      </motion.div>

      <motion.div
        className="steps-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="connector"></div>

        {steps.map((step, index) => (
          <motion.div key={step.id} className="step" variants={itemVariants}>
            <div className="step-number">0{step.id}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
            <motion.img
              src={step.image}
              alt={step.title}
              className="step-image"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WorkSteps;
