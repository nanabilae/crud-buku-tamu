import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ListRoutes } from "./routes";

function App() {
  return(
    <Suspense fallback={<>loading...</>}>
      <Routes>
        {
          ListRoutes.map((item, key) => (
            <Route key={key} exact path={item.path} element={<item.component />}/>
          ))
        }
        <Route path="*" element={<><center>Not Found!</center></>}/>
      </Routes>
    </Suspense>
  );
}

export default App;