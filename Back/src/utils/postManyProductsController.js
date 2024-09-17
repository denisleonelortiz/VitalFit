const { Product, Category } = require("../db");
const json = require("../data.json");

// async function postProducts() {
//     console.log(json);
    
//     const products = await Promise.all(
//         json.map(
//             async ({
//                 name,
//                 price,
//                 size,
//                 stock,
//                 image,
//                 flavour,
//                 category,
//                 pre_description,
//                 description,
//                 dose,
//             }) => {
//                 const newProduct = await Product.create({
//                     name,
//                     price,
//                     size,
//                     stock,
//                     image,
//                     flavour,
//                     pre_description,
//                     description,
//                     dose,
//                 });

//                 const [categoryDb, categoryCreated] = await Category.findOrCreate({
//                     where: { name: category },
//                 });

//                 await newProduct.setCategory(categoryDb);

//                 return newProduct;
//             }
//         )
//     );

//     return products;
// }

async function postProducts() {
    try {
        // Si está vacía, insertar productos
        const products = await Promise.all(
            json.map(
                async ({
                    name,
                    price,
                    size,
                    stock,
                    image,
                    flavour,
                    category,
                    pre_description,
                    description,
                    dose,
                }) => {
                    // Crear nuevo producto
                    const newProduct = await Product.create({
                        name,
                        price,
                        size,
                        stock,
                        image,
                        flavour,
                        pre_description,
                        description,
                        dose,
                    });

                    // Buscar o crear la categoría
                    const [categoryDb, categoryCreated] = await Category.findOrCreate({
                        where: { name: category },
                    });

                    // Asignar categoría al producto
                    await newProduct.setCategory(categoryDb);

                    return newProduct;
                }
            )
        );

        console.log('Productos insertados correctamente.');
        return products;

    } catch (error) {
        console.error('Error al insertar productos:', error);
        throw error; // Propaga el error para que pueda ser manejado fuera de la función si es necesario
    }
}


module.exports = postProducts;

/* const { Product, Category } = require("../db");
const json = require("../data.json");

async function postProducts() {
  const products = json.forEach(
    async ({
      name,
      price,
      size,
      stock,
      image,
      flavour,
      category,
      pre_description,
      description,
    }) => {
      const newProduct = await Product.create({
        name,
        price,
        size,
        stock,
        image,
        flavour,
        pre_description,
        description,
      });
      const cat = await Category.findOne({ where: { name: category } });
      newProduct.setCategory(cat);
      return newProduct;
    }
  );
  
  return products;
}

module.exports = postProducts; */
/*  const productos = json.map((prod) => ({
  // id: prod.id,
  name: prod.name,
  price: prod.price,
  size: prod.size,
  stock: prod.stock,
  image: prod.image,
  flavour: prod.flavour,
  description: prod.description,
  pre_description: prod.pre_description,
  categoryId: prod.categoryId,
}));

await Product.bulkCreate(productos); */
