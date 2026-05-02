export const PENDING_RESULT = "Pending";

type FormData = Record<string, string>;

const toPositiveNumber = (value: string) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue <= 0) return null;
  return numberValue;
};

const hasValue = (value: unknown) => value !== undefined && value !== null && `${value}`.trim() !== "";

export function calculateBySlug(slug: string, formData: FormData): string {
  switch (slug) {
    case "bmi-calculator": {
      const weight = toPositiveNumber(formData.weight);
      const heightCm = toPositiveNumber(formData.height);
      if (!weight || !heightCm) return PENDING_RESULT;

      const bmi = weight / ((heightCm / 100) ** 2);
      return Number.isFinite(bmi) ? bmi.toFixed(2) : PENDING_RESULT;
    }

    case "loan-calculator": {
      const principal = toPositiveNumber(formData.amount);
      const yearlyRate = toPositiveNumber(formData.rate);
      const years = toPositiveNumber(formData.years);
      if (!principal || !yearlyRate || !years) return PENDING_RESULT;

      const monthlyRate = yearlyRate / 12 / 100;
      const months = years * 12;
      if (months <= 0) return PENDING_RESULT;

      let monthlyPayment: number;
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        const factor = (1 + monthlyRate) ** months;
        monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
      }

      if (!Number.isFinite(monthlyPayment)) return PENDING_RESULT;
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      return `Monthly: ${monthlyPayment.toFixed(2)} | Interest: ${totalInterest.toFixed(2)}`;
    }

    case "age-calculator": {
      if (!hasValue(formData.dob)) return PENDING_RESULT;
      const birthDate = new Date(formData.dob);
      if (Number.isNaN(birthDate.getTime())) return PENDING_RESULT;

      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      const monthDelta = now.getMonth() - birthDate.getMonth();
      if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < birthDate.getDate())) {
        years -= 1;
      }
      return years >= 0 ? `${years} Years` : PENDING_RESULT;
    }

    default:
      return PENDING_RESULT;
  }
}
