import { EnhancementOptions } from "@/types/enhancement"

export function buildEnhancementRequirements(options: EnhancementOptions): string[] {
  const requirements: string[] = []
  
  if (options.includeTechnicalDetails) {
    requirements.push("Add specific technical implementation details")
  }
  if (options.includeErrorHandling) {
    requirements.push("Include comprehensive error handling strategies")
  }
  if (options.includePerformanceRequirements) {
    requirements.push("Specify performance benchmarks and requirements")
  }
  if (options.includeSecurityConsiderations) {
    requirements.push("Add security measures and considerations")
  }
  if (options.includeTestingStrategies) {
    requirements.push("Include testing strategies and approaches")
  }
  if (options.includeMonitoringApproaches) {
    requirements.push("Add monitoring and observability approaches")
  }
  if (options.includeDeploymentConsiderations) {
    requirements.push("Specify deployment and CI/CD considerations")
  }
  if (options.includeDependencies) {
    requirements.push("Identify and specify dependencies")
  }
  if (options.includeAdditionalInformation) {
    requirements.push("Include any additional relevant information")
  }
  
  return requirements
}

export function createEnhancementPrompt(
  specification: string,
  clarifierResponses: Record<string, string>,
  enhancementRequirements: string[]
): string {
  const clarifierContext = clarifierResponses && Object.keys(clarifierResponses).length > 0
    ? `
ADDITIONAL CONTEXT FROM CLARIFIER RESPONSES:
${Object.entries(clarifierResponses)
  .map(([question, response]) => `Q: ${question}\nA: ${response}`)
  .join("\n\n")}
`
    : ""

  return `You are a senior software architect and technical specification expert with 15+ years of experience in modern software development. You specialize in creating clear, actionable technical specifications that bridge the gap between business requirements and implementation details.

Your role is to enhance specifications by adding technical depth while maintaining clarity and actionable guidance.

SPECIFICATION TO ENHANCE:
${specification}

${clarifierContext}
ENHANCEMENT FOCUS AREAS:
${enhancementRequirements.map((req) => `• ${req}`).join("\n")}

ENHANCEMENT APPROACH:
1. Preserve the original structure and intent
2. Add specific, actionable technical details
3. Include concrete examples where helpful
4. Maintain clear, professional tone
5. Focus on implementation guidance over theory
6. Consider scalability and maintainability

RESPONSE FORMAT:
Return ONLY a valid JSON object with these exact keys:
- "enhanced_specification": string (the enhanced specification with \\n for line breaks)
- "thought_clarifiers": array of 3-5 focused technical questions

JSON FORMATTING RULES:
• Use double quotes for all strings
• Escape quotes inside strings with \\"
• Use \\n for line breaks
• No trailing commas
• No markdown or code blocks

EXAMPLE FORMAT:
{
  "enhanced_specification": "# Enhanced Title\\n\\n## Technical Section\\nImplementation details with \\"specific examples\\" and \\nproper line breaks.",
  "thought_clarifiers": [
    "What specific database indexing strategy should be implemented for optimal query performance?",
    "How should the system handle concurrent user sessions and race conditions?",
    "What are the specific error codes and recovery mechanisms for each failure scenario?"
  ]
}

TONE AND STYLE:
• Professional but accessible
• Technical but not overly complex
• Actionable and specific
• Focus on practical implementation
• Include specific technologies, patterns, and approaches

Return the JSON now:`
}

import { ENHANCEMENT_NOTES, DEFAULT_CLARIFIERS } from "@/lib/constants";

export function createFallbackResponse(specification: string) {
  return {
    enhanced_specification: `${specification}${ENHANCEMENT_NOTES.FALLBACK}`,
    thought_clarifiers: DEFAULT_CLARIFIERS.ARCHITECTURE,
  }
} 