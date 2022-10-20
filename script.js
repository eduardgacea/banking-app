class Bank {
  // CONSTRUCTOR-UL OBIECTULUI
  constructor(bankName, SWIFT, country) {
    this.bankName = bankName;
    this.SWIFT = SWIFT;
    this.country = country;
    this.activeAccounts = [];
  }

  // METODA DE AFISARE A CONTURILOR DESCHISE
  createAccount(accountNr, accountID, accountBalance, accountName) {
    this.activeAccounts.push(
      new account(accountNr, accountID, accountBalance, accountName)
    );
    console.log("ACCOUNT CREATED");
  }

  // METODA DE ADAUGARE A UNUI CONT NOU
  printActiveAccounts() {
    if (!this.activeAccounts.length) {
      console.log("No active accounts to display!");
    } else {
      console.log("Active accounts list: ");
      for (let index = 0; index < this.activeAccounts.length; index++) {
        console.log(this.activeAccounts[index]);
      }
    }
  }

  // METODA DE AFISARE A CONTURILOR CU SOLD NEGATIVE
  printNegativeBalanceAccounts() {
    this.counter = 0;
    console.log("Negative balance accounts list: ");
    for (let index = 0; index < this.activeAccounts.length; index++) {
      if (this.activeAccounts[index].accountBalance < 0) {
        console.log(this.activeAccounts[index]);
        this.counter++;
      }
    }
    if (!this.counter) {
      console.log("No negative balance accounts to display!");
    }
  }

  // METODA CARE INVOCA PROTOTIPUL DE DEBITAMOUNTBYID SI DEBITEAZA SUMA DIN CONT DUPA ID
  debitAccount(amount, id) {
    let flag = 0;
    for (let index = 0; index < this.activeAccounts.length; index++) {
      if (this.activeAccounts[index].accountID === id) {
        flag = 1;
        console.log(
          "Account " + this.activeAccounts[index].accountID + " debited"
        );
        this.activeAccounts[index].debitAmountById(amount);
      }
    }
    if (!flag) console.log("Can not find account with specified ID");
  }

  // METODA DE STERGERE A TUTUROR CONTURILOR
  clearAccountList() {
    this.activeAccounts.splice(0, this.activeAccounts.length);
    console.log("All acounts have been deleted");
  }
}

// CONSTRUCTOR-UL FOLOSIT PENTRU CREAREA UNUI CONT
function account(accountNr, accountID, accountBalance, accountName) {
  this.accountNr = accountNr;
  this.accountID = accountID;
  this.accountBalance = accountBalance;
  this.accountName = accountName;
}

// PROTOTIPUL ATASAT CONSTRUCTOR-ULUI ACCOUNT FOLOSIT PENTRU DEBITAREA CONTULUI
account.prototype.debitAmountById = function (amount) {
  this.accountBalance -= amount;
};

// SE CREAZA FOLOSIND CLASA BANK UN NOU OBIECT DE TIP BANK
let bank = new Bank("Banca Comerciala Romana", "RNCBROBUXXX", "Romania");

document.getElementById("debit-button").onclick = function () {
  bank.debitAccount(
    document.getElementById("debit-amount").value,
    document.getElementById("target-account-id").value
  );
};

document.getElementById("create-account-button").onclick = function () {
  bank.createAccount(
    document.getElementById("account-nr").value,
    document.getElementById("account-ID").value,
    document.getElementById("account-balance").value,
    document.getElementById("account-name").value
  );
};
