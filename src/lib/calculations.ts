export const PENDING_RESULT = "Pending";

type FormData = Record<string, string>;

export interface LoanVisualData {
  principal: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface ToolCalculationResult {
  display: string;
  numericValue?: number;
  loanData?: LoanVisualData;
}

const toPositiveNumber = (value: string) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue <= 0) return null;
  return numberValue;
};

const hasValue = (value: unknown) => value !== undefined && value !== null && `${value}`.trim() !== "";

export function calculateBySlug(slug: string, formData: FormData): ToolCalculationResult {
  switch (slug) {
    case "bmi-calculator": {
      const weight = toPositiveNumber(formData.weight);
      const heightCm = toPositiveNumber(formData.height);
      if (!weight || !heightCm) return { display: PENDING_RESULT };

      const bmi = weight / ((heightCm / 100) ** 2);
      if (!Number.isFinite(bmi)) return { display: PENDING_RESULT };
      return {
        display: bmi.toFixed(2),
        numericValue: bmi,
      };
    }

    case "loan-calculator": {
      const principal = toPositiveNumber(formData.amount);
      const yearlyRate = toPositiveNumber(formData.rate);
      const years = toPositiveNumber(formData.years);
      if (!principal || !yearlyRate || !years) return { display: PENDING_RESULT };

      const monthlyRate = yearlyRate / 12 / 100;
      const months = years * 12;
      if (months <= 0) return { display: PENDING_RESULT };

      let monthlyPayment: number;
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        const factor = (1 + monthlyRate) ** months;
        monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
      }

      if (!Number.isFinite(monthlyPayment)) return { display: PENDING_RESULT };
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      return {
        display: `Monthly: ${monthlyPayment.toFixed(2)} | Interest: ${totalInterest.toFixed(2)}`,
        loanData: {
          principal,
          monthlyPayment,
          totalInterest,
          totalPayment,
        },
      };
    }

    case "age-calculator": {
      if (!hasValue(formData.dob)) return { display: PENDING_RESULT };
      const birthDate = new Date(formData.dob);
      if (Number.isNaN(birthDate.getTime())) return { display: PENDING_RESULT };

      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      const monthDelta = now.getMonth() - birthDate.getMonth();
      if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < birthDate.getDate())) {
        years -= 1;
      }
      return years >= 0
        ? { display: `${years} Years`, numericValue: years }
        : { display: PENDING_RESULT };
    }

    default:
      return { display: PENDING_RESULT };
  }
}
