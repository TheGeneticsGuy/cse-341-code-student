# CSE 341 Web Services - BYU Idaho - Coursework

- Aaron Topping
- Spring 2025
- Prof. Sterling Porter

## Week 1 - Publish API to the web

## Week 2 - Add the Contacts API to the web

**CUSTOMIZED FEATURES**

- Added Prettier for `npm run format` out of habit

________________________
**GET API endpoints**

- / - Retriver Friend's name
- /wife - Retriever my wife's name (proof of concept)
- /contacts - Retrieve all contacts
- /conacts/id - Retrieve specific contact by MongoDB unique ID

________________________
**POST API endpoints**

*All values required*

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

________________________
**PUT API endpoints**

*Change/Update/Replace - Compatible with specific or all*

- /contacts/id

*Update ALL*
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

*Update Part*
```JSON
Content-Type: application/json
{
  "lastName": "newLastName"
}
```

________________________

**DELETE API endpoints**

*Remove a single contact*

- /contacts/id

________________________

[Click Here for Render Deployment](https://cse-341-topping.onrender.com/)
