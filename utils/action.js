"use server";

import OpenAI from "openai";
import prisma from "./db";

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

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a ${city} in this ${country}.
  If ${city} in this ${country} exists, create a list of things families can do in this ${city}, ${country}. Once you have a list, create a one-day tour. Response should be in the following JSON format: {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "tile of the tour",
      "description": "description of the tour",
      "stops": ["short paragraph on the stop 1", "short paragraph on the stop 2", "short paragraph on the stop 3"]
    }
  } 
  If you can't find info on eact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return {"tour":null}, with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const tourData = JSON.parse(response.choices[0].message.content);
    if (!tourData.tour) {
      return null;
    }
    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });
    return tours;
  }
  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });
  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};
