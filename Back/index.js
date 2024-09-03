const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const Product = require("./src/Models/Product.js")

async function loadInitialData() {
    try {
        const filePath = path.join(__dirname, 'data.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(jsonData);

        // // Elimina todos los productos existentes antes de cargar nuevos datos
        // await Product.destroy({ where: {} });

        // Inserta los datos del JSON en la base de datos
        await Product.bulkCreate(products);
        console.log('Base de datos cargada con datos iniciales.');
    } catch (error) {
        console.error('Error al cargar los datos iniciales:', error);
    }
}

conn.sync({ alter: true }).then(() => {
    loadInitialData()
    server.listen(PORT, () => {
        console.log(`server listening at ${PORT}`);
    });
});
