require("./../config/db.config");
const faker = require("faker");
const Category = require("./../models/category.model");
faker.locale = "fr";

const save = data => {
  const category = new Category(data);
  category.save((err, category) => {
    if (err) {
      console.log(err);
    }
  });
  return category;
};

for (let index = 0; index < 5; index++) {
  let label = faker.random.words(2);
  const parent = save({ label });
  console.log(`===== La catégorie "${label}" est ajoutée =====`);
  const length = Math.floor(Math.random() * 6);
  for (let j = 0; j < length; j++) {
    const parentId = parent._id;
    let label = faker.random.word(2);
    save({ label, parentId });
    console.log(`****** La catégorie "${label}" est ajoutée ******`);
  }
}
