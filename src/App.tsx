import { Route, Routes } from "react-router-dom";
import ImagesPage from "./pages/imagesPage/components/ImagesPage";
import MainPage from "./pages/main/components/MainPage";
import '../src/pages/styles/style.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/images' element={<ImagesPage />} />
    </Routes>
  );
}

export default App;
