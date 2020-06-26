import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCBO {
  type: 'income' | 'outcome'
  title: string
  value: number
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce((balance, transaction) => {
      switch (transaction.type) {
        case 'income':
          balance.income += transaction.value
          break
        case 'outcome':
          balance.outcome += transaction.value
          break
      }
      return balance
    }, {
      income: 0,
      outcome: 0
    })

    let total = income - outcome

    return {
      income,
      outcome,
      total
    }
  }

  public create({ type, title, value }: TransactionCBO): Transaction {
    const transaction = new Transaction({ type, title, value })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
