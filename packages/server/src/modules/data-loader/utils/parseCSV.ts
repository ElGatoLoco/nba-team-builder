import { createReadStream } from 'fs';

import { parse } from '@fast-csv/parse';
import chunk from 'lodash.chunk';

export const parseCSV = async <Row extends Record<string, unknown>, ParseTarget, OnEndHandlerR>(
  csvPath: string,
  transformer: (row: Row) => ParseTarget,
  onEndHandler: (data: ParseTarget[]) => OnEndHandlerR,
) => {
  return new Promise((resolve, reject) => {
    const parsedData: ParseTarget[] = [];
    createReadStream(csvPath)
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('error', (error) => {
        reject(error.message);
      })
      .on('data', (row: Row) => {
        parsedData.push(transformer(row));
      })
      .on('end', () => {
        const result = chunk(parsedData, 5000).map(onEndHandler);
        resolve(result);
      });
  });
};
