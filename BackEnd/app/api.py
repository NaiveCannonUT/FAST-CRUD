from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#Def
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#GET router

@app.get("/personajes", tags=["personajes"])
async def get_personajes() -> dict:
    return {"data": personajes}

#POST

@app.post("/personajes", tags=["personajes"])
async def add_personajes(personajes:dict) -> dict:
    personajes.append(personajes)
    return{
        "data":{"Personaje a sido agreado"}
    }

personajes = [
    {
        "id_personaje": "1",
        "Nombre" : "Hu tao",
        "Descripcion" : "La 77th directora de la funeraria del camino",
        "Rareza" : "5 Estrellas",
        "Elemento" : "Pyro",
        "Region" : "Liyue",
        "Arma" : "Lanza"
    },
    {
        "id_personaje": "2",
        "Nombre" : "Furina",
        "Descripcion" : "Una autentica celebridad de fontaine",
        "Rareza" : "5 estrellas",
        "Elemento" : "Hydro",
        "Region" : "Fontaine",
        "Arma" : "Espada ligera"
    },
    {
        "id_personaje": "3",
        "Nombre" : "Collei",
        "Descripcion" : "Una guardabosques en practicas",
        "Rareza" : "4 estrellas",
        "Elemento" : "Dendro",
        "Region" : "Sumeru",
        "Arma" : "Arco"
    }
]