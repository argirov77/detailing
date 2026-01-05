"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const QUIZ_ENDPOINT =
  process.env.NEXT_PUBLIC_QUIZ_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbw7OLx9GbFH3XvsfgtycQ8B0CSPf2VawKi5cttVB2DH7eH4hFmjdMGcbkFSQ6xr72dF/exec";

const quizCopy = {
  bg: {
    step: (current, total) => `Стъпка ${current}/${total}`,
    welcome: {
      title: "Здравей! Аз съм Алекс от SVA Детейлинг.",
      text: "Отговори на 3 кратки стъпки и ще ти предложа най-подходящия пакет и ориентировъчна цена.",
      note: "Отнема ~30 секунди.",
      cta: "Започни",
    },
    category: {
      title: "Какво искаш да направим по колата?",
      subtitle: "Избери основното — продължаваме веднага.",
      options: {
        polish: "Полиране",
        interior: "Химическо почистване",
        full: "Комплекс",
        other: "Друго (конкретна задача)",
      },
      otherPlaceholder: "Напр. “махни драскотина”, “полирай фарове”, “премахни миризма”",
      otherCta: "OK",
    },
    packages: {
      title: "Избери пакет (разликата е в дълбочината и времето).",
      continue: "Продължи",
      badges: {
        restartPlus: "Най-избиран",
        fullRestart: "Премиум",
      },
      cards: {
        restart: {
          title: "Restart",
          bullets: [
            "Освежаване + видим ефект",
            "Подходящ за поддържани автомобили",
            "Бърз резултат",
          ],
        },
        restartPlus: {
          title: "Restart+",
          bullets: [
            "По-дълбока обработка",
            "По-силен “преди/след” ефект",
            "Най-добра стойност",
          ],
        },
        fullRestart: {
          title: "Full Restart",
          bullets: [
            "Максимална дълбочина",
            "След покупка / “като нова” визия",
            "Най-дълготраен ефект",
          ],
        },
      },
    },
    details: {
      title: "Детайли за автомобила",
      labels: {
        brand: "Марка",
        model: "Модел",
        year: "Година",
        color: "Цвят",
        name: "Име",
        phone: "Телефон",
        comment: "Коментар (по желание)",
      },
      placeholders: {
        brand: "Избери или напиши марка",
        model: "Избери или напиши модел",
        year: "напр. 2020",
        color: "Избери цвят",
        name: "Твоето име",
        phone: "Телефон за контакт",
        comment: "Специални изисквания, удобни часове...",
        search: "Търси...",
        notListed: "Няма го в списъка",
      },
      colors: ["Черно", "Бяло", "Сиво", "Сребърно", "Синьо", "Червено", "Зелено", "Жълто", "Кафяво", "Друго"],
      submit: "Изпрати",
      sending: "Изпращане...",
      error: "Моля, попълни задължителните полета.",
      missingFieldsLabel: "Липсващи полета:",
      invalidYear: "Моля, въведи валидна година между 1980 и 2026.",
      requiredLabels: {
        service: "Услуга",
        package: "Пакет",
        otherTask: "Задача",
      },
    },
    success: {
      title: "Получих заявката!",
      text: "Ще ти се обадя скоро с препоръка и ориентировъчна цена.",
      cta: "Затвори",
    },
  },
  ru: {
    step: (current, total) => `Шаг ${current}/${total}`,
    welcome: {
      title: "Привет! Я Алекс из SVA Detailing.",
      text: "Ответь на 3 коротких шага — подберу лучший пакет и дам ориентир по цене.",
      note: "Займёт ~30 секунд.",
      cta: "Начать",
    },
    category: {
      title: "Что нужно сделать с автомобилем?",
      subtitle: "Выберите основное — продолжим сразу.",
      options: {
        polish: "Полировка",
        interior: "Химчистка",
        full: "Комплекс",
        other: "Другое (конкретная задача)",
      },
      otherPlaceholder: "Например: “убрать царапину”, “полировка фар”, “убрать запах”",
      otherCta: "ОК",
    },
    packages: {
      title: "Выберите пакет (разница — в глубине и времени).",
      continue: "Далее",
      badges: {
        restartPlus: "Самый популярный",
        fullRestart: "Премиум",
      },
      cards: {
        restart: {
          title: "Restart",
          bullets: [
            "Освежение и заметный эффект",
            "Для ухоженных авто",
            "Быстрый результат",
          ],
        },
        restartPlus: {
          title: "Restart+",
          bullets: [
            "Глубже обработка",
            "Сильнее “до/после”",
            "Лучшая цена/результат",
          ],
        },
        fullRestart: {
          title: "Full Restart",
          bullets: [
            "Максимальная глубина",
            "После покупки / “как новая”",
            "Самый долгий эффект",
          ],
        },
      },
    },
    details: {
      title: "Детали автомобиля",
      labels: {
        brand: "Марка",
        model: "Модель",
        year: "Год",
        color: "Цвет",
        name: "Имя",
        phone: "Телефон",
        comment: "Комментарий (необязательно)",
      },
      placeholders: {
        brand: "Выберите или введите марку",
        model: "Выберите или введите модель",
        year: "напр. 2020",
        color: "Выберите цвет",
        name: "Ваше имя",
        phone: "Телефон для связи",
        comment: "Спец. пожелания, удобное время...",
        search: "Поиск...",
        notListed: "Нет в списке",
      },
      colors: ["Чёрный", "Белый", "Серый", "Серебристый", "Синий", "Красный", "Зелёный", "Жёлтый", "Коричневый", "Другой"],
      submit: "Отправить",
      sending: "Отправка...",
      error: "Пожалуйста, заполните обязательные поля.",
      missingFieldsLabel: "Не заполнены поля:",
      invalidYear: "Введите год в диапазоне 1980–2026.",
      requiredLabels: {
        service: "Услуга",
        package: "Пакет",
        otherTask: "Задача",
      },
    },
    success: {
      title: "Заявка получена!",
      text: "Я скоро свяжусь с рекомендацией и ориентировочной ценой.",
      cta: "Закрыть",
    },
  },
  en: {
    step: (current, total) => `Step ${current}/${total}`,
    welcome: {
      title: "Hi! I’m Alex from SVA Detailing.",
      text: "Complete 3 quick steps and I’ll recommend the best package with a rough price range.",
      note: "Takes ~30 seconds.",
      cta: "Start",
    },
    category: {
      title: "What do you want to improve?",
      subtitle: "Pick the main goal — we’ll continue right away.",
      options: {
        polish: "Polishing",
        interior: "Interior deep clean",
        full: "Full package",
        other: "Other (specific request)",
      },
      otherPlaceholder: "e.g. “remove scratch”, “restore headlights”, “remove odor”",
      otherCta: "OK",
    },
    packages: {
      title: "Choose a package (depth & time differ).",
      continue: "Continue",
      badges: {
        restartPlus: "Most popular",
        fullRestart: "Premium",
      },
      cards: {
        restart: {
          title: "Restart",
          bullets: [
            "Refresh + visible improvement",
            "Great for maintained cars",
            "Quick result",
          ],
        },
        restartPlus: {
          title: "Restart+",
          bullets: [
            "Deeper work",
            "Stronger before/after",
            "Best value",
          ],
        },
        fullRestart: {
          title: "Full Restart",
          bullets: [
            "Maximum depth",
            "After purchase / “like new”",
            "Longest-lasting",
          ],
        },
      },
    },
    details: {
      title: "Vehicle details",
      labels: {
        brand: "Brand",
        model: "Model",
        year: "Year",
        color: "Color",
        name: "Name",
        phone: "Phone",
        comment: "Comment (optional)",
      },
      placeholders: {
        brand: "Choose or type brand",
        model: "Choose or type model",
        year: "e.g. 2020",
        color: "Choose color",
        name: "Your name",
        phone: "Phone number",
        comment: "Special requests, preferred time...",
        search: "Search...",
        notListed: "Not listed",
      },
      colors: ["Black", "White", "Gray", "Silver", "Blue", "Red", "Green", "Yellow", "Brown", "Other"],
      submit: "Send",
      sending: "Sending...",
      error: "Please fill in the required fields.",
      missingFieldsLabel: "Missing fields:",
      invalidYear: "Enter a valid year between 1980 and 2026.",
      requiredLabels: {
        service: "Service",
        package: "Package",
        otherTask: "Task",
      },
    },
    success: {
      title: "Request received!",
      text: "I’ll get back to you soon with a recommendation and price range.",
      cta: "Close",
    },
  },
};

const carData = [
  { brand: "BMW", models: ["1 Series", "3 Series", "5 Series", "X3", "X5", "X7", "Z4"] },
  { brand: "Mercedes-Benz", models: ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE", "S-Class"] },
  { brand: "Audi", models: ["A1", "A3", "A4", "A6", "Q3", "Q5", "Q7"] },
  { brand: "Volkswagen", models: ["Golf", "Passat", "Tiguan", "Polo", "Touareg", "Arteon"] },
  { brand: "Skoda", models: ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq"] },
  { brand: "SEAT", models: ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco"] },
  { brand: "Opel", models: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland"] },
  { brand: "Ford", models: ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Mustang"] },
  { brand: "Toyota", models: ["Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Land Cruiser"] },
  { brand: "Nissan", models: ["Micra", "Qashqai", "X-Trail", "Juke", "Leaf"] },
  { brand: "Hyundai", models: ["i20", "i30", "Tucson", "Santa Fe", "Kona"] },
  { brand: "Kia", models: ["Rio", "Ceed", "Sportage", "Sorento", "Stonic"] },
  { brand: "Renault", models: ["Clio", "Megane", "Talisman", "Captur", "Kadjar", "Arkana"] },
  { brand: "Peugeot", models: ["208", "308", "508", "2008", "3008", "5008"] },
  { brand: "Citroën", models: ["C3", "C4", "C5 Aircross", "Berlingo", "C-Elysée"] },
  { brand: "Honda", models: ["Civic", "Accord", "CR-V", "HR-V", "Jazz"] },
  { brand: "Mazda", models: ["Mazda2", "Mazda3", "Mazda6", "CX-30", "CX-5"] },
  { brand: "Volvo", models: ["S60", "S90", "XC40", "XC60", "XC90"] },
  { brand: "Fiat", models: ["500", "Panda", "Tipo", "500X", "Doblo"] },
  { brand: "Dacia", models: ["Sandero", "Logan", "Duster", "Jogger", "Spring"] },
  { brand: "Mitsubishi", models: ["Space Star", "ASX", "Eclipse Cross", "Outlander", "L200"] },
  { brand: "Suzuki", models: ["Swift", "Vitara", "S-Cross", "Jimny", "Ignis"] },
  { brand: "Mini", models: ["Cooper", "Countryman", "Clubman", "Cabrio"] },
  { brand: "Tesla", models: ["Model 3", "Model S", "Model X", "Model Y"] },
];

const stepImages = {
  1: "/images/quiz/png/welcome.png",
  2: "/images/quiz/png/point.png",
  3: "/images/quiz/png/introduction.png",
  4: "/images/quiz/png/book.png",
  success: "/images/quiz/png/like.png",
};

export default function QuizWizard({ open, onClose }) {
  const { language } = useLanguage();
  const copy = quizCopy[language] ?? quizCopy.en;
  const totalSteps = 4;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceCategory: "",
    serviceOtherText: "",
    package: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    carColor: "",
    name: "",
    phone: "",
    comment: "",
    website: "",
  });
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [showBrandList, setShowBrandList] = useState(false);
  const [showModelList, setShowModelList] = useState(false);
  const [manualBrand, setManualBrand] = useState(false);
  const [manualModel, setManualModel] = useState(false);
  const [contentAnimating, setContentAnimating] = useState(false);
  const [imageStack, setImageStack] = useState([
    { src: stepImages[1], id: 0, visible: true },
  ]);

  const overlayRef = useRef(null);
  const autoAdvanceRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    const scrollY = window.scrollY;
    const { overflow, position, top, width } = document.body.style;

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  useEffect(() => {
    setContentAnimating(true);
    const timeout = setTimeout(() => setContentAnimating(false), 220);
    return () => clearTimeout(timeout);
  }, [step]);

  const displayedImage = step === "success" ? stepImages.success : stepImages[step];

  useEffect(() => {
    setImageStack((prev) => {
      const nextId = prev[0]?.id + 1 || 0;
      if (prev[0]?.src === displayedImage) return prev;
      const nextLayer = { src: displayedImage, id: nextId, visible: true };
      const fadingLayer = { ...prev[0], visible: false };
      const layers = [nextLayer];
      if (fadingLayer.src) layers.push(fadingLayer);
      return layers;
    });
    const cleanup = setTimeout(() => {
      setImageStack((prev) => [prev[0]]);
    }, 220);
    return () => clearTimeout(cleanup);
  }, [displayedImage]);

  useEffect(() => () => autoAdvanceRef.current && clearTimeout(autoAdvanceRef.current), []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const scrollToTop = () => {
      if (typeof container.scrollTo === "function") {
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        container.scrollTop = 0;
      }
    };

    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(scrollToTop);
    } else {
      scrollToTop();
    }
  }, [step]);

  const filteredBrands = useMemo(() => {
    return carData
      .filter((item) =>
        item.brand.toLowerCase().includes((brandQuery || "").toLowerCase())
      )
      .slice(0, 25);
  }, [brandQuery]);

  const filteredModels = useMemo(() => {
    const currentBrand = carData.find((b) => b.brand === formData.carBrand);
    const models = currentBrand?.models || [];
    return models.filter((model) =>
      model.toLowerCase().includes((modelQuery || "").toLowerCase())
    );
  }, [formData.carBrand, modelQuery]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  const goToStep = (nextStep) => {
    setErrors("");
    setStep(nextStep);
  };

  const getMissingFields = () => {
    const missing = [];

    if (!formData.serviceCategory) missing.push(copy.details.requiredLabels.service);
    if (formData.serviceCategory === "other" && !formData.serviceOtherText.trim()) {
      missing.push(copy.details.requiredLabels.otherTask);
    }
    if (!formData.package) missing.push(copy.details.requiredLabels.package);
    if (!formData.carBrand) missing.push(copy.details.labels.brand);
    if (!formData.carModel) missing.push(copy.details.labels.model);
    if (!formData.carYear) missing.push(copy.details.labels.year);
    if (!formData.carColor) missing.push(copy.details.labels.color);
    if (!formData.name) missing.push(copy.details.labels.name);
    if (!formData.phone) missing.push(copy.details.labels.phone);

    return missing.filter(Boolean);
  };

  const handleCategorySelect = (value) => {
    setFormData((prev) => ({ ...prev, serviceCategory: value }));
    setErrors("");
    if (value === "other") return;
    autoAdvanceRef.current = setTimeout(() => goToStep(3), 300);
  };

  const handlePackageSelect = (value) => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    setFormData((prev) => ({ ...prev, package: value }));
    autoAdvanceRef.current = setTimeout(() => goToStep(4), 600);
  };

  const validateStep4 = () => {
    const missingFields = getMissingFields();
    if (missingFields.length) {
      return `${copy.details.missingFieldsLabel} ${missingFields.join(", ")}`;
    }

    const yearNumber = Number(formData.carYear);
    if (Number.isNaN(yearNumber) || yearNumber < 1980 || yearNumber > 2026) {
      return copy.details.invalidYear;
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateStep4();
    if (validationError) {
      setErrors(validationError);
      return;
    }
    setErrors("");
    setIsSubmitting(true);
    const payload = {
      createdAt: new Date().toISOString(),
      lang: language,
      serviceCategory: formData.serviceCategory,
      serviceOtherText:
        formData.serviceCategory === "other" ? formData.serviceOtherText : "",
      package: formData.package,
      carBrand: formData.carBrand,
      carModel: formData.carModel,
      carYear: formData.carYear,
      carColor: formData.carColor,
      name: formData.name,
      phone: formData.phone,
      comment: formData.comment,
    };

    console.log("POST QUIZ →", QUIZ_ENDPOINT);
    console.log("payload", payload);

    const params = new URLSearchParams(payload);

    try {
      const response = await fetch(QUIZ_ENDPOINT, {
        method: "POST",
        body: params.toString(),
      });
      console.log("status", response.status);
      const text = await response.text();
      console.log("raw response", text);

      let data = null;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse quiz response", parseError);
      }

      const normalizedText = text.trim();
      const textHasOk = /"ok"\s*:\s*true/i.test(text);
      const isSuccess =
        data?.ok === true || response.ok === true || textHasOk || normalizedText === "OK";

      if (isSuccess) {
        setStep("success");
      } else {
        setErrors(copy.details.error);
      }
    } catch (error) {
      setErrors(copy.details.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtherConfirm = () => {
    if (!formData.serviceOtherText.trim()) {
      setErrors(copy.details.error);
      return;
    }
    goToStep(3);
  };

  const handleManualBrand = () => {
    setManualBrand(true);
    setShowBrandList(false);
    setFormData((prev) => ({ ...prev, carBrand: "", carModel: "" }));
  };

  const handleManualModel = () => {
    setManualModel(true);
    setShowModelList(false);
    setFormData((prev) => ({ ...prev, carModel: "" }));
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-white">{copy.welcome.title}</p>
          <p className="text-white/80">{copy.welcome.text}</p>
          <p className="text-sm text-white/60">{copy.welcome.note}</p>
          <button
            onClick={() => goToStep(2)}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#3b82f6] px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#2563eb]"
          >
            {copy.welcome.cta}
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{copy.category.title}</h3>
          <p className="text-white/70">{copy.category.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(["polish", "interior", "full", "other"]).map((key) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-white transition hover:border-white/30 hover:bg-white/10 ${
                  formData.serviceCategory === key ? "ring-2 ring-white/60" : ""
                }`}
              >
                {copy.category.options[key]}
              </button>
            ))}
          </div>
          {formData.serviceCategory === "other" && (
            <div className="space-y-2">
              <input
                type="text"
                value={formData.serviceOtherText}
                onChange={(e) => setFormData((prev) => ({ ...prev, serviceOtherText: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleOtherConfirm();
                }}
                placeholder={copy.category.otherPlaceholder}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleOtherConfirm}
                  className="rounded-lg bg-white/20 px-4 py-2 text-white transition hover:bg-white/30"
                >
                  {copy.category.otherCta}
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (step === 3) {
      const cards = ["restart", "restartPlus", "fullRestart"];
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{copy.packages.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cards.map((card) => {
              const selected = formData.package === card;
              const badge =
                card === "restartPlus"
                  ? copy.packages.badges.restartPlus
                  : card === "fullRestart"
                  ? copy.packages.badges.fullRestart
                  : "";
              const badgeStyle =
                card === "restartPlus"
                  ? "bg-gradient-to-r from-amber-300 to-orange-500 text-slate-900 shadow-md shadow-orange-500/30"
                  : card === "fullRestart"
                  ? "bg-gradient-to-r from-indigo-400 to-violet-600 text-white shadow-md shadow-indigo-500/30"
                  : "bg-white/15 text-white";
              const accentStyle =
                card === "restartPlus"
                  ? "from-amber-300/90 to-orange-500/80"
                  : card === "fullRestart"
                  ? "from-indigo-400/90 to-violet-700/80"
                  : "from-sky-300/90 to-cyan-400/80";
              return (
                <button
                  key={card}
                  onClick={() => handlePackageSelect(card)}
                  className={`group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-left text-white shadow-lg transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 hover:shadow-xl ${
                    selected ? "ring-2 ring-offset-2 ring-offset-[#0f172a] ring-white/70" : ""
                  }`}
                >
                  <span className={`h-1.5 w-full rounded-full bg-gradient-to-r ${accentStyle}`} />
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-lg font-semibold">{copy.packages.cards[card].title}</p>
                    {badge ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeStyle}`}
                      >
                        ✦ {badge}
                      </span>
                    ) : null}
                  </div>
                  <ul className="space-y-2 rounded-lg bg-white/5 p-3 text-sm text-white/80 ring-1 ring-inset ring-white/5">
                    {copy.packages.cards[card].bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full bg-gradient-to-br shadow-sm ${accentStyle} shadow-black/20`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => goToStep(2)}
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              ←
            </button>
            <button
              onClick={() => goToStep(4)}
              disabled={!formData.package}
              className="rounded-lg bg-white/20 px-5 py-2 text-white transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copy.packages.continue}
            </button>
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold text-white">{copy.details.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.brand}</label>
              {!manualBrand ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.carBrand || brandQuery}
                    onChange={(e) => {
                      setBrandQuery(e.target.value);
                      setFormData((prev) => ({ ...prev, carBrand: "", carModel: "" }));
                    }}
                    onFocus={() => setShowBrandList(true)}
                    placeholder={copy.details.placeholders.brand}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  />
                  {showBrandList && (
                    <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#0f172a]/95 text-white shadow-xl">
                      <div className="px-3 py-2 text-xs uppercase tracking-wide text-white/50">
                        {copy.details.placeholders.search}
                      </div>
                      {filteredBrands.map((item) => (
                        <button
                          key={item.brand}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, carBrand: item.brand, carModel: "" }));
                            setShowBrandList(false);
                            setBrandQuery(item.brand);
                          }}
                          className="flex w-full items-center px-4 py-2 text-left hover:bg-white/10"
                        >
                          {item.brand}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleManualBrand}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-white/80 hover:bg-white/10"
                      >
                        {copy.details.placeholders.notListed}
                        <span>↗</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={formData.carBrand}
                  onChange={(e) => setFormData((prev) => ({ ...prev, carBrand: e.target.value }))}
                  placeholder={copy.details.placeholders.brand}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.model}</label>
              {!manualModel && !manualBrand && !formData.carBrand ? (
                <div className="rounded-lg border border-dashed border-white/20 px-4 py-3 text-white/60">
                  {copy.details.placeholders.model}
                </div>
              ) : !manualModel && !manualBrand ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.carModel || modelQuery}
                    onChange={(e) => {
                      setModelQuery(e.target.value);
                      setFormData((prev) => ({ ...prev, carModel: "" }));
                    }}
                    onFocus={() => setShowModelList(true)}
                    placeholder={copy.details.placeholders.model}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  />
                  {showModelList && (
                    <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#0f172a]/95 text-white shadow-xl">
                      <div className="px-3 py-2 text-xs uppercase tracking-wide text-white/50">
                        {copy.details.placeholders.search}
                      </div>
                      {filteredModels.map((model) => (
                        <button
                          key={model}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, carModel: model }));
                            setShowModelList(false);
                            setModelQuery(model);
                          }}
                          className="flex w-full items-center px-4 py-2 text-left hover:bg-white/10"
                        >
                          {model}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleManualModel}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-white/80 hover:bg-white/10"
                      >
                        {copy.details.placeholders.notListed}
                        <span>↗</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={formData.carModel}
                  onChange={(e) => setFormData((prev) => ({ ...prev, carModel: e.target.value }))}
                  placeholder={copy.details.placeholders.model}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.year}</label>
              <input
                type="number"
                min="1980"
                max="2026"
                value={formData.carYear}
                onChange={(e) => setFormData((prev) => ({ ...prev, carYear: e.target.value }))}
                placeholder={copy.details.placeholders.year}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.color}</label>
              <select
                value={formData.carColor}
                onChange={(e) => setFormData((prev) => ({ ...prev, carColor: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-slate-900 text-white">
                  {copy.details.placeholders.color}
                </option>
                {copy.details.colors.map((color) => (
                  <option key={color} value={color} className="bg-slate-900 text-white">
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={copy.details.placeholders.name}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">{copy.details.labels.phone}</label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder={copy.details.placeholders.phone}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-white/70">{copy.details.labels.comment}</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder={copy.details.placeholders.comment}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>
          </div>
          {errors && <p className="text-sm text-red-300">{errors}</p>}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              ←
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#22c55e] px-6 py-2 font-semibold text-black shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? copy.details.sending : copy.details.submit}
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="space-y-3 text-white">
        <h3 className="text-2xl font-semibold">{copy.success.title}</h3>
        <p className="text-white/80">{copy.success.text}</p>
        <button
          onClick={onClose}
          className="rounded-lg bg-white/20 px-5 py-2 text-white transition hover:bg-white/30"
        >
          {copy.success.cta}
        </button>
      </div>
    );
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex min-h-[100dvh] items-end justify-center overflow-y-auto overscroll-contain bg-black/70 px-3 py-6 pb-[env(safe-area-inset-bottom)] backdrop-blur md:items-center"
    >
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#111827] shadow-2xl md:h-[80vh] md:max-h-[80vh] md:flex-row md:items-stretch">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 rounded-full bg-black/30 p-3 text-white transition hover:bg-black/45"
        >
          ✕
        </button>

        <div className="absolute inset-0 h-full w-full md:relative md:inset-auto md:h-auto md:w-5/12 md:min-h-full md:after:pointer-events-none md:after:absolute md:after:top-0 md:after:right-0 md:after:h-full md:after:w-14 md:after:bg-gradient-to-r md:after:from-transparent md:after:to-[#0f172a]/90">
          {imageStack.map((layer) => (
            <img
              key={layer.id}
              src={layer.src}
              alt="Founder"
              className={`absolute inset-0 h-full w-full scale-[1.03] object-cover transition-all duration-500 ease-out ${
                layer.visible ? "opacity-100" : "translate-y-1 opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 mt-auto flex w-full flex-col rounded-t-3xl border border-white/15 bg-white/10 bg-gradient-to-b from-white/12 to-white/6 px-4 py-4 shadow-2xl backdrop-blur-xl max-h-[78dvh] overflow-y-auto overscroll-contain md:-ml-6 md:mt-0 md:max-h-none md:flex-1 md:overflow-y-auto md:rounded-none md:border-0 md:bg-transparent md:px-7 md:py-8 md:shadow-none md:backdrop-blur-0"
        >
          {step !== "success" && (
            <div className="mb-4 flex items-center gap-3">
              <div className="text-sm font-semibold text-white/70">
                {copy.step(step, totalSteps)}
              </div>
              <div className="h-2 flex-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#3b82f6] transition-all duration-300"
                  style={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner transition-all duration-200 md:rounded-l-xl md:rounded-r-2xl ${
              contentAnimating ? "translate-y-2 opacity-70" : "opacity-100"
            }`}
          >
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

