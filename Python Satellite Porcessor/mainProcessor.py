import matplotlib.pyplot as plt
import pandas as pd
import json
from mpl_toolkits.mplot3d import Axes3D
from pprint import pprint
import numpy as np

def readData():
    #Read the generated JSON file and set it to the satelite variable.
    satelite = pd.read_json('./noaaSatelliteData.json');
    #Acesss the dscovr satelite coordinates
    cordsSat = satelite.dscovr_j2000_position
    cordsMoon = satelite.lunar_j2000_position
    earthCordx = 0
    earthCordy = 0
    earthCordz = 0

    arrayXSat = []
    arrayYSat = []
    arrayZSat = []

    arrayXMoon = []
    arrayYMoon = []
    arrayZMoon = []
    # Cycle through the coordinates of xyz of the object and append the data to their corosponding arrays
    for cordMoon in cordsMoon:
        arrayXMoon.append(cordMoon['x'])
        arrayYMoon.append(cordMoon['y'])
        arrayZMoon.append(cordMoon['z'])
    for cordSat in cordsSat:
        arrayXSat.append(cordSat['x'])
        arrayYSat.append(cordSat['y'])
        arrayZSat.append(cordSat['z'])
    print(arrayXMoon)
    print(arrayYMoon)
    print(arrayZMoon)
    #Define the figure
    fig = plt.figure(figsize=(4, 4))
    ax = fig.add_subplot(111, projection='3d')
    # Scatter Satelite
    satPlt = ax.plot(arrayXSat, arrayYSat, arrayZSat, color='black', label="line1")
    satScatter = ax.scatter(arrayXSat, arrayYSat, arrayZSat, color='red', label="line1")
    # Scatter Moon
    moonPlt = ax.plot(arrayXMoon, arrayYMoon, arrayZMoon, color='black')
    moonScatter = ax.scatter(arrayXMoon, arrayYMoon, arrayZMoon, color='black')
    # Scatter Earth
    earthScatter = ax.scatter(earthCordx, earthCordy, earthCordz,color='blue', s=350)
    # Add labels
    ax.legend([satScatter, moonScatter, earthScatter],['Satellite', 'Moon', 'Earth'])

    # Add labels
    ax.set_xlabel('X axis')
    ax.set_ylabel('Y axis')
    ax.set_zlabel('Z axis')

    plt.show()

readData()
