# CSE 341 Web Services - BYU Idaho - Coursework

- Aaron Topping
- Spring 2025
- Prof. Sterling Porter

## Week 1 - Publish API to the web

## Week 2 - Add the Contacts API to the web

**CUSTOMIZED FEATURES**

- Added Prettier for `npm run format` out of habit

---

**GET API endpoints**

- / - Retriver Friend's name
- /wife - Retriever my wife's name (proof of concept)
- /contacts - Retrieve all contacts
- /conacts/id - Retrieve specific contact by MongoDB unique ID

---

**POST API endpoints**

_All values required_

- /contacts

```JSON
Content-Type: application/json
{
  "firstName": "New",
  "lastName": "User",
  "email": "new.user@byui.edu",
  "favoriteColor": "Green",
  "birthday": "1995-05-09"
}
```

---

**PUT API endpoints**

_Change/Update/Replace - Compatible with specific or all_

- /contacts/id

_Update ALL_

```JSON
Content-Type: application/json
{
  "firstName": "New",
  "lastName": "User",
  "email": "new.user@byui.edu",
  "favoriteColor": "Green",
  "birthday": "1995-05-09"
}
```

_Update Part_

```JSON
Content-Type: application/json
{
  "lastName": "newLastName"
}
```

---

**DELETE API endpoints**

_Remove a single contact_

- /contacts/id

---

[Click Here for Render Deployment](https://cse-341-topping.onrender.com/)
