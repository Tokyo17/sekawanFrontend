import { useState } from 'react'
import {BrowserRouter, RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Tickets from './Pages/Tickets/Tickets';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MyProvider } from './MyContext';

function App() {

  const[dataLogin,setDataLogin]=useState({name:"",url:''})

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login dataLogin={dataLogin} setDataLogin={setDataLogin}/>
    },{
      path: "/home",
      element: <Home dataLogin={dataLogin} setDataLogin={setDataLogin}/>
    },{
      path: "/tickets",
      element: <Tickets dataLogin={dataLogin} setDataLogin={setDataLogin}/>
    },
  ]);

  const client = new ApolloClient({
    uri: 'https://optimum-corgi-31.hasura.app/v1/graphql',
    headers:{
      "x-hasura-admin-secret":
      "dKHsPm53cqnlHZuM3TpUiqgGsVxicG36KEDxAhw2cUeKfOB5R4TS2ab8vRkUaLy9"
    },
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    </ApolloProvider>
    
  )
}

export default App
