export const QUIZ_QUESTIONS = [
  {
    id: 1,
    stepTitle: "Target Product",
    question: "Какой цифровой продукт вы хотите создавать в первую очередь?",
    subtitle: "Выберите направление, которое заряжает вас наибольшей энергией",
    options: [
      {
        id: 'web',
        title: "Веб-сервисы и SaaS платформы",
        desc: "Личные кабинеты, интернет-магазины, порталы с базой данных",
        icon: "Globe",
        weight: { web: 3, vibe: 2 }
      },
      {
        id: 'ai',
        title: "ИИ-агенты и умные нейросети",
        desc: "Чат-боты с памятью, LLM-пайплайны, RAG-поиск по документам",
        icon: "Bot",
        weight: { ai: 3, vibe: 2 }
      },
      {
        id: 'vibe',
        title: "Быстрые стартапы и MVP за дни",
        desc: "Мгновенный запуск идей в продакшн через Cursor, Claude и AI",
        icon: "Sparkles",
        weight: { vibe: 3, web: 1 }
      },
      {
        id: 'mobile',
        title: "Мобильные приложения (iOS & Android)",
        desc: "Приложения в App Store и Google Play с единой кодовой базой",
        icon: "Smartphone",
        weight: { mobile: 3, web: 1 }
      }
    ]
  },
  {
    id: 2,
    stepTitle: "Background",
    question: "Какой у вас текущий уровень в разработке?",
    subtitle: "Мы подберем программу под ваш реальный стартовый порог",
    options: [
      {
        id: 'beginner',
        title: "Полный новичок с нуля",
        desc: "Никогда не писал код, но есть страсть освоить технологии 2026",
        icon: "Compass",
        weight: { vibe: 2, web: 2 }
      },
      {
        id: 'knows_basics',
        title: "Знаю базовые основы синтаксиса",
        desc: "Смотрел уроки на YouTube, экспериментировал со скриптами",
        icon: "BookOpen",
        weight: { web: 2, ai: 2 }
      },
      {
        id: 'product_designer',
        title: "Дизайнер / Продакт-менеджер",
        desc: "Хочу самостоятельно создавать рабочие фичи и запускать MVP",
        icon: "Palette",
        weight: { vibe: 3 }
      },
      {
        id: 'coder_upgrading',
        title: "Практикующий разработчик",
        desc: "Хочу автоматизировать разработку в 5-10 раз с помощью AI",
        icon: "Code2",
        weight: { ai: 3, vibe: 3 }
      }
    ]
  },
  {
    id: 3,
    stepTitle: "Task Logic",
    question: "Какой тип задач приносит вам максимальный кайф?",
    subtitle: "Что способно увлечь вас на много часов непрерывной работы?",
    options: [
      {
        id: 'visual',
        title: "Дизайн интерфейса и интерактивность",
        desc: "Когда анимации плавные, цвета гармоничные, а UI безупречен",
        icon: "Layout",
        weight: { web: 3, mobile: 2 }
      },
      {
        id: 'architect',
        title: "Алгоритмы, структуры данных и AI",
        desc: "Архитектура, анализ больших данных и обучение моделей",
        icon: "Cpu",
        weight: { ai: 3 }
      },
      {
        id: 'builder',
        title: "Запуск готового продукта для людей",
        desc: "Сделать сервис за выходные, подключить платежи и запустить",
        icon: "Rocket",
        weight: { vibe: 3 }
      },
      {
        id: 'security',
        title: "Серверная надежность и базы данных",
        desc: "PostgreSQL, API-безопасность и отказоустойчивость серверов",
        icon: "Server",
        weight: { web: 2, ai: 2 }
      }
    ]
  },
  {
    id: 4,
    stepTitle: "Time Capacity",
    question: "Сколько часов в неделю вы готовы уделять практике?",
    subtitle: "В KnewIT 80% времени — это реальное создание проектов",
    options: [
      {
        id: 'light',
        title: "5–8 часов в неделю",
        desc: "В вечернее время, совмещая с основной работой или университетом",
        icon: "Clock",
        weight: { vibe: 2 }
      },
      {
        id: 'medium',
        title: "10–18 часов в неделю",
        desc: "Оптимальный темп: занятия в кампусе + домашняя разработка",
        icon: "Zap",
        weight: { web: 2, vibe: 2, ai: 2 }
      },
      {
        id: 'intensive',
        title: "20+ часов (Полное погружение)",
        desc: "Готов учиться в кампусе Алматы полный день для скорейшего оффера",
        icon: "Flame",
        weight: { ai: 2, web: 2, vibe: 2 }
      }
    ]
  },
  {
    id: 5,
    stepTitle: "Primary Goal",
    question: "Какова ваша главная цель на 2026 год?",
    subtitle: "Мы выстроим индивидуальный трек под ваш целевой результат",
    options: [
      {
        id: 'job_kz',
        title: "Оффер в IT-компанию Казахстана",
        desc: "Kaspi, Kolesa Group, Choco, банковский сектор или финтех",
        icon: "Briefcase",
        weight: { web: 3, ai: 2 }
      },
      {
        id: 'startup',
        title: "Запуск своего стартапа в Astana Hub",
        desc: "Привлечение первых грантов, инвестиций и запуск первых пользователей",
        icon: "Target",
        weight: { vibe: 3 }
      },
      {
        id: 'freelance',
        title: "Удаленный международный фриланс",
        desc: "Заказы со всего мира (Upwork, зарубежные контракты) с доходом в $ / ₸",
        icon: "Plane",
        weight: { web: 2, vibe: 3 }
      },
      {
        id: 'salary_boost',
        title: "Рост текущего дохода за счет ИИ",
        desc: "Стать незаменимым специалистом, автоматизировав рутину",
        icon: "TrendingUp",
        weight: { ai: 3, vibe: 2 }
      }
    ]
  }
];

export const COURSE_CATALOG = {
  vibe: {
    id: 'vibe',
    title: "AI & Vibe Coding Bootcamp 2026",
    badge: "ФЛАГМАН • ХИТ 2026",
    subtitle: "Создание работающих сервисов и стартапов со скоростью мысли через Cursor, Claude 3.5 Sonnet и Supabase",
    duration: "4 недели (Интенсив)",
    matchScore: 98,
    salaryAvg: "850 000 ₸ / мес",
    campusFormat: "Кампус Алматы (ул. Манаса 34/1) + Онлайн",
    techStack: ["Cursor IDE", "Claude 3.5 Sonnet", "React", "Supabase", "Vercel", "Tailwind CSS"],
    highlights: [
      "С нуля до 3 работающих веб-приложений в портфолио за 30 дней",
      "Управление кодовой базой через AI-агентов и системные промпты",
      "Готовый запуск в продакшн с базой данных и авторизацией",
      "Прямой доступ к комьюнити фаундеров и менторов Алматы"
    ]
  },
  web: {
    id: 'web',
    title: "Full-Stack Web Developer (React + Node.js)",
    badge: "КЛАССИЧЕСКАЯ ПРОГРАММА",
    subtitle: "Фундаментальная подготовка веб-разработчика для работы в продуктовых компаниях Казахстана",
    duration: "4 месяца",
    matchScore: 94,
    salaryAvg: "650 000 — 1 200 000 ₸",
    campusFormat: "Кампус Алматы (ул. Манаса 34/1)",
    techStack: ["JavaScript", "TypeScript", "React 19", "Node.js", "PostgreSQL", "Next.js"],
    highlights: [
      "Глубокое понимание чистого JS, React хуков и состояния",
      "Построение REST API, аутентификации JWT и работа с SQL",
      "Подготовка к техническим собеседованиям в Kaspi и Kolesa",
      "Дипломный проект уровня Middle-разработчика"
    ]
  },
  ai: {
    id: 'ai',
    title: "AI Engineer & Python Specialist",
    badge: "ВЫСОКИЙ ДОХОД",
    subtitle: "Проектирование нейросетевых пайплайнов, LLM-интеграций, RAG-систем и автономных агентов",
    duration: "3 месяца",
    matchScore: 92,
    salaryAvg: "950 000 — 1 800 000 ₸",
    campusFormat: "Кампус Алматы + Онлайн лаборатория",
    techStack: ["Python 3.12", "FastAPI", "LangChain", "OpenAI API", "Vector DBs", "Docker"],
    highlights: [
      "Разработка RAG систем для поиска по закрытым корпоративным базам",
      "Создание AI-ассистентов с памятью и интеграцией в Telegram/CRM",
      "Тонкая настройка (Fine-tuning) открытых моделей Llama 3",
      "Стажировка в партнерских AI-лабораториях"
    ]
  },
  mobile: {
    id: 'mobile',
    title: "Mobile App Developer (Flutter & Dart)",
    badge: "КРОССПЛАТФОРМА",
    subtitle: "Создание современных кроссплатформенных приложений для iOS и Android с единой кодовой базой",
    duration: "3.5 месяца",
    matchScore: 89,
    salaryAvg: "700 000 — 1 300 000 ₸",
    campusFormat: "Кампус Алматы (ул. Манаса 34/1)",
    techStack: ["Flutter", "Dart", "Firebase", "State Management", "App Store Deploy"],
    highlights: [
      "Публикация реального приложения в App Store и Google Play",
      "Интеграция Kaspi Pay, Apple Pay и push-уведомлений",
      "Плавные 120 FPS анимации и работа в оффлайн-режиме",
      "Портфолио из 4 коммерческих кейсов"
    ]
  }
};
