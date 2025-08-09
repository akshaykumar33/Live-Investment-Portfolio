import { readJsonFile, writeJsonFile } from "../../../src/utils/file";
import * as fs from "fs/promises";

jest.mock("fs/promises");

describe("file utils", () => {
  it("reads and parses JSON", async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify([1, 2, 3]));
    const data = await readJsonFile("file.json");
    expect(data).toEqual([1, 2, 3]);
  });

  it("writes JSON", async () => {
    await writeJsonFile("file.json", { foo: "bar" });
    expect(fs.writeFile).toHaveBeenCalledWith(
      "file.json",
      JSON.stringify({ foo: "bar" }, null, 2),
      "utf8"
    );
  });
});
