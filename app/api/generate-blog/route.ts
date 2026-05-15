import OpenAI from "openai";

const openai = new OpenAI({
  baseURL:
    "https://openrouter.ai/api/v1",

  apiKey:
    process.env.OPENROUTER_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { topic } =
      await req.json();

    const completion =
      await openai.chat.completions.create(
        {
          model:
            "deepseek/deepseek-chat",

          messages: [
            {
              role: "system",
              content:
                "You are a professional AI blog writer.",
            },

            {
              role: "user",
              content: `
Write a detailed modern blog article about:

${topic}

Structure:
- Introduction
- Main Concepts
- Real-world Applications
- Conclusion

Use markdown formatting.
`,
            },
          ],
        }
      );

    return Response.json({
      content:
        completion.choices[0]
          .message.content,
    });
  } catch (err) {
    console.log(err);

    return Response.json({
      error:
        "Failed to generate blog",
    });
  }
}