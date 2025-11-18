import Papa, { type ParseError, type ParseResult } from "papaparse";

export async function parseCsv<T>(url: string): Promise<ParseResult<T>> {
  const response = await fetch(url);
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<T>) => {
        return resolve(results);
      },
      error: (error: ParseError) => {
        return reject(error);
      },
    });
  });
}
