import { Navigate, Route, useLocation, Routes } from "react-router-dom";

import { AppRouter, AuthRoutes } from "./";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProducts, loadDB } from "../store/slices";
import { useSelector } from "react-redux";
import { AdminRoutes } from "./AdminRoutes";
import { productsIns } from "../api";


export const MainRouter = () => {
  const { status, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadDatabase = async () => {
        try {
          // Realiza una solicitud POST a la ruta /many
          const response = await productsIns.post('/many');
          console.log('Base de datos cargada:', response.data);
        } catch (error) {
          console.error('Error al cargar la base de datos:', error);
        }
      };
  
      loadDatabase();
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
