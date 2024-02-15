"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessage) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a helpful assistant" },
        ...chatMessage,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
