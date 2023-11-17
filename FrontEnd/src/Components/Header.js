import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const PersonajesContext = React.createContext({
    personajes: [], fetchPersonajes: () =>{}
})

function Header() {
    const [personajes, setPersonajes] = useState([])
    const fetchPersonajes = async() =>{
        const response = await fetch("http://localhost:8000/personajes")
        const personajes = await response.json()
        setPersonajes(personajes.data)
    }
    useEffect(() =>{
        fetchPersonajes()
    }, [])
    return (
        <PersonajesContext.Provider value ={{personajes, fetchPersonajes}}>
            <div className="bg-purple-300 p-2">
                <h1 className="font-semibold text-4xl">Bienvenido de vuelta!</h1>
            </div>

            <h1 className="text-center text-indigo-400 font-semibold">Personajes</h1>
            <div className="lg:w-4/1 mx-5 p-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Rareza</th>
                            <th scope="col">Elemento</th>
                            <th scope="col">Region</th>
                            <th scope="col">Arma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personajes.map((personajes)=>(
                            
                        
                        <tr>
                            <th scope="row">{personajes.id_personaje}</th>
                            <td>{personajes.Nombre}</td>
                            <td>{personajes.Descripcion}</td>
                            <td>{personajes.Rareza}</td>
                            <td>{personajes.Elemento}</td>
                            <td>{personajes.Region}</td>
                            <td>{personajes.Arma}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PersonajesContext.Provider>

    )
}

export default Header
