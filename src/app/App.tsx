import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./providers";
import { Header } from "widgets";
import { Routes } from "pages/routes";
import { Footer } from "shared/ui";
import 'antd/dist/antd.css'
import './styles/global-styles.css'


function App() {
  return (
    <div className="App">
      <MainProvider>
        <Main>
          <BrowserRouter>
            <Header />
            <Routes />
            <Footer />
          </BrowserRouter>
        </Main>
      </MainProvider>
    </div>
  );
}

export default App;

interface Props {
  children?: React.ReactElement | React.ReactElement[]
}

const Main: React.FC<Props> = React.forwardRef((props, ref) =>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  > 
    {props.children}
  </div>)