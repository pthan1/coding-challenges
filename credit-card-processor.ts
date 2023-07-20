/*
'''
Implement Credit Card Processor

You have been tasked with implementing a credit card processing system using object-oriented programming. The system should consist of two classes: CreditCard and CardProcessor. See the skeleton code below:

from enum import Enum

class TransactionStatus(Enum):
    SUCCESS = 1
    LIMIT_EXCEEDED = 2
    CARD_NOT_FOUND = 3

class CreditCard:
    def __init__(self, cardholder_name, credit_limit):
        # Initializes the `cardholder_name`, `balance`, and `credit_limit` properties.
        pass

    def __str__(self) -> str:
        # Returns a string representation of the `CreditCard` object.
        pass

    def charge(self, amount) -> str:
        # Adds the specified amount to the balance if it doesn't exceed the credit limit.
        # If the balance plus the amount to be charged exceeds the credit limit,
        # the method should return an error status.
        pass

    def payment(self, amount) -> None:
        # Subtracts the specified amount from the balance.
        pass

class CardProcessor:
    def __init__(self):
        # Initializes the `cards` list to an empty list.
        pass

    def issue_card(self, cardholder_name, credit_limit) -> str:
        # Creates a new `CreditCard` object with the given cardholder name and credit limit,
        # appends it to the `cards` list, and returns a string indicating that a new card has been issued.
        pass

    def charge_card(self, cardholder_name, amount) -> str:
        # Searches for the `CreditCard` object with the given cardholder name in the `cards` list,
        # and calls its `charge` method to charge the specified amount to the card.
        # If no matching card is found, the method should return an error status.
        pass

    def debit_card(self, cardholder_name, amount) -> str:
        # Searches for the `CreditCard` object with the given cardholder name in the `cards` list,
        # and calls its `payment` method to debit the specified amount from the card.
        # If no matching card is found, the method should return an error status.
        pass

    def get_balances(self) -> list[tuple[str, float]]:
        # Creates a list of tuples containing the cardholder name and balance for each
        # `CreditCard` object in the `cards` list, and returns the list.
        pass

<space />

# BONUS
def is_valid_card_number(card_number) -> bool:
    # Uses the Luhn algorithm to validate credit card numbers.
    # Returns True if the number is valid according to the Luhn algorithm, and False otherwise.
    pass

 

EXAMPLE(S)
# Create a new CardProcessor object
cp = CardProcessor()

# Issue a new credit card with a $1000 credit limit to John Doe
cp.issue_card('John Doe', 1000.00)

# Issue a new credit card with a $500 credit limit to Jane Smith
cp.issue_card('Jane Smith', 500.00)

# Charge $50 to John Doe's credit card
cp.charge_card('John Doe', 50.00)

# Attempt to charge $600 to Jane Smith's credit card (which has a $500 credit limit)
cp.charge_card('Jane Smith', 600.00)  # Returns an error message

# Make a $25 payment to John Doe's credit card
cp.debit_card('John Doe', 25.00)

# Get a list of cardholder names and balances for all credit cards issued by the CardProcessor object
cp.get_balances()  # Returns [('John Doe', 25.0), ('Jane Smith', 0.0)]
 

FUNCTION SIGNATURE
See skeleton code.
'''
*/

enum TransactionStatus {
  SUCCESS = 1,
  LIMIT_EXCEEDED = 2,
  CARD_NOT_FOUND = 3,
}

class CreditCard {
  balance = 0;
  cardHolderName: string;
  creditLimit: number;
  constructor(cardholderName: string, creditLimit: number) {
    this.cardHolderName = cardholderName;
    this.creditLimit = creditLimit;
  }

  charge(amount: number): TransactionStatus {
    // If the balance plus the amount to be charged exceeds the credit limit,
    // the method should return an error status.
    if (this.balance + amount > this.creditLimit) {
      return TransactionStatus.LIMIT_EXCEEDED;
    }
    // Adds the specified amount to the balance if it doesn't exceed the credit limit.
    this.balance += amount;
    return TransactionStatus.SUCCESS;
  }

  payment(amount: number): void {
    // Subtracts the specified amount from the balance.
    this.balance -= amount;
  }
}

class CardProcessor {
  cards = {};
  issueCard(cardHolderName: string, creditLimit: number): string {
    this.cards[cardHolderName] = new CreditCard(cardHolderName, creditLimit);
    return "SUCCESS! The card has been issued.";

    // Creates a new `CreditCard` object with the given cardholder name and credit limit,
    // appends it to the `cards` list, and returns a string indicating that a new card has been issued.
  }
  chargeCard(cardholderName: string, amount: number): TransactionStatus {
    // Searches for the `CreditCard` object with the given cardholder name in the `cards` list,
    // and calls its `charge` method to charge the specified amount to the card.
    if (this.cards[cardholderName]) {
      this.cards[cardholderName].charge(amount);
    }
    // If no matching card is found, the method should return an error status.
    return TransactionStatus.CARD_NOT_FOUND;
  }
  debitCard(cardholderName: string, amount: number): TransactionStatus {
    // # Searches for the `CreditCard` object with the given cardholder name in the `cards` list,
    // # and calls its `payment` method to debit the specified amount from the card.
    if (this.cards[cardholderName]) {
      this.cards[cardholderName].payment(amount);
    }
    // # If no matching card is found, the method should return an error status.
    return TransactionStatus.CARD_NOT_FOUND;
  }

  getBalances(): [string, number][] {
    // # Creates a list of tuples containing the cardholder name and balance for each
    // # `CreditCard` object in the `cards` list, and returns the list.
    return Object.values(this.cards).map(
      ({ balance, cardHolderName }: CreditCard) => [cardHolderName, balance]
    );
  }
}

// Create a new CardProcessor object
const cp = new CardProcessor();

// Issue a new credit card with a $1000 credit limit to John Doe
cp.issueCard("John Doe", 1000.0);

// Issue a new credit card with a $500 credit limit to Jane Smith
cp.issueCard("Jane Smith", 500.0);

// Charge $50 to John Doe's credit card
cp.chargeCard("John Doe", 50.0);

// Attempt to charge $600 to Jane Smith's credit card (which has a $500 credit limit)
cp.chargeCard("Jane Smith", 600.0); // Returns an error message

// Make a $25 payment to John Doe's credit card
cp.debitCard("John Doe", 25.0);

// Get a list of cardholder names and balances for all credit cards issued by the CardProcessor object
cp.getBalances(); // Returns [('John Doe', 25.0), ('Jane Smith', 0.0)]
