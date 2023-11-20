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

#Get root

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hellow"}

personajes = [
    {
        "id": "1",
        "Nombre" : "Hu tao",
    },
    {
        "id": "2",
        "Nombre" : "Furina",
    },
    {
        "id": "3",
        "Nombre" : "Collei",
    },
    {
        "id": "4",
        "Nombre" : "Fischl",
    },
    {
        "id": "5",
        "Nombre" : "Kamisato Ayaka",
    },
    {
        "id": "6",
        "Nombre" : "Kuki Shinobu",
    },
    {
        "id": "7",
        "Nombre" : "Tartaglia",
    },
    {
        "id": "8",
        "Nombre" : "Kaeya",
    },
    {
        "id": "9",
        "Nombre" : "Noelle",
    },
    {
        "id": "10",
        "Nombre" : "Zhongli",
    },
    
]
#GET router

@app.get("/personajes", tags=["personajes"])
async def get_personajes() -> dict:
    return {"data": personajes}

#POST

@app.post("/personajes", tags=["personajes"])
async def add_personajes(personaje:dict) -> dict:
    personajes.append(personaje)
    return{
        "data":{"Personaje a sido agreado"}
    }

#Put

@app.put("/personajes/{id}", tags=["personajes"])
async def update_personajes(id: int, body: dict) -> dict:
    for personaje in personajes:
        if int(personaje["id"]) == id:
            personaje["Nombre"] = body["Nombre"]
            return {
                "data": f"Personaje with id {id} has been updated."
            }

    return {
        "data": f"Personaje with id {id} not found."
    }
    
@app.delete("/personajes{id}", tags=["todos"])
async def delete_personaje(id: int) -> dict:
    for personaje in personajes:
        if int(personaje["id"]) == id:
            personajes.remove(personaje)
            return {
                "data" : f"Personaje with {id} has been removed"
            }
            
    return {
        "data" : f"Personaje with id {id} not found"
    }