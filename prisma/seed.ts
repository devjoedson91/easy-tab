const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec nisl lorem. Praesent pharetra, sapien ut fringilla malesuada, nisi felis ullamcorper ex, eu consectetur elit dolor sed dolor. Praesent orci mi, auctor aliquet semper vitae, volutpat quis augue.";

const createBrazilian = async (
  desertsCategoryId: string,
  juicesCategoryId: string
) => {
  const brazilianCategory = await prismaClient.category.create({
    data: {
      name: "Pratos",
    },
  });

  const brazilianRestaurants = [
    {
      name: "Churrascaria House",
      imageUrl:
        "https://utfs.io/f/5a090f6e-520f-418a-a42a-043b512314a2-n9n78u.png",
      deliveryFee: 5,
      deliveryTimeMinutes: 30,
      categories: {
        connect: {
          id: brazilianCategory.id,
        },
      },
    },
    {
      name: "Omni Churrascaria",
      imageUrl:
        "https://utfs.io/f/87338583-660e-47f1-a80d-6ea804298bd5-n9n78v.png",
      deliveryFee: 5,
      deliveryTimeMinutes: 30,
      categories: {
        connect: {
          id: brazilianCategory.id,
        },
      },
    },
    {
      name: "The Churrascaria Queen",
      imageUrl:
        "https://utfs.io/f/b26b00ca-5041-46cb-9b68-a1856ed064ad-n9n78w.png",
      deliveryFee: 0,
      deliveryTimeMinutes: 45,
      categories: {
        connect: {
          id: brazilianCategory.id,
        },
      },
    },
    {
      name: "Churrascaria House",
      imageUrl:
        "https://utfs.io/f/c1f279ea-ac09-4e4f-9757-30018cb4c7bc-n9n78x.png",
      deliveryFee: 10,
      deliveryTimeMinutes: 20,
      categories: {
        connect: {
          id: brazilianCategory.id,
        },
      },
    },
  ];

  for (const item of brazilianRestaurants) {
    const restaurant = await prismaClient.restaurant.create({
      data: item,
    });

    console.log(`Created ${restaurant.name}`);

    await createDeserts(restaurant.id, desertsCategoryId);
    await createJuices(restaurant.id, juicesCategoryId);

    const brazilianProducts = [
      {
        name: "Camarão Citrus",
        price: "40",
        description: description,
        banner:
          "https://utfs.io/f/cecdeeb8-10e6-4be8-8553-0a120717d194-xf34p9.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
      {
        name: "Picanha Especial",
        price: "45",
        description: description,
        banner:
          "https://utfs.io/f/089299df-fcb9-446a-a8cc-75e4e26b7357-xf34p8.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
      {
        name: "Macarrão com Carne",
        price: "35",
        description: description,
        banner:
          "https://utfs.io/f/891eb8aa-635e-4cb3-b7fd-eb8d1c9f14e1-xf34p7.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
      {
        name: "Carne com Salada",
        price: "35",
        description: description,
        banner:
          "https://utfs.io/f/43d9e18a-4ba9-47b6-9a87-6d4fedbd6f41-xf34ol.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
      {
        name: "Filé Mignon com Fritas",
        price: "40",
        description: description,
        banner:
          "https://utfs.io/f/0cfa51a6-1a88-4114-a6c6-bf607a5a1cb0-xf34ok.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
      {
        name: "Frango ao Molho",
        price: "40",
        description: description,
        banner:
          "https://utfs.io/f/9158a622-4b87-4ec6-a726-569dee27a093-xf34oj.png",
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        category: {
          connect: {
            id: brazilianCategory.id,
          },
        },
      },
    ];

    for (const product of brazilianProducts) {
      await prismaClient.product.create({
        data: product,
      });

      console.log(`Created ${product.name}`);
    }
  }
};

const createDeserts = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const desertProducts = [
    {
      name: "Sorvete Especial",
      price: "30",
      description: description,
      banner:
        "https://utfs.io/f/b703fcaa-eb9c-4257-a08e-fba0f0e12fc1-pr8gxl.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Bolo de Chocolate",
      price: "40",
      description: description,
      banner:
        "https://utfs.io/f/029befff-aba7-49b3-91c4-8da022e699b0-pr8gxm.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Petit Gateau",
      price: "55",
      description: description,
      banner:
        "https://utfs.io/f/98f262f6-dc35-428b-bac9-ac443f9f41bb-pr8gxn.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Bolo de Morango",
      price: "35",
      description: description,
      banner:
        "https://utfs.io/f/6e6ad97a-f1f1-4d4b-bb40-f5ff25ba97d4-pr8gxo.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Biscoito de Chocolate",
      price: "30",
      description: description,
      banner:
        "https://utfs.io/f/4b8d0b7c-daa9-46f6-aebd-385cf5e086f7-pr8gxp.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Torta de Morango",
      price: "45",
      description: description,
      banner:
        "https://utfs.io/f/4caadde1-0a1c-45a6-895b-4bfb6986099d-pr8gxq.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  ];

  for (const product of desertProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const createJuices = async (restaurantId: string, categoryId: string) => {
  await prismaClient.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      categories: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  const juiceProducts = [
    {
      name: "Suco de Cenoura",
      price: "15",
      description: description,
      banner:
        "https://utfs.io/f/5126e950-40ca-4ef1-a166-16274fec16bc-6b2vea.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco Cítrico",
      price: "20",
      description: description,
      banner:
        "https://utfs.io/f/6dbe915d-af87-4f2a-b841-864ba9427da8-6b2ve9.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco de Limão",
      price: "12",
      description: description,
      banner:
        "https://utfs.io/f/03aa4137-c949-4d2c-bdf2-bad6dd1f565e-6b2ve7.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco de Laranja",
      price: "12",
      description: description,
      banner:
        "https://utfs.io/f/ce2b8e30-b922-4b1e-bdde-656348cd25c3-6b2ve6.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco de Abacaxi",
      price: "12",
      description: description,
      banner:
        "https://utfs.io/f/c4202826-7014-4368-8941-fa1af9b9c8b2-6b2ve5.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    {
      name: "Suco de Melancia",
      price: "12",
      description: description,
      banner:
        "https://utfs.io/f/a9ba878f-79a8-4c25-883c-5c2e1670b256-6b2ve4.png",
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  ];

  for (const product of juiceProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }
};

const main = async () => {
  const desertsCategory = await prismaClient.category.create({
    data: {
      name: "Sobremesas",
    },
  });

  const juicesCategory = await prismaClient.category.create({
    data: {
      name: "Sucos",
    },
  });

  await createBrazilian(desertsCategory.id, juicesCategory.id);
};

main()
  .then(() => {
    console.log("Seed do banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
