import { ref, set } from "firebase/database";
import { db } from "./firebase-config";

//Initial amounts when creating new entry in database.
var bank = 2000;
var invested = 0;
var available = bank;
var stocks = "empty";

//New User: write to database for the first time
export function addNewUserDB(userID, name, email) {
  set(ref(db, userID), {
    userID,
    name,
    email,
    bank,
    invested,
    available,
    stocks,
  });
}
