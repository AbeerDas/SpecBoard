export interface ClarifierResponse {
  [question: string]: string;
}

export interface EnhancedData {
  enhanced_specification: string;
  thought_clarifiers: string[];
}

export interface EnhancementOptions {
  includeTechnicalDetails: boolean;
  includeErrorHandling: boolean;
  includePerformanceRequirements: boolean;
  includeSecurityConsiderations: boolean;
  includeTestingStrategies: boolean;
  includeMonitoringApproaches: boolean;
  includeDeploymentConsiderations: boolean;
  includeDependencies: boolean;
  includeAdditionalInformation: boolean;
}

export interface EnhancementOption {
  id: keyof EnhancementOptions;
  label: string;
  description: string;
  default: boolean;
}

export const ENHANCEMENT_OPTIONS: EnhancementOption[] = [
  {
    id: 'includeTechnicalDetails',
    label: 'Technical Details',
    description: 'Add specific technical implementation details',
    default: true,
  },
  {
    id: 'includeErrorHandling',
    label: 'Error Handling',
    description: 'Include comprehensive error handling strategies',
    default: true,
  },
  {
    id: 'includePerformanceRequirements',
    label: 'Performance Requirements',
    description: 'Specify performance benchmarks and requirements',
    default: true,
  },
  {
    id: 'includeSecurityConsiderations',
    label: 'Security Considerations',
    description: 'Add security measures and considerations',
    default: true,
  },
  {
    id: 'includeTestingStrategies',
    label: 'Testing Strategies',
    description: 'Include testing strategies and approaches',
    default: true,
  },
  {
    id: 'includeMonitoringApproaches',
    label: 'Monitoring Approaches',
    description: 'Add monitoring and observability approaches',
    default: true,
  },
  {
    id: 'includeDeploymentConsiderations',
    label: 'Deployment Considerations',
    description: 'Specify deployment and CI/CD considerations',
    default: true,
  },
  {
    id: 'includeDependencies',
    label: 'Dependencies',
    description: 'Identify and specify dependencies',
    default: true,
  },
  {
    id: 'includeAdditionalInformation',
    label: 'Additional Information',
    description: 'Include any additional relevant information',
    default: false,
  },
];

export const DEFAULT_ENHANCEMENT_OPTIONS: EnhancementOptions = {
  includeTechnicalDetails: true,
  includeErrorHandling: true,
  includePerformanceRequirements: true,
  includeSecurityConsiderations: true,
  includeTestingStrategies: true,
  includeMonitoringApproaches: true,
  includeDeploymentConsiderations: true,
  includeDependencies: true,
  includeAdditionalInformation: false,
}; 