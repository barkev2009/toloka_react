import { Route, Routes } from "react-router-dom";
import ImagesPage from "./pages/imagesPage/components/ImagesPage";
import MainPage from "./pages/main/components/MainPage";

function App() {


  return (
    <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route exact path='/images' element={<ImagesPage />} />
    </Routes>
  );
}

export default App;
