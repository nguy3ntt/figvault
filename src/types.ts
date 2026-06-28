export type MinifigCondition = "New" | "Excellent" | "Good" | "Worn" | "Damaged";

export type Minifig = {
  id: string;
  figCode: string;
  name: string;
  theme: string;
  year: number;
  condition: MinifigCondition;
  quantity: number;
  estimatedValue: number;
  purchasePrice?: number;
  imageLabel: string;
  valueChangePercent: number;
  lastUpdated: string;
};