
import { GoogleGenAI } from "@google/genai";
import { SearchParams } from "../types";

// Initialize the Gemini API
// process.env.GEMINI_API_KEY is automatically injected by the platform
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeProfileRisk = async (params: SearchParams): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o risco comportamental e de integridade para um perfil com os seguintes dados:
      Nome: ${params.fullName}
      Cidade: ${params.city}
      Estado: ${params.state}
      
      Forneça um relatório estruturado em Markdown, com tom profissional, luxuoso e confidencial. 
      Inclua seções como: "Resumo Executivo", "Exposição Digital", "Análise de Riscos" e "Recomendação Final".
      Use um tom de "Inteligência Estratégica".`,
      config: {
        systemInstruction: "Você é o Mentor Virtual Elite da plataforma Varão10. Seu tom é sofisticado, direto, masculino e focado em proteção de legado e integridade. Você fornece análises de risco baseadas em dados públicos simulados, sempre com cautela e profissionalismo.",
        temperature: 0.7,
      }
    });

    return response.text || "Erro ao gerar análise. Tente novamente.";
  } catch (error) {
    console.error("Error generating profile analysis:", error);
    // Fallback to mock if API fails or key is missing
    return `
# Relatório de Inteligência Varão10
**Perfil:** ${params.fullName}

O sistema identificou exposição moderada em redes sociais públicas.
Recomendamos cautela inicial e verificação de antecedentes em cartório local.

*Nota: Ocorreu um erro na conexão com a IA. Esta é uma análise de contingência.*
    `;
  }
};

export const getSupportiveAdvice = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "Você é o Mentor Virtual Elite da plataforma Varão10. Você oferece suporte emocional e conselhos estratégicos para homens que estão passando por momentos difíceis (divórcio, alienação parental, problemas de guarda, etc.). Seu tom é empático, mas firme, focado em resiliência, estoicismo e proteção do bem-estar dos filhos e do próprio homem. Nunca incentive violência ou ódio. Foque em soluções legais e psicológicas saudáveis.",
        temperature: 0.8,
      }
    });

    return response.text || "Mantenha a calma, irmão. O sistema está processando sua mensagem.";
  } catch (error) {
    console.error("Error generating supportive advice:", error);
    return "Mantenha a cabeça fria, irmão. Foque no que você controla e não deixe emoções passageiras ditarem suas ações. (Nota: Erro de conexão com o Mentor)";
  }
};
