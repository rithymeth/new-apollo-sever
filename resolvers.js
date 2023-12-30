// resolvers.js

const resolvers = {
  Query: {
    posts: async (_, __, { prisma }) => {
      return prisma.post.findMany();
    },
    post: async (_, { id }, { prisma }) => {
      return prisma.post.findOne({ where: { id } });
    },
  },
  Mutation: {
    createPost: async (_, { name, instructions, imageUrl, ingredients }, { prisma }) => {
      return prisma.post.create({
        data: {
          name,
          instructions,
          imageUrl,
          ingredients: {
            create: ingredients,
          },
        },
      });
    },
    updatePost: async (_, { id, name, instructions, imageUrl, ingredients }, { prisma }) => {
      return prisma.post.update({
        where: { id },
        data: {
          name,
          instructions,
          imageUrl,
          ingredients: {
            updateMany: ingredients.map((ingredient) => ({
              where: { id: ingredient.id },
              data: ingredient,
            })),
          },
        },
      });
    },
    deletePost: async (_, { id }, { prisma }) => {
      return prisma.post.delete({ where: { id } });
    },
  },
};

module.exports = resolvers;
