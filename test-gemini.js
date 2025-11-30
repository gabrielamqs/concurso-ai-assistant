// Script de teste simples para verificar a API do Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function testGeminiAPI() {
  try {
    console.log('🔍 Testando API do Google Gemini...');

    const apiKey = process.env.VITE_GEMINI_API_KEY;
    console.log('API Key presente:', !!apiKey);
    console.log('API Key (primeiros 20 chars):', apiKey ? apiKey.substring(0, 20) + '...' : 'N/A');

    if (!apiKey) {
      console.error('❌ API Key não encontrada!');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ SDK inicializado');

    // Tentar diferentes modelos que podem estar disponíveis
    const modelsToTry = ['gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro', 'gemini-pro-vision'];

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Testando modelo: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        console.log(`✅ Modelo ${modelName} obtido`);

        console.log('🔄 Fazendo chamada de teste...');
        const result = await model.generateContent('Olá, você está funcionando? Responda apenas "Sim" se estiver.');
        const response = await result.response;
        const text = response.text();

        console.log('✅ Resposta recebida:', text);
        console.log(`🎉 Teste concluído com sucesso usando ${modelName}!`);
        return; // Sai da função se encontrou um modelo que funciona

      } catch (modelError) {
        console.log(`❌ Modelo ${modelName} falhou:`, modelError.message);
        continue; // Tenta o próximo modelo
      }
    }

    console.error('❌ Nenhum modelo funcionou. Todos os modelos testados falharam.');

  } catch (error) {
    console.error('❌ Erro geral no teste:', error);
    if (error.message) {
      console.error('Mensagem:', error.message);
    }
  }
}

testGeminiAPI();
