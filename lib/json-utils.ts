export interface JsonParseResult {
  success: boolean;
  data?: any;
  error?: string;
  cleanedText?: string;
}

export function cleanAndParseJson(rawText: string): JsonParseResult {
  let cleanedText = rawText.trim();
  
  console.log(
    "Raw AI response text from generateText:",
    cleanedText.substring(0, 500) + "..."
  );
  console.log("Raw AI response text length:", cleanedText.length);

  // Extract JSON from response
  const firstBrace = cleanedText.indexOf("{");
  const lastBrace = cleanedText.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
  } else {
    // Remove markdown wrappers if braces not found
    cleanedText = cleanedText
      .replace(/^\`\`\`json\s*/, "")
      .replace(/\s*\`\`\`$/, "");
    cleanedText = cleanedText
      .replace(/^\`\`\`\s*/, "")
      .replace(/\s*\`\`\`$/, "");
  }

  // Clean control characters and non-printable characters
  cleanedText = cleanedText.replace(
    /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,
    ""
  );
  cleanedText = cleanedText.replace(/[^\x20-\x7E\n\r\t]/g, "");
  cleanedText = cleanedText.replace(/,(\s*[}\]])/g, "$1");

  console.log(
    "Attempting to parse final cleaned JSON:",
    cleanedText.substring(0, 500) + "..."
  );
  console.log("Final cleaned response length:", cleanedText.length);

  try {
    const data = JSON.parse(cleanedText);
    return {
      success: true,
      data,
      cleanedText,
    };
  } catch (parseError) {
    console.error("JSON Parse Error (final attempt):", parseError);
    console.error("Raw response length:", rawText.length);
    console.error("Cleaned response length:", cleanedText.length);
    console.error(
      "First 1000 chars of final cleaned response:",
      cleanedText.substring(0, 1000)
    );
    console.error(
      "Last 500 chars of final cleaned response:",
      cleanedText.substring(cleanedText.length - 500)
    );

    return {
      success: false,
      error: parseError instanceof Error ? parseError.message : "Unknown parsing error",
      cleanedText,
    };
  }
} 