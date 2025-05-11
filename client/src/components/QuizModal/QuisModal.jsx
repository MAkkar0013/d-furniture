import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./QuizModal.css"; // Обычный CSS импорт

const QuizModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    furnitureType: "",
    style: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
  });

  // Показываем квиз 3 раза с интервалом
  useEffect(() => {
    if (showCount >= 3) return;

    const timer = setTimeout(
      () => {
        setIsOpen(true);
        setShowCount((c) => c + 1);
      },
      showCount === 0 ? 30000 : 60000
    );

    return () => clearTimeout(timer);
  }, [showCount]);

  const handleClose = () => {
    setIsOpen(false);
    if (step < 4) setStep(1);
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/quiz", answers);

      if (response.status === 200) {
        handleClose();
        alert(
          "Спасибо! Ваши ответы успешно отправлены. Мы свяжемся с вами в ближайшее время!"
        );
        setShowCount(10);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);

      let errorMessage =
        "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.";

      if (error.response) {
        // Сервер вернул ошибку
        errorMessage = error.response.data.error || errorMessage;

        // Показываем более детальные ошибки валидации
        if (error.response.status === 400) {
          errorMessage = "Пожалуйста, заполните все обязательные поля";
        }
      }

      alert(errorMessage);
    }
  };

  const questions = [
    {
      id: 1,
      text: "Какую мебель вы ищете?",
      name: "furnitureType",
      options: ["Кухню", "Гардероб", "Гостиную", "Спальню", "Другое"],
    },
    {
      id: 2,
      text: "Какой стиль предпочитаете?",
      name: "style",
      options: ["Классика", "Модерн", "Скандинавский", "Лофт", "Не знаю"],
    },
    {
      id: 3,
      text: "Ваш бюджет?",
      name: "budget",
      options: [
        "До 50 000 ₽",
        "50-100 тыс ₽",
        "100-200 тыс ₽",
        "Более 200 тыс ₽",
      ],
    },
    {
      id: 4,
      text: "Контактные данные",
      fields: [
        { name: "name", label: "Ваше имя", type: "text" },
        { name: "phone", label: "Телефон", type: "tel" },
        { name: "email", label: "Email", type: "email" },
      ],
    },
  ];

  const currentQuestion = questions[step - 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="quiz-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="quiz-modal-container"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button className="quiz-modal-close" onClick={handleClose}>
              &times;
            </button>

            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">Поможем выбрать мебель!</h3>
              <p className="quiz-modal-subtitle">
                Ответьте на 3 вопроса и получите персональный подбор
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="quiz-modal-body">
                <h4 className="quiz-question-text">{currentQuestion.text}</h4>

                {currentQuestion.options ? (
                  <div className="quiz-options-container">
                    {currentQuestion.options.map((option) => (
                      <label key={option} className="quiz-option-label">
                        <input
                          type="radio"
                          className="quiz-option-input"
                          name={currentQuestion.name}
                          value={option}
                          checked={answers[currentQuestion.name] === option}
                          onChange={handleChange}
                          required
                        />
                        <span className="quiz-option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="quiz-form-group">
                    {currentQuestion.fields.map((field) => (
                      <div key={field.name}>
                        <label className="quiz-form-label">{field.label}</label>
                        <input
                          type={field.type}
                          className="quiz-form-input"
                          name={field.name}
                          value={answers[field.name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="quiz-modal-footer">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="quiz-nav-button quiz-nav-button-back"
                  >
                    Назад
                  </button>
                )}

                <button
                  type={step < 4 ? "button" : "submit"}
                  onClick={step < 4 ? () => setStep(step + 1) : handleSubmit}
                  className={`quiz-nav-button ${
                    step < 4 ? "quiz-nav-button-next" : "quiz-nav-button-submit"
                  }`}
                  disabled={step < 4 && !answers[currentQuestion.name]}
                >
                  {step < 4 ? "Далее" : "Отправить"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
