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

export type MinifigFormInput = {
  figCode: string;
  name: string;
  theme: string;
  year: number;
  condition: MinifigCondition;
  quantity: number;
  estimatedValue: number;
  purchasePrice?: number;
};

export type ValueSnapshot = {
  id: string;
  createdAt: string;
  totalValue: number;
  totalFigures: number;
};