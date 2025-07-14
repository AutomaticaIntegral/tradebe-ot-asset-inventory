
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Asset } from "../types";

// This is a sample of the raw, messy OCR text from the document.
const rawOcrText = `
PC_planta
A140
Planta
Siemens
PC
PC Station
PC_EVAPORADOR
10.42.224.232
255.255.254.0
10.42.224.1
00-1C-42-00-00-08
A120_CGAS_PLC A120 CALDERA GAS Siemens PLC 1200 CPU 1214C AC/DC/Rly 192.168.1.172 255.255.255.0 0.0.0.0 EO:DC:A0:B0:BD:E2 1 6ES7 214-1BG40-0XB0 SV-M2BP9306 V04.07.00.00.00.01.00 10 a120_cgas_pic a120xbcgasxbplc47e6 PLC Caldera Img\\A120 CGAS PLC.JPEG https://maps.google 41°20'31.6"N 2°09'31.9"E
A120_CGAS_UOP A120 CALDERA GAS Siemens HIMI KTP700 KTP700 Basic 192.168.1.173 255.255.255.0 0.0.0.0 EO:DC:AD:F7:20:BF 6AV2 123-2GB03-0AXO 17.00.00.00 42.01 0 a120_cgas_uoр a120xbcgasxbuop7bb7 HMI Caldera img A120 CGAS UOP.JPEG https://maps.google 41°20'30.4"N 2°09'34.3"E
`;

// This response schema tells the Gemini model how to structure the output JSON.
const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'Unique device identifier (e.g., A120_CGAS_PLC)' },
      zona: { type: Type.STRING, description: 'Area where the device is located (e.g., A120)' },
      fabricante: { type: Type.STRING, description: 'Manufacturer of the device (e.g., Siemens)' },
      subcategoria: { type: Type.STRING, description: 'Main category like PLC, HMI, PC, Switch' },
      categoria: { type: Type.STRING, description: 'More specific category (e.g., 1200, KTP700)' },
      deviceType: { type: Type.STRING, description: 'Specific model or type (e.g., CPU 1214C)' },
      ipAddress: { type: Type.STRING, description: 'IP Address of the device' },
      gateway: { type: Type.STRING, description: 'Gateway IP address' },
      macAddress: { type: Type.STRING, description: 'MAC Address of the device' },
      serialNumber: { type: Type.STRING, description: 'Serial number of the device' },
      firmware: { type: Type.STRING, description: 'Firmware version' },
      notes: { type: Type.STRING, description: 'Additional notes or description' },
      criticidad: { type: Type.STRING, description: 'Criticality level: Alta, Media, Baja, or Seguridad' },
    },
    required: ["id", "zona", "fabricante", "subcategoria", "deviceType", "ipAddress", "criticidad"]
  }
};

/**
 * Processes raw OCR text into a structured array of Asset objects using the Gemini API.
 * @param text The raw text to process.
 * @returns A promise that resolves to an array of Asset objects.
 */
export async function processInventoryWithGemini(text: string): Promise<Asset[]> {
  // Ensure the API key is available. In a real app, this would be in a secure environment.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert data processing AI specializing in Industrial Control Systems.
    The following is raw OCR text from a spreadsheet of OT assets.
    Your task is to parse this text and convert it into a clean, valid JSON array of objects based on the provided schema.

    - The columns are not always aligned correctly. Infer the values based on context.
    - Some devices like switches might not have an IP address; use "N/A" for missing values.
    - Infer the 'criticidad' (criticality) based on the device type: PLCs are 'Alta', HMIs are 'Media', Switches are 'Baja', etc., unless otherwise specified.
    - Clean up any OCR errors or extra characters.

    Here is the text to process:
    ---
    ${text}
    ---
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);
    
    // Additional validation could be done here before returning
    return parsedData as Asset[];

  } catch (error) {
    console.error("Error processing data with Gemini API:", error);
    // Fallback or error handling
    return [];
  }
}

// Example of how you might call this function.
// import { assets } from '../data/assetData';
// processInventoryWithGemini(rawOcrText).then(processedAssets => {
//   console.log('Processed assets:', processedAssets);
// }).catch(e => {
//   console.log("Running in dev mode without API key. Using mock data.");
//   console.log('Mock assets:', assets);
// });
