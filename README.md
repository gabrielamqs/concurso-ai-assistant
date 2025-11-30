
# ConcursoAI Chatbot Screens

This is a code bundle for ConcursoAI Chatbot Screens. The original project is available at https://www.figma.com/design/DPO4BqvHxlGQdEwVjDi2D5/ConcursoAI-Chatbot-Screens.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Google Gemini API:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `.env.example` to `.env.local`
   - Add your API key: `VITE_GEMINI_API_KEY=your_api_key_here`

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Features

- **Direct Gemini Integration**: Uses Google Gemini 2.0 Flash directly in the frontend for fast, powerful AI assistance
- **Edital-Specific AI**: Each conversation is tailored to the specific public exam edital
- **Study Planning**: AI generates personalized study plans based on edital requirements
- **Question Generation**: Creates realistic practice questions for the specific exam
- **Material Management**: Organize study materials with AI-powered insights
  