import { EnhancedData } from "@/types/enhancement";
import { DEFAULT_CLARIFIERS, ENHANCEMENT_NOTES, VALIDATION_LIMITS } from "@/lib/constants";

export interface ValidationResult {
  isValid: boolean;
  data: EnhancedData;
  issues: string[];
}

export function validateEnhancedData(
  data: any,
  originalSpecification: string
): ValidationResult {
  const issues: string[] = [];
  let enhancedData: EnhancedData = {
    enhanced_specification: "",
    thought_clarifiers: [],
  };

  // Validate basic structure
  if (!data || typeof data !== "object") {
    issues.push("Response is not a valid object");
    enhancedData = createDefaultEnhancedData(originalSpecification);
    return { isValid: false, data: enhancedData, issues };
  }

  // Validate enhanced_specification
  if (!data.enhanced_specification || typeof data.enhanced_specification !== "string") {
    issues.push("Missing or invalid enhanced_specification");
    enhancedData.enhanced_specification =
      originalSpecification + ENHANCEMENT_NOTES.DEFAULT;
  } else {
    enhancedData.enhanced_specification = data.enhanced_specification;
  }

  // Validate thought_clarifiers
  if (!data.thought_clarifiers || !Array.isArray(data.thought_clarifiers)) {
    issues.push("Missing or invalid thought_clarifiers");
    enhancedData.thought_clarifiers = getDefaultClarifiers();
  } else {
    enhancedData.thought_clarifiers = data.thought_clarifiers;
  }

  // Ensure reasonable clarifier count
  if (enhancedData.thought_clarifiers.length === 0) {
    issues.push("No thought clarifiers provided");
    enhancedData.thought_clarifiers = getDefaultClarifiers();
  }

  // Limit clarifiers to prevent UI issues
  if (enhancedData.thought_clarifiers.length > VALIDATION_LIMITS.MAX_CLARIFIERS) {
    enhancedData.thought_clarifiers = enhancedData.thought_clarifiers.slice(0, VALIDATION_LIMITS.MAX_CLARIFIERS);
    issues.push(`Too many clarifiers, limited to ${VALIDATION_LIMITS.MAX_CLARIFIERS}`);
  }

  const isValid = issues.length === 0;
  
  if (isValid) {
    console.log(
      "Successfully parsed enhanced data with",
      enhancedData.thought_clarifiers.length,
      "clarifiers"
    );
  }

  return { isValid, data: enhancedData, issues };
}

function createDefaultEnhancedData(specification: string): EnhancedData {
  return {
    enhanced_specification: specification + "\n\n## Enhancement Note\nSpecification reviewed and validated with technical improvements.",
    thought_clarifiers: getDefaultClarifiers(),
  };
}

function getDefaultClarifiers(): string[] {
  return DEFAULT_CLARIFIERS.GENERAL;
} 