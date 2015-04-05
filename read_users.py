#Recopila info. de los usuarios
import decimal
import random
import json

class Usuario:
    def __init__(self,user,latitude,longitude,time,location):
        self.user=user
        self.latitude=[latitude]
        self.longitude=[longitude]
        self.time=[time]
        self.location=[location]
        self.amigos=[]
        
    def viaje(self,latitude,longitude,time,location):
        self.latitude.append(latitude)
        self.longitude.append(longitude)
        self.time.append(time)
        self.location.append(location)

    def amigar(self,amigo):
        self.amigos.append(amigo)
        
        

usuarios=[]
lines=[]
cant_checkins=-1

with open("foursquare_checkins.csv","r") as f:        #Se asume que el formato de entrega de datos es fijo
    for lin in f:
        cant_checkins+=1
        line=lin.strip()
        lines.append(line)
        info=line.split(",")
        
        if info[0]=="user":
            continue
        lines.append(line)
        if int(info[0])>=len(usuarios):
            usuario=Usuario(info[0],info[1],info[2],info[3],info[4])
            usuarios.append(usuario)
        else:
            usuarios[int(info[0])].viaje(info[1],info[2],info[3],info[4])

cant_amigos=-1

with open("foursquare_friendship.csv","r") as f:   #Se asume que el formato de entrega de datos es fijo
    for line in f:
        cant_amigos+=1
        line=line.strip()
        info=line.split(",")
        if info[0]=="user1":
            continue
        user1=info[0]
        user2=info[1]
        usuarios[int(user1)].amigar(user2)
        

cant_usuarios=len(usuarios)

locations=[]
for usuario in usuarios:
    for location in usuario.location:
        if int(location)>=len(locations):
            locations.append(location)
        else:
            continue
cant_locations=len(locations)



checkins_por_usuario=decimal.Decimal(cant_checkins/cant_usuarios)
checkins_por_location=decimal.Decimal(cant_checkins/cant_locations)
amigos_por_usuario=decimal.Decimal(cant_amigos/cant_usuarios)


file = open("datos_usuarios.json", "w")
salida={}
salida["cant_usuarios"]=str(cant_usuarios)+" usuarios"
salida["cant_locations"]=str(cant_locations)+" ubicaciones"
salida["cant_checkins"]=str(cant_checkins)+" check-ins"
salida["amigos_por_usuario"]="En promedio "+str(round(amigos_por_usuario,1))+" amigos por usuario"
salida["checkins_por_usuario"]="En promedio "+str(round(checkins_por_usuario,1))+" check-ins por usuario"
salida["checkins_por_location"]="En promedio "+str(round(checkins_por_location,1))+" check-ins por ubicación"
file.write(json.dumps(salida,file,indent=4))
file.close()

random.shuffle(lines)
file = open("muestreo_usuarios.json", "w")
salida={}
users=[]
for i in range(500):
    dato={}
    line=lines[i].split(",")
    dato["user"]=line[0]
    dato["latitude"]=float(line[1])
    dato["longitude"]=float(line[2])
    dato["time"]=line[3]
    dato["location"]=line[4]
    users.append(dato)
salida["users"]=users
file.write(json.dumps(salida,file,indent=4))
file.close()



print("Proceso de análisis de datos finalizado.")
