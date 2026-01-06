## Guia para la creación de proyecto ReactJS

### 1.Creamos un proyecto con vite

- `npm create vite@latest` - Este comando nos creará el archivo package.json   
- Select a framework: seleccionaremos `React`   
- Select a variant: seleccionaremos `JavaScript`   
- Use rolldown-vite (Experimental)?: seleccionaremos `No`   
- Install with npm and start now? Lo que prefiráis.


### 2. Instalamos librerías a usar

`npm i react-router-dom` - Si vamos a usar React Router en nuestro proyecto  

### 3. Inicio de proyecto

En React, un proyecto cuelga de App.jsx, de forma que dejamos dicho archivo limpio y preparado para el desarrollo.   
Nos debe quedar algo similar a lo siguiente:   
```
import './App.css'

function App() {

  return (
    <>

    </>
  )
}

export default App
```

### 4. Creación de paginas, componentes, etc...   
El formato de los archivos en React es `.jsx.` Combina HTML y JavaScript.   
En un proyecto, podremos tener paginas que se rellenan de otros compoenentes.   
Crearemos un arbol de directorios acorde a lo que vayamos a crear.   
Por ejemplo, podemos crearnos el directorio `pages`, `components`, `services`, etc...   
Tendríamos algo similar a:   

```
src/
  |- pages/
  |- components/
  |- services/
  |- App.css
  |- App.jsx
  |- index.css
  |- main.jsx
index.html
package.json
```

Cuando creeemos componentes, usaremos PascalCase, por ejemplo: HomePage.jsx   
A la hora de rellenar de contenido una pagina o componenete, usaremos el snipet `rafce`, que nos configura una arrow fucntion ya exportada para poder llamarla desde otro lugar.
Un ejemplo de componente creado es:   
```
import React from 'react'

const HomePage = () => {
  return (
    <div>HomePage</div>
  )
}

export default HomePage
```

### 5. Carga de componentes
Un componente que se carga desde otro componente o pagina no es más que importarlo en ese ubicandolo entre signos de etiqueta HTML, por ejemplo:   
```
import React from 'react'
import InfoComponent from './InfoComponent'

const HomePage = () => {
  return (
    <>
      <div>Pagina principal</div>
      <InfoComponent />
    </>
  )
}

export default HomePage
```  

### 6. Paso de propiedades en componentes

En React, las propiedades se pasan de un componente padre a uno hijo metiendolos como atributos al importarlo y en el hijo se reciben como props y se sacan con desestructuring.
Ejemplo:  
- Componente padre:   
```
import React from "react";
import InfoComponent from "./InfoComponent";

const HomePage = () => {
  const dataInfoPerson = { name: "Olga", lastName: "Ruiz" };
  return (
    <>
      <div>Pagina principal</div>
      <InfoComponent dataInfo={dataInfoPerson}/>
    </>
  );
};

export default HomePage;
```   
- Componente hijo:   
```
import React from "react";

const InfoComponent = (props) => {
  const { dataInfo } = props;

  return (
    <>
      <div>InfoComponent</div>
      <p>{JSON.stringify(dataInfo)}</p>
    </>
  );
};

export default InfoComponent;
```

### 7. Hooks
En React usaremos hooks para tener majejo de ciertas situaciones
- `useState()` - Papara mantener el estado local de una constante en nuestro componente. Uso: `const [nombre, setNombre] = useState()`.   
- `useEffect()` - Para realizar una acción al menos una vez al cargar el compoenente y si alguna de sus dependencias cambia. Uso: `useEffect(() => { //Codigo }, [dependencias])`.
- `useNavigate()` - PAra navegar entre componentes usando React Router. Uso: `const navigate = useNavigate(); navigate("/", { state: { // Objetos a pasar}})`.    
Si solo lleva el primer parametro, es simplemente para ir a esa ruta. Dicha ruta debe estar definida previamente.
- `useLocation()` - PAra recibir los datos enviados desde navigate. Uso: `const location = useLocation(); const { state } = location`.
- `useParams()` - PAra poder recibir los datos enviados como ROute params. Uso:    
`<Route path="/details/:idUser" element={<DetailsPage/>} />; en DetailsPage => const params = useParams(); const { idUser } = params;`


### 8. React Router
React Router nmos facilita el manejo de rutas dentro de mi App. Las rutas se definen en App.jsx.   
Ejemplo de declaración:
```
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CreateStudentPage from './pages/CreateStudentPage';
import DetailsStudentPage from './pages/DetailsStudentPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateStudentPage />} />
          <Route path="/details/:idAlumno" element={<DetailsStudentPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
```

Si usamos un layout, que usamos para mostrar en todas las paginas una misma cabecera por ejemplo, un ejemplo sería:   
```
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrearRutaPage from './pages/CrearRutaPage';
import InfoRutaPage from './pages/InfoRutaPage';
import ContactPage from './pages/ContactPage';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<CrearRutaPage />} />
          <Route path="/info" element={<InfoRutaPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Y un ejemplo de Layout con Menú de navegación:   
```
import React from "react";
import { Outlet } from "react-router";
import MenuComponent from "../components/MenuComponent";

const MainLayout = () => {
  return (
    <div style={{width: "30vw"}}>
      <header>
        <MenuComponent />
      </header>
      <hr />
      <Outlet />
    </div>
  );
};

export default MainLayout;
```
Donde `<Outlet />` es donde ese layout pintará las rutas que tiene incluidas.
```
import React from 'react'
import { Link } from 'react-router'

const MenuComponent = () => {
  return (
    <nav style={{display: "flex", justifyContent: "space-around"}}>
        <Link className='link-button' to="/">LISTADO CIRCUITOS</Link>
        <Link className='link-button' to="/contact">CONTACTO</Link>
    </nav>
  )
}

export default MenuComponent
```
