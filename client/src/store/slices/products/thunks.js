import { productsIns } from "../../../api";
import {
  cleanEverything,
  findbyProductById,
  handleShopList,
  itemsAdded,
  removeItem,
  resetSorts,
  resetFilters,
  resetSearch,
  setCategories,
  setCurrentPage,
  setFilters,
  setProducts,
  setSearch,
  setSorts,
  startLoading,
} from "./productSlice";
//import { filters } from "./productSlice";

export const loadDB =  () => {
    return async () => {
        const {data} = await productsIns.post("/many")
        return data

    }
}


export const getProducts = ( page = 1) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    const { filters, search, sorts } = getState().product;
    const { category, minPrice, maxPrice } = filters;
    const { sortByName, sortByPrice } = sorts;

    const { data } = await productsIns.get("/", {
      params: {
        search,
        category,
        minPrice,
        maxPrice,
        sortByName,
        sortByPrice,
      },
    });
    dispatch(setProducts(data));
    
    dispatch(setCurrentPage(page));
    return data;
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const { data } = await productsIns.get(`/product/${id}`);

    dispatch(findbyProductById(data));
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    // dispatch(startLoading());

    const { data } = await productsIns.get("/category");
    // console.log(data);

    dispatch(setCategories(data));
  };
};

export const openShopList = (value) => {
  return async (dispatch) => {
    dispatch(handleShopList(value));
  };
};

export const addItems = (id) => {
  return async (dispatch) => {
    const { data } = await productsIns.get(`/product/${id}`);
    // console.log(data);

    dispatch(itemsAdded(data));
  };
};

export const handlePages = (page = 1) => {
  return async (dispatch) => {
    dispatch(setCurrentPage(page));
  };
};

export const onSearchProduct = (product) => {
  return async (dispatch) => {
    const { data } = await productsIns.get("/");
    // console.log(product);

    const productsMatching = data.filter((item) =>
      item.name.toLowerCase().includes(product.toLowerCase())
    );

    dispatch(setProducts(productsMatching));
    dispatch(setCurrentPage(1));
  };
};

export const productsFilters = (filtros) => {
  return async (dispatch) => {
    dispatch(setFilters(filtros));
  };
};
export const removeCartItem = (id) => {
  return async (dispatch) => {
    dispatch(removeItem(id));
  };
};

export const cleanShoppingCart = () => {
  return async (dispatch) => {
    dispatch(cleanEverything());
  };
};

export const cleanFilters = () => {
  return async (dispatch) => {
    dispatch(resetFilters());
  };
};
export const cleanSearch = () => {
  return async (dispatch) => {
    dispatch(resetSearch());
  };
};
export const cleanSorts = () => {
  return async (dispatch) => {
    dispatch(resetSorts());
  };
};
export const productsSorts = (sorts) => {
  return async (dispatch) => {
    dispatch(setSorts(sorts));
  };
};
export const searchProduct = (search) => {
  return async (dispatch) => {
    dispatch(setSearch(search));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    const response = await productsIns.delete(`/product/${id}`);

    // console.log(response);
    // aca despachamos la accion para obtener los productos actualizados
    dispatch(getProducts());
  };
};

export const postProduct = (productData, setCargaExitosa) => {
  return async (dispatch) => {
    try {
      const response = await productsIns.post("/", productData);
      setCargaExitosa(true);
      console.log(response);
    } catch (error) {
      console.log("Error:", error.message);
      setCargaExitosa(false);
    }
  };
};

export const putProduct = (productData, id) => {
  return async (dispatch) => {
    try {
      const response = await productsIns.put(`/product/${id}`, productData);
      console.log(response.data);
      //  dispatch(getProducts());
    } catch (error) {
      console.log("Error:", error.message);
    }
    //
  };
};
export const borradoLogico = (id) => {
  return async (dispatch) => {
    try {
      const response = await productsIns.put(`/activar-desactivar/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
    //
  };
};
