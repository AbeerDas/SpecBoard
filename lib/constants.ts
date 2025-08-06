// Default clarifier questions for different scenarios
export const DEFAULT_CLARIFIERS = {
  TECHNICAL: [
    "What specific technical implementation details need clarification?",
    "What error handling strategies should be defined?",
    "What performance requirements should be specified?",
    "What security measures need to be implemented?",
    "What testing and quality assurance approaches are needed?",
  ],
  ARCHITECTURE: [
    "What specific technical stack and architecture should be used?",
    "What are the detailed functional requirements for each feature?",
    "What performance and scalability requirements need to be defined?",
    "What security measures should be implemented?",
    "What testing strategies should be employed?",
  ],
  GENERAL: [
    "What specific technical implementation details need clarification?",
    "What error handling strategies should be defined?",
    "What performance requirements should be specified?",
    "What security measures need to be implemented?",
    "What testing and quality assurance approaches are needed?",
  ],
};

// Enhancement note templates
export const ENHANCEMENT_NOTES = {
  DEFAULT: "\n\n## Enhancement Note\nSpecification reviewed and validated with technical improvements.",
  FALLBACK: "\n\n## AI Enhancement Note\n\nThe specification has been reviewed and enhanced with technical details. Consider the following improvements:\n\n### Technical Implementation\n- Add specific technology stack details\n- Include architecture patterns and design decisions\n- Specify data flow and state management approaches\n\n### Error Handling & Resilience\n- Define comprehensive error handling strategies\n- Include retry mechanisms and circuit breakers\n- Specify logging and monitoring requirements\n\n### Performance & Security\n- Establish performance benchmarks and SLAs\n- Define security measures and compliance requirements\n- Include scalability considerations",
};

// Validation limits
export const VALIDATION_LIMITS = {
  MAX_CLARIFIERS: 6,
  MIN_CLARIFIERS: 1,
};

// AI Model Configuration
export const AI_CONFIG = {
  MODEL: "llama-3.1-8b-instant",
  TEMPERATURE: 0.3,
}; 