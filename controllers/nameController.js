//  This Controller holds the function to handle logic for the route
// (in this assignment's case, getting the name - I used my wife's name)

let name = "Allison Topping";

const getName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');  // Need to indicate response type

    // Rather than send a string, I am sending a JSON since that is the defacto standard of APIs
    res.status(200).json({ name: name });
};

module.exports = {
    getName
};