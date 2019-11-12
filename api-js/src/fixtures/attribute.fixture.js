require("../config/db.config");
const faker = require("faker");
const Atrribute = require("../models/attribute.model");
faker.locale = "fr";

const save = data => {
    const attribute = new Atrribute(data);
    attribute.save((err, attribute) => {
        if (err) {
            console.log(err);
        }
    });
    return attribute;
};

for (let index = 0; index < 5; index++) {
    let label = faker.random.words(2);
    save({
        label
    });
    console.log(`===== L'attribute "${label}" est ajouté =====`);
}