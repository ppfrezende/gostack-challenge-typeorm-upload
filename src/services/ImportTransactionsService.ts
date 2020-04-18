import path from 'path';
import csv from 'csvtojson';
import fs from 'fs';

import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    const createTransactionService = new CreateTransactionService();

    const transactionsFilePath = path.join(uploadConfig.directory, filename);

    const transactionsArray = await csv().fromFile(transactionsFilePath);

    for (const transaction of transactionsArray) {
      const result = await createTransactionService.execute(transaction);

      transactions.push(result);
    }

    await fs.promises.unlink(filename);

    return transactions;
  }
}

export default ImportTransactionsService;
