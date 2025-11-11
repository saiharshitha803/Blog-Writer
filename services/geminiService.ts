
import { GoogleGenAI, Type } from "@google/genai";
import { FormData, ArticleOutline } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const outlineSchema = {
    type: Type.OBJECT,
    properties: {
        article_title: {
            type: Type.STRING,
            description: "The suggested, optimized final title for the article."
        },
        article_tone: {
            type: Type.STRING,
            description: "The confirmed tone used for the outline, from the user's input."
        },
        seo_summary: {
            type: Type.STRING,
            description: "A 2-sentence summary of the article's SEO focus and target audience."
        },
        sections: {
            type: Type.ARRAY,
            description: "A list of the main sections of the article. There should be a minimum of 5 sections.",
            items: {
                type: Type.OBJECT,
                properties: {
                    heading: {
                        type: Type.STRING,
                        description: "The main H2 section heading. It must be strong and include a primary keyword."
                    },
                    introduction: {
                        type: Type.STRING,
                        description: "A 2-3 sentence summary of what this section will cover."
                    },
                    sub_points: {
                        type: Type.ARRAY,
                        description: "A list of 4-6 detailed bullet points (H3/list items) covering the section's core content.",
                        items: { type: Type.STRING }
                    }
                },
                required: ['heading', 'introduction', 'sub_points']
            }
        },
        conclusion_summary: {
            type: Type.STRING,
            description: "A 3-sentence summary of the final concluding thought and a call to action."
        }
    },
    required: ['article_title', 'article_tone', 'seo_summary', 'sections', 'conclusion_summary']
};

export const generateOutline = async (formData: FormData): Promise<ArticleOutline> => {
    const systemInstruction = "You are an Expert Content Strategist and SEO Specialist. Your task is to generate a comprehensive and logically flowing article outline with a minimum of five (5) main sections. The output must be a valid JSON object matching the provided schema.";

    const prompt = `Please generate a blog post outline based on the following details:
- **Topic Title:** ${formData.topicTitle}
- **Detailed Topic Description:** ${formData.detailedTopic}
- **Target Audience:** ${formData.targetAudience}
- **Key SEO Keywords:** ${formData.seoKeywords}
- **Desired Tone:** ${formData.articleTone}

Follow the instructions and generate the outline in the required JSON format.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: outlineSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as ArticleOutline;

    } catch (error) {
        console.error("Error generating outline:", error);
        throw new Error("Failed to generate outline from Gemini API. Please check your API key and network connection.");
    }
};
