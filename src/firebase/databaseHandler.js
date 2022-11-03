import { ref, set, update } from "firebase/database";
import { db as databaseRef } from "./firebase-config";

//Initial amounts when creating new entry in database.
var bank = 2000;
var invested = 0;
var available = bank;
var stocks = "empty";

//New User: write to database for the first time
export function addNewUserDB(userID, name, email) {
  set(ref(databaseRef, `/${userID}`), {
    userID,
    name,
    email,
    bank,
    invested,
    available,
    stocks,
  });
}

export function updateStockList(userID, newList) {
  //TODO: Work on this.
  update(ref(databaseRef, `/${userID}`), {
    stocks: newList,
  });
}

export function retBankAmount(userID) {
  //This wil return the totla bank amount from DB.
}

export function retTotalInvested(userID) {
  //This wil return the totla invested  amount from DB.
}

export function retTotalStockList(userID) {
  //This wil return the stockList from DB.
}

export function updateBankTotal(userID) {
  //This will update Bank Total,
}
