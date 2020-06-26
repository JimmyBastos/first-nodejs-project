import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome',
  title: string,
  value: number
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {

    let balance = this.transactionsRepository.getBalance()

    if (type === 'outcome' && value > balance.total) {
      throw new Error('Outcome value is greater than the balance')
    }

    const transaction = this.transactionsRepository.create(
      { title, type, value }
    )

    return transaction
  }
}

export default CreateTransactionService;
