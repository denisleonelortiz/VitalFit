import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { putProduct } from "../../../../store";
import { useState, useRef } from "react";
import { uploadfiles } from "../../../../firebase/config";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const [file, setFile] = useState([]);
  const [fileViewed, setfileViewed] = useState([]);
  const fileUrlRef = useRef([]);
  const navigate = useNavigate();

  const productFilter = products.filter((prod) => prod.id == id);
  const product = productFilter[0];
  console.log(product);

  const [productData, setProductData] = useState({
    name: product.name,
    price: product.price,
    size: product.size,
    stock: product.stock,
    image: product.image,
    flavour: product.flavour,
    description: product.description[0],
    pre_description: product.pre_description,
  });

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      const response = await Promise.all(file.map((file) => uploadfiles(file)));
      fileUrlRef.current = response;

      console.log(fileUrlRef.current);
    } catch (error) {
      console.error(error);
    }
  };
  const hanldeFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const review = selectedFilesArray.map((file, index) => ({
      id: index,
      file: file,
      previewUrl: URL.createObjectURL(file), //crea una url de vista previa
    }));

    try {
      const response = await Promise.all(selectedFilesArray.map(uploadfiles));
      fileUrlRef.current = response;

      setFile((prevFiles) => [...prevFiles, ...selectedFilesArray]);
      setfileViewed((prevFiles) => [...prevFiles, ...review]);

      // Actualizar productData.image con la primera URL de la lista de URLs
      setProductData({
        ...productData,
        image: fileUrlRef.current.length > 0 ? [fileUrlRef.current[0]] : [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === productData.image) {
      //guardar en un array las referencias de imagenes cargadas
      //   const selectedImage = Array.from(e.target.files);
      setProductData({
        ...productData,
        [e.target.name]: fileUrlRef.current,
      });
    } else if (e.target.name === productData.flavour) {
      const selectedFlavour = e.target.value
        .split(",")
        .map((flavor) => flavor.trim());
      setProductData({
        ...productData,
        [e.target.value]: selectedFlavour,
      });
      //los sabores se reciben en un string separado por , y se convierte en array para mandarlo al back
    } else if (e.target.name === productData.pre_description) {
      const preDescription = e.target.value
        .split(".")
        .map((desc) => desc.trim());
      setProductData({
        ...productData,
        [e.target.name]: preDescription,
      });
      //en el caso de la preDescripcion hace lo mismo, recibe string separa por . en un array
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(putProduct(productData, id));
    navigate("/dasboard");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow-md">
      <Link
        className="fixed right-[93%] mb-4 bg-primary text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        to="/dasboard"
      >
        Volver
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={productData.name}
            name="name"
            onChange={handleChange}
            maxLength={20}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Precio
          </label>
          <input
            type="text"
            id="price"
            value={productData.price}
            name="price"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-600"
          >
            Tamaño
          </label>
          <input
            type="text"
            id="size"
            value={productData.size}
            name="size"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-600"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            value={productData.stock}
            name="stock"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Imagen
          </label>
          <img
            src={product.image[0]}
            alt=""
            className="mt-1 mb-4 w-full h-auto rounded"
          />
          <input
            type="file"
            id="image"
            name="image"
            onChange={hanldeFileChange}
            className="p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="mt-2 flex space-x-2">
            {fileViewed.map((file, index) => (
              <div key={index}>
                <img
                  src={file.previewUrl}
                  alt={`Preview ${index}`}
                  className="max-w-20 max-h-20"
                />
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmitFile}
          >
            {" "}
            Subir imagen{" "}
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="flavour"
            className="block text-sm font-medium text-gray-600"
          >
            Sabor
          </label>
          <input
            type="text"
            id="flavour"
            value={productData.flavour}
            name="flavour"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Descripcion
          </label>
          <textarea
            id="description"
            value={productData.description}
            name="description"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pre_description"
            className="block text-sm font-medium text-gray-600"
          >
            Pre descripcion
          </label>
          <textarea
            id="pre_description"
            value={productData.pre_description.join("\n")}
            name="pre_description"
            onChange={(e) =>
              handleChange("pre_description", e.target.value.split("\n"))
            }
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Editar producto
        </button>
      </form>
    </div>
  );
}
