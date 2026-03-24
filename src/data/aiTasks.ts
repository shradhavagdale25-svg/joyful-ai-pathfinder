export interface AITask {
  id: string;
  title: string;
  emoji: string;
  description: string;
  placeholder: string;
  defaultInput: string;
}

export const aiTasks: AITask[] = [
  {
    id: "sentiment",
    title: "Sentiment Analysis",
    emoji: "😊",
    description: "Detect the emotional tone of text — positive, negative, or neutral.",
    placeholder: "Enter text to analyze sentiment...",
    defaultInput: "I absolutely love learning about AI and machine learning! It's fascinating."
  },
  {
    id: "summarize",
    title: "Summarization",
    emoji: "📝",
    description: "Condense long text into a concise summary.",
    placeholder: "Enter text to summarize...",
    defaultInput: "Hugging Face is a technology company that develops tools for building applications using machine learning. It is most notable for its Transformers library built for natural language processing and its platform that allows users to share models and datasets. The company was founded in 2016 and has grown to become one of the most important platforms in the AI ecosystem."
  },
  {
    id: "translate",
    title: "Translation",
    emoji: "🌍",
    description: "Translate text from English to another language.",
    placeholder: "Enter English text to translate...",
    defaultInput: "Machine learning is transforming the way we interact with technology."
  },
  {
    id: "qa",
    title: "Question Answering",
    emoji: "❓",
    description: "Ask a question and get an answer based on context.",
    placeholder: "Enter your question...",
    defaultInput: "What is the Transformers library used for?"
  }
];

// Simulated AI responses
export function getSimulatedResponse(taskId: string, input: string): string {
  switch (taskId) {
    case "sentiment":
      if (input.match(/love|great|amazing|fantastic|wonderful|happy|excellent|fascinating/i)) {
        return "🟢 **Positive** (confidence: 94.2%)\n\nThe text expresses strong positive sentiment with enthusiastic language. Key indicators: emotional intensity words and exclamation marks suggest genuine excitement.";
      } else if (input.match(/hate|terrible|awful|bad|horrible|angry|sad|worst/i)) {
        return "🔴 **Negative** (confidence: 91.7%)\n\nThe text conveys negative sentiment. Detected negative emotional indicators and dissatisfaction markers.";
      }
      return "🟡 **Neutral** (confidence: 78.3%)\n\nThe text appears to be relatively neutral in tone, without strong positive or negative emotional indicators.";

    case "summarize":
      return "**Summary:** Hugging Face is a leading ML company known for its Transformers library (NLP) and its model/dataset sharing platform. Founded in 2016, it has become a cornerstone of the AI ecosystem.";

    case "translate":
      return "**🇫🇷 French:** L'apprentissage automatique transforme notre façon d'interagir avec la technologie.\n\n**🇪🇸 Spanish:** El aprendizaje automático está transformando la forma en que interactuamos con la tecnología.\n\n**🇩🇪 German:** Maschinelles Lernen verändert die Art und Weise, wie wir mit Technologie interagieren.";

    case "qa":
      return "**Answer:** The Transformers library is used for Natural Language Processing (NLP) tasks. It provides pre-trained models for text classification, translation, summarization, question answering, and text generation. It supports PyTorch, TensorFlow, and JAX frameworks.\n\n**Confidence:** 96.1%";

    default:
      return "Response generated successfully.";
  }
}
