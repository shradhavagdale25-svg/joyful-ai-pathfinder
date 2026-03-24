export interface QuizOption {
  label: string;
  text: string;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface Lesson {
  id: number;
  title: string;
  emoji: string;
  content: string[];
  quiz: Quiz;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "What is Hugging Face?",
    emoji: "🤗",
    content: [
      "Hugging Face is an open-source AI platform that provides tools, models, and datasets for machine learning practitioners.",
      "Founded in 2016, it started as a chatbot company but pivoted to become the leading hub for sharing pre-trained models.",
      "Think of it as the 'GitHub for Machine Learning' — a place where researchers and developers collaborate on AI models.",
      "The platform hosts over 500,000+ models, 100,000+ datasets, and 100,000+ demo applications (Spaces)."
    ],
    quiz: {
      question: "What is Hugging Face often compared to?",
      options: [
        { label: "A", text: "A social media platform" },
        { label: "B", text: "GitHub for Machine Learning" },
        { label: "C", text: "A cloud computing service" },
        { label: "D", text: "A search engine" }
      ],
      correctAnswer: "B"
    }
  },
  {
    id: 2,
    title: "Transformers Library",
    emoji: "⚡",
    content: [
      "The Transformers library is Hugging Face's flagship open-source library for Natural Language Processing (NLP).",
      "It provides thousands of pre-trained models for tasks like text classification, translation, summarization, and question answering.",
      "The library supports PyTorch, TensorFlow, and JAX — making it framework-agnostic.",
      "With just a few lines of code, you can load a state-of-the-art model and start making predictions using the 'pipeline' API."
    ],
    quiz: {
      question: "Which frameworks does the Transformers library support?",
      options: [
        { label: "A", text: "Only PyTorch" },
        { label: "B", text: "Only TensorFlow" },
        { label: "C", text: "PyTorch, TensorFlow, and JAX" },
        { label: "D", text: "Only JAX and PyTorch" }
      ],
      correctAnswer: "C"
    }
  },
  {
    id: 3,
    title: "The Model Hub",
    emoji: "🏠",
    content: [
      "The Hugging Face Model Hub is a repository where the community shares pre-trained machine learning models.",
      "Each model has a dedicated page with documentation, usage examples, metrics, and a live inference widget.",
      "Models are organized by task (e.g., text-generation, image-classification), framework, language, and license.",
      "You can filter, search, and even try models directly in your browser before downloading them."
    ],
    quiz: {
      question: "What can you do on a model's page in the Hub?",
      options: [
        { label: "A", text: "Only download the model" },
        { label: "B", text: "View docs, metrics, and try live inference" },
        { label: "C", text: "Only read the research paper" },
        { label: "D", text: "Only view the source code" }
      ],
      correctAnswer: "B"
    }
  },
  {
    id: 4,
    title: "Datasets & Spaces",
    emoji: "📊",
    content: [
      "Hugging Face Datasets is a library for easily accessing and sharing datasets for ML and NLP tasks.",
      "It provides efficient data loading with memory-mapping, so you can work with datasets larger than your RAM.",
      "Hugging Face Spaces allows you to host and share ML demo apps built with Gradio or Streamlit.",
      "Spaces makes it easy to create interactive demos that anyone can try — no deployment knowledge needed."
    ],
    quiz: {
      question: "What are Hugging Face Spaces used for?",
      options: [
        { label: "A", text: "Storing large datasets" },
        { label: "B", text: "Training models from scratch" },
        { label: "C", text: "Hosting and sharing ML demo apps" },
        { label: "D", text: "Managing API keys" }
      ],
      correctAnswer: "C"
    }
  },
  {
    id: 5,
    title: "Fine-Tuning & Beyond",
    emoji: "🚀",
    content: [
      "Fine-tuning is the process of taking a pre-trained model and adapting it to a specific task using your own data.",
      "Hugging Face provides the Trainer API, which simplifies the fine-tuning process with built-in features like gradient accumulation, mixed precision, and distributed training.",
      "Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA allow you to fine-tune large models with minimal resources — updating only a small fraction of the model's parameters.",
      "The Hugging Face ecosystem also includes tools like Evaluate (for metrics), Accelerate (for distributed training), and Optimum (for hardware optimization)."
    ],
    quiz: {
      question: "What does PEFT (like LoRA) allow you to do?",
      options: [
        { label: "A", text: "Train models from scratch faster" },
        { label: "B", text: "Fine-tune large models with minimal resources" },
        { label: "C", text: "Deploy models to mobile devices" },
        { label: "D", text: "Convert models between frameworks" }
      ],
      correctAnswer: "B"
    }
  }
];
