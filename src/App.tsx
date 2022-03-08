import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from ".";
import ImagesPage from "./pages/imagesPage/components/ImagesPage";
import MainPage from "./pages/main/components/MainPage";

function App() {

  const latestError = JSON.stringify(useSelector<RootState>(state => state.app.latestError))

  return (
    <>
    {latestError !== 'null' ? <div className='alert alert-danger' role='alert'>{latestError}</div> : <></>}
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/images' element={<ImagesPage />} />
    </Routes>
    </>
  );
}

export default App;
