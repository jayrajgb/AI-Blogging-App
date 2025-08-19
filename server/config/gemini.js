import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBlog(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

async function generateThumbnail(title) {
  try {
    const prompt =
      "Generate specifically an image as long as you go, for thumbnail for the topic: " +
      title;
    // Response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    // console.log("Full response structure:", JSON.stringify(response, null, 2));

    // Check if response exists and has the expected structure
    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error("No candidates in response");
      return "No response candidates found";
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      console.error("No content parts in response");
      return "No content parts found in response";
    }

    // console.log("Number of parts:", candidate.content.parts.length);

    // Process each part
    for (let i = 0; i < candidate.content.parts.length; i++) {
      const part = candidate.content.parts[i];
      console.log(`Part ${i}:`, Object.keys(part));

      // Check for image data (try different possible property names)
      if (part.inlineData && part.inlineData.data) {
        // console.log("Found image data via inlineData.data");
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");

        // Save with timestamp to avoid overwrites
        const filename = `thumbnail-${Date.now()}.png`;
        fs.writeFileSync(filename, buffer);
        console.log(`Image saved as ${filename}`);
        return buffer;
      }
      // Alternative property structure
      else if (part.inline_data && part.inline_data.data) {
        // console.log("Found image data via inline_data.data");
        const imageData = part.inline_data.data;
        const buffer = Buffer.from(imageData, "base64");

        // const filename = `thumbnail-${Date.now()}.png`;
        // fs.writeFileSync(filename, buffer);
        // console.log(`Image saved as ${filename}`);
        return buffer;
      }
      // Check if it's a blob or other image format
      else if (part.blob) {
        // console.log("Found image data via blob");
        // Handle blob data
        const buffer = Buffer.from(part.blob, "base64");
        // const filename = `thumbnail-${Date.now()}.png`;
        // fs.writeFileSync(filename, buffer);
        // console.log(`Image saved as ${filename}`);
        return buffer;
      }
      // Log text responses
      else if (part.text) {
        console.log("Text part:", part.text);
      }
      // Log unknown part types
      else {
        console.log("Unknown part type:", part);
      }
    }

    return "No image was generated in the response parts";
  } catch (error) {
    // console.error("Error in generateThumbnail:", error);
    return `Error: ${error.message}`;
  }
}

export { generateBlog, generateThumbnail };
