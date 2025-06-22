import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const summarizeURL = async (url: string): Promise<string> => {
  try {
    const prompt = `Summarize the following webpage: ${url}
    Construct and concise a brief summary that captures the main points and key information from the content. The summary should be informative and easy to understand, suitable for someone who has not read the page. Focus on the most relevant details and avoid unnecessary fluff.
    `;
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "No summary available.";
  } catch (error) {
    console.error("Error summarizing URL:", error);
    throw new Error("Failed to summarize URL");
  }
};
