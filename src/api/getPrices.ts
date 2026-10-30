export interface Price {
  DKK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
}

export async function getPrices(
  region: "DK1" | "DK2" = "DK2",
  date: Date = new Date(),
): Promise<Price[]> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Формируем URL для запроса цен на электроэнергию
  const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${region}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json() as Promise<Price[]>;
}
