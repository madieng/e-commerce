require("./../config/db.config");
const faker = require("faker");
const Category = require("./../models/category.model");
faker.locale = "fr";

const save = async data => {
  const category = new Category(data);
  category.save((err, category) => {
    if (err) {
      console.log(err);
    }
    console.log(`===== La catégorie "${category.label}" est ajoutée =====`);
  });
};

for (let index = 0; index < 5; index++) {
  const label = faker.random.word();
  save({ label });
}
