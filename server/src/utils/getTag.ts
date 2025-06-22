import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getTags = async (url: string): Promise<string[]> => {
  try {
    const prompt = `Categorize the following webpage: ${url}
into {IMAGE, VIDEO, NEWS, BLOG, MUSIC, SOCIAL_MEDIA_POST}
- Return a JSON array of tags that best describe the content of the page.
- Only respond with a raw JSON array like ["BLOG", "NEWS"]
- Include extra tags if they are relevant, but do not include irrelevant tags.
- Highy recommend using more tags than specified
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0]?.message?.content || "[]";

    try {
      const tags = JSON.parse(content);
      if (Array.isArray(tags)) return tags;
    } catch (err) {
      console.warn("AI response wasn't valid JSON:", content);
    }

    return ["BLOG"]; // fallback default
  } catch (error) {
    console.error("Error getting tags:", error);
    return ["BLOG"]; // fallback default
  }
};
