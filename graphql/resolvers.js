const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name,
        description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createdRecipe.save(); //MongoDB saving
      console.log(res._doc, "res._doc");
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      //the above will give us 1 if sth is deleted , and 0 if nth is deleted
      return wasDeleted;
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = await Recipe.updateOne(
        { _id: ID }, //1in arg filter anelu hamar e
        { name, description  } //2rd inch update ani
      ).modifiedCount;
      console.log(wasEdited, "--wasEdited");
      return wasEdited; //will give us 1 if sth is deleted , and 0 if nth is deleted
    },
  },
};
