import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { EnhancementOptions, DEFAULT_ENHANCEMENT_OPTIONS } from "@/types/enhancement";
import { buildEnhancementRequirements, createEnhancementPrompt, createFallbackResponse } from "@/lib/enhancement-utils";
import { cleanAndParseJson } from "@/lib/json-utils";
import { validateEnhancedData } from "@/lib/validation-utils";
import { AI_CONFIG } from "@/lib/constants";

export async function POST(request: Request) {
  let specification: string = "";
  
  try {
    const { specification: spec, clarifierResponses, enhancementOptions } =
      await request.json();
    
    specification = spec || "";

    // Default enhancement options if not provided
    const options: EnhancementOptions = {
      ...DEFAULT_ENHANCEMENT_OPTIONS,
      ...enhancementOptions,
    };

    // Build enhancement requirements based on selected options
    const enhancementRequirements = buildEnhancementRequirements(options);

    // Create the enhancement prompt
    const enhancementPrompt = createEnhancementPrompt(
      specification,
      clarifierResponses || {},
      enhancementRequirements
    );

    const { text } = await generateText({
      model: groq(AI_CONFIG.MODEL),
      prompt: enhancementPrompt,
      temperature: AI_CONFIG.TEMPERATURE,
    });

    // Parse and validate the AI response
    const parseResult = cleanAndParseJson(text);
    
    let enhancedData;
    if (!parseResult.success) {
      console.error("Failed to parse JSON:", parseResult.error);
      enhancedData = createFallbackResponse(specification);
    } else {
      const validationResult = validateEnhancedData(parseResult.data, specification);
      enhancedData = validationResult.data;
      
      if (!validationResult.isValid) {
        console.warn("Validation issues:", validationResult.issues);
      }
    }

    return Response.json(enhancedData);
  } catch (error) {
    console.error("Error enhancing specification:", error);

    // Enhanced fallback response
    const fallbackResponse = createFallbackResponse(specification);

    return Response.json(fallbackResponse);
  }
}
