export type StepType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'date' | 'select';

export interface FormStep {
    id: string;
    question: string;
    subtext?: string;
    type: StepType;
    options?: string[]; // For radio, checkbox, select
    placeholder?: string;
    required?: boolean;
}

export interface FormConfig {
    programId: string;
    title: string;
    steps: FormStep[];
    whatsappTemplate: string;
}
