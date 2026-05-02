export interface ToolField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface ToolConfig {
  title: string;
  description: string;
  type: string;
  fields: ToolField[];
}

export const toolsData: Record<string, ToolConfig> = {
  "bmi-calculator": {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index quickly.",
    type: "bmi",
    fields: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g. 70" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 175" }
    ]
  },
  "age-calculator": {
    title: "Age Calculator",
    description: "Find out exactly how old you are.",
    type: "age",
    fields: [
      { id: "dob", label: "Date of Birth", type: "date", placeholder: "" }
    ]
  },
  "loan-calculator": {
    title: "Loan Calculator",
    description: "Estimate payments and interest.",
    type: "loan",
    fields: [
      { id: "amount", label: "Loan Amount", type: "number", placeholder: "e.g. 10000" },
      { id: "rate", label: "Interest Rate (%)", type: "number", placeholder: "e.g. 5" },
      { id: "years", label: "Duration (Years)", type: "number", placeholder: "e.g. 5" }
    ]
  },
  "color-converter": {
    title: "Color Converter",
    description: "Translate color formats instantly.",
    type: "color",
    fields: [
      { id: "hex", label: "HEX Code", type: "text", placeholder: "e.g. #0058be" }
    ]
  }
};