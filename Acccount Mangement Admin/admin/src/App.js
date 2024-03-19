// project import
import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { createContext, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
export const DomainContext = createContext();
export const PadinationContext = createContext();

const App = () => {
  // const domainName = 'http://108.181.192.251:3001'; //live
  const domainName = "http://108.181.192.251:3000"; //dev
  // const domainName = 'http://192.168.29.127:3000';
  // const domainName = 'http://192.168.29.127:3000';
  const apiBase = `${domainName}/v2`;
  const imageBase = `${domainName}`;

  const [pagination, setpagination] = useState({
    category: 1,
    users: 1,
    provider: 1,
    events: 1,
    transactions: 1,
    shippingProduct: 1,
  });

  return (
    <DomainContext.Provider value={{ apiBase, imageBase }}>
      <PadinationContext.Provider value={{ pagination, setpagination }}>
        <ThemeCustomization>
          <ScrollTop>
            <Routes />
          </ScrollTop>
        </ThemeCustomization>
      </PadinationContext.Provider>
    </DomainContext.Provider>
  );
};

export default App;
