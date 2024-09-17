import { Navigate, Route, useLocation, Routes } from "react-router-dom";

import { AppRouter, AuthRoutes } from "./";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProducts } from "../store/slices";
import { useSelector } from "react-redux";
import { AdminRoutes } from "./AdminRoutes";
import { productsIns } from "../api";

export const MainRouter = () => {
    const { status, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const loadDatabase = async () => {
          try {
            // Verifica si los datos ya están cargados en la base de datos
            const response = await productsIns.get('/');
             // Ruta que verifica el estado de la BD
            if (!response.data.length) {
              // Si la base de datos está vacía, inserta los datos
              const insertResponse = await productsIns.post('/many', {
                // Datos iniciales para poblar la BD
              });
              console.log('Datos insertados correctamente:', insertResponse.data);
            } else {
              console.log('Base de datos ya tiene datos.');
            }
          } catch (error) {
            console.error('Error al cargar o verificar la base de datos:', error);
          }
        };
    
        loadDatabase();
        
        // Despachar acciones para obtener productos y categorías
        dispatch(getProducts());
        dispatch(getCategories());
      }, [dispatch]);

    return (
        <Routes>
            {user.role === "admin" ? (
                <Route path="/*" element={<AdminRoutes />} />
            ) : (
                <Route path="/*" element={<AppRouter />} />
            )}

            {status !== "online" && (
                <>
                    <Route path="auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<AppRouter />} />
                </>
            )}
        </Routes>
    );
};
