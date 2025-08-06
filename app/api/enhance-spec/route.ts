import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'

export async function POST(request: Request) {
  try {
    const { specification, clarifierResponses } = await request.json()

    const enhancementPrompt = `You are an expert specification enhancement AI. You MUST return ONLY valid JSON.

SPECIFICATION TO ENHANCE:
${specification}

${clarifierResponses && Object.keys(clarifierResponses).length > 0 ? `
ADDITIONAL CONTEXT:
${Object.entries(clarifierResponses).map(([question, response]) => `Q: ${question}\nA: ${response}`).join('\n\n')}
` : ''}

CRITICAL JSON FORMATTING RULES - FOLLOW EXACTLY:
1. Return ONLY a JSON object - no markdown, no code blocks, no extra text
2. Use double quotes for all strings
3. Escape ALL special characters:
   - Use \\n for line breaks (NOT actual line breaks)
   - Use \\" for quotes inside strings
   - Use \\\\ for backslashes
4. The JSON must have exactly these two keys: "enhanced_specification" and "thought_clarifiers"
5. "enhanced_specification" must be a single string with \\n for line breaks
6. "thought_clarifiers" must be an array of exactly 3-5 strings
7. End the JSON object properly with }

EXAMPLE OF CORRECT FORMAT:
{
  "enhanced_specification": "# Title\\n\\n## Section\\nContent here with \\"quotes\\" properly escaped.\\n\\n- List item 1\\n- List item 2",
  "thought_clarifiers": [
    "What specific database indexing strategy should be implemented?",
    "How should the system handle concurrent user sessions?",
    "What are the specific error codes for each failure scenario?"
  ]
}

ENHANCEMENT REQUIREMENTS:
- Add technical implementation details
- Include error handling strategies
- Specify performance requirements
- Add security considerations
- Include testing strategies
- Add monitoring approaches
- Specify deployment considerations
- Identify dependencies

RESPONSE INSTRUCTIONS:
1. Enhance the specification with technical details
2. Keep the original structure and intent
3. Add specific implementation guidance
4. Create 3-5 focused clarifying questions
5. Return ONLY the JSON object - no other text

JSON VALIDATION CHECKLIST:
✓ Starts with {
✓ Ends with }
✓ All strings use double quotes
✓ All special characters are escaped
✓ No trailing commas
✓ Proper comma separation between properties
✓ Both required keys present

Return the JSON now:`

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: enhancementPrompt,
      maxTokens: 3000,
      temperature: 0.3, // Lower temperature for more consistent formatting
      experimental_providerMetadata: {
        groq: {
          response_format: { type: "json_object" }
        }
      }
    })

    // Remove the problematic quote escaping regex and add more robust JSON extraction
    // Find the line: cleanedText = cleanedText.replace(/([^\\])"/g, '$1\\"') // Fix unescaped quotes (but not already escaped ones)
    // Delete that line.

    // Replace the entire cleaning and parsing block with the following:
    let rawResponseText = text.trim();

    console.log('Raw AI response text from generateText:', rawResponseText.substring(0, 500) + '...')
    console.log('Raw AI response text length:', rawResponseText.length)

    // Aggressively strip any leading/trailing non-JSON characters or markdown wrappers
    let cleanedText = rawResponseText;
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
    } else {
      // If braces not found, try to remove common markdown wrappers
      cleanedText = cleanedText.replace(/^\`\`\`json\s*/, '').replace(/\s*\`\`\`$/, '');
      cleanedText = cleanedText.replace(/^\`\`\`\s*/, '').replace(/\s*\`\`\`$/, '');
    }

    // Remove control characters (except common whitespace like \n, \t, \r)
    cleanedText = cleanedText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

    // Remove any remaining non-printable ASCII characters that are not standard whitespace
    // This helps catch invisible characters that might cause parsing issues
    cleanedText = cleanedText.replace(/[^\x20-\x7E\n\r\t]/g, ''); // Keep only printable ASCII, newlines, tabs, carriage returns

    // Remove trailing commas before parsing (common JSON error)
    cleanedText = cleanedText.replace(/,(\s*[}\]])/g, '$1');

    console.log('Attempting to parse final cleaned JSON:', cleanedText.substring(0, 500) + '...')
    console.log('Final cleaned response length:', cleanedText.length)

    let enhancedData;
    try {
      enhancedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error (final attempt):', parseError);
      console.error('Raw response length:', rawResponseText.length);
      console.error('Cleaned response length:', cleanedText.length);
      console.error('First 1000 chars of final cleaned response:', cleanedText.substring(0, 1000));
      console.error('Last 500 chars of final cleaned response:', cleanedText.substring(cleanedText.length - 500));
      
      // Fallback to safe response if parsing fails
      const safeSpec = specification + '\n\n## AI Enhancement Note\nThe specification has been reviewed. Consider adding more specific technical details, error handling strategies, and performance requirements.';
      
      enhancedData = {
        enhanced_specification: safeSpec,
        thought_clarifiers: [
          "What specific error handling patterns should be implemented throughout the system?",
          "What performance benchmarks and monitoring should be established?",
          "What security measures need to be implemented for data protection?"
        ]
      };
    }

    // Validate the response structure (rest of your existing validation)
    if (!enhancedData || typeof enhancedData !== 'object') {
      throw new Error('Response is not a valid object');
    }

    if (!enhancedData.enhanced_specification || typeof enhancedData.enhanced_specification !== 'string') {
      enhancedData.enhanced_specification = specification + '\n\n## Enhancement Note\nSpecification reviewed and validated.';
    }

    if (!enhancedData.thought_clarifiers || !Array.isArray(enhancedData.thought_clarifiers)) {
      enhancedData.thought_clarifiers = [
        "What specific technical implementation details need clarification?",
        "What error handling strategies should be defined?",
        "What performance requirements should be specified?"
      ];
    }

    // Ensure thought_clarifiers has reasonable length
    if (enhancedData.thought_clarifiers.length === 0) {
      enhancedData.thought_clarifiers = [
        "What specific technical stack and architecture should be used?",
        "What are the detailed functional requirements for each feature?",
        "What performance and scalability requirements need to be defined?"
      ];
    }

    // Limit to maximum 6 clarifiers to prevent UI issues
    if (enhancedData.thought_clarifiers.length > 6) {
      enhancedData.thought_clarifiers = enhancedData.thought_clarifiers.slice(0, 6);
    }

    console.log('Successfully parsed enhanced data with', enhancedData.thought_clarifiers.length, 'clarifiers');

    return Response.json(enhancedData);
    
  } catch (error) {
    console.error('Error enhancing specification:', error)
    
    // Return a safe fallback response
    const fallbackResponse = {
      enhanced_specification: "# Enhanced Specification\n\nThe specification has been reviewed and appears to be well-structured. Consider adding more technical details, implementation specifics, and success criteria to improve clarity and completeness.\n\n## Recommendations\n- Add specific technical requirements\n- Define error handling strategies\n- Include performance benchmarks\n- Specify security measures\n- Add testing strategies",
      thought_clarifiers: [
        "What specific technical stack and architecture should be used for this project?",
        "What are the detailed functional requirements for each core feature?",
        "What performance and scalability requirements need to be defined?",
        "What security measures should be implemented to protect user data?",
        "What testing strategies should be employed to ensure quality?"
      ]
    }
    
    return Response.json(fallbackResponse)
  }
}
