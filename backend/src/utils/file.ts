import fs from "fs/promises";

export async function readJsonFile<T>(path: string): Promise<T> {
  const data = await fs.readFile(path, "utf8");
  return JSON.parse(data) as T;
}

export async function writeJsonFile<T>(path: string, data: T): Promise<void> {
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
}
