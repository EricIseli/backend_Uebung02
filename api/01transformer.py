#Anaconda prompt: 

#conda activate webapi
#cd C:\Projects_WebDiv\backend_Uebung02\api
#fastapi dev 01transformer.py

from fastapi import FastAPI, HTTPException
from pyproj import Transformer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Erlaubt alle Ursprünge
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)



wgs84_to_lv95 = Transformer.from_crs("EPSG:4326", "EPSG:2056", always_xy=True)
lv95_to_wgs84 = Transformer.from_crs("EPSG:2056", "EPSG:4326", always_xy=True)

@app.get("/wgs84lv95/")
async def wgs84_to_lv95_endpoint(lng: float, lat: float):
   
    try:
        e, n = wgs84_to_lv95.transform(lng, lat)
        return {"reference_system": "LV95", "east": e, "north": n}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/lv95wgs84/")
async def lv95_to_wgs84_endpoint(east: float, north: float):
   
    try:
        lng, lat = lv95_to_wgs84.transform(east, north)
        return {"reference_system": "WGS84", "longitude": lng, "latitude": lat}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))