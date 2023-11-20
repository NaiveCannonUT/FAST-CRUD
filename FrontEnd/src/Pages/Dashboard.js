import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const PersonajesContext = React.createContext({
    personajes: [], fetchPersonajes: () => { }
})

//Post
function AddPersonaje() {
    const [nombre, setNombre] = useState("");
    const { personajes, fetchPersonajes } = React.useContext(PersonajesContext);

    const handleInputNombre = event => {
        setNombre(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        const newPersonaje = {
            "id": personajes.length + 1,
            "Nombre": nombre,
        }
        fetch("http://localhost:8000/personajes",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPersonaje)
            }).then(() => {
                fetchPersonajes();
            });
    }
    return (
        <form className="lg:w-4/1 mx-[10%] p-4 absolute">
            <h1 className="text-center p-2 text-4xl font-bold">Agregar personajes</h1>
            <p className="font-semibold">Nombre del personaje</p>
            <input className="border w-[100%] rounded-lg p-2 " placeholder="Agrega nombre" onChange={handleInputNombre}></input>

            <br></br>
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-lg border">Agregar</button>
        </form>

    )
}

//Put

function UpdatePersonaje({ nombre, id}) {
    const [personaje, setPersonaje] = useState(nombre)
    const {fetchPersonajes} = React.useContext(PersonajesContext)
  
    const updatePersonaje = async () => {
      await fetch(`http://localhost:8000/personajes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: personaje })
      })
      
      await fetchPersonajes()
    };

    return (
        <>
            <button
                type="button"
                className="bg-green-500 p-2 text-white rounded-lg"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal${id}`}
            >
                Editar
            </button>
            <div className="modal fade" id={`exampleModal${id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabel${id}`}>Actualizar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* No es necesario el formulario */}
                            <p className="font-semibold">Nombre del personaje</p>
                            <input className="border w-[100%] rounded-lg p-2 " placeholder="Agrega nombre" value={personaje} onChange={e => setPersonaje(e.target.value)}></input>
                        </div>
                        <div className="modal-footer">
                            <button onClick={updatePersonaje} type="button" className="bg-green-500 p-2 text-white rounded-lg" data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


function PersonajeHelper({ nombre, id, fetchPersonajes }) {
    return (
        <div>
            <h1>{nombre}</h1>
            <div>
                <UpdatePersonaje nombre={nombre}
                id={id} fetchPersonajes={fetchPersonajes}>
                </UpdatePersonaje>
                <DeletePersonaje nombre={nombre}
                id={id} fetchPersonajes={fetchPersonajes}>
                </DeletePersonaje>
            </div>
        </div>
    )
}

function DeletePersonaje({id}){
    const {fetchPersonajes} = React.useContext(PersonajesContext)
    const deletePersonaje = async () =>{
        await fetch(`http://localhost:8000/personajes/${id}`,{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: {"id": id}
        })
        await fetchPersonajes()
    }
    return(
        <button onClick={deletePersonaje} className="bg-red-500 rounded-lg text-white p-2">
            Eliminar
        </button>
    )
}

function Dashboard() {
    const [personajes, setPersonajes] = useState([])
    const fetchPersonajes = async () => {
        const response = await fetch("http://localhost:8000/personajes")
        const personajes = await response.json()
        setPersonajes(personajes.data)
    }
    useEffect(() => {
        fetchPersonajes()
    }, [])
    return (
        <PersonajesContext.Provider value={{ personajes, fetchPersonajes }}>
            <Header></Header>

            <h1 className="text-4xl text-center text-indigo-400 font-semibold">Personajes de Genshin impact</h1>
            <AddPersonaje></AddPersonaje>
            <div className="lg:w-4/1 mx-[35%] p-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personajes.map((personaje) => (
                            <tr>
                                <th scope="row">{personaje.id}</th>
                                <td>{personaje.Nombre}</td>
                                <td>
                                    <PersonajeHelper
                                    id={personaje.id} 
                                    fetchPersonajes={fetchPersonajes}>
                                        
                                    </PersonajeHelper>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PersonajesContext.Provider>


    )
}

export default Dashboard
