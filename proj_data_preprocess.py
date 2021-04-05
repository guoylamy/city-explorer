import numpy as np
import pandas as pd 
import urllib.request
import json


#----------museum----------------
address = './museum/tripadvisor_museum_USonly.csv'

dataframe = pd.read_csv(address)
state = []
for i in range(len(dataframe['Address'])):
    a = dataframe['Address'][i]
    b = a.split(',')
    state.append(b[-1].split(' ')[1])

df_state = pd.DataFrame({'State' : state})
dataframe_state = pd.concat([dataframe, df_state], axis=1)
print(dataframe_state[['Address', 'State']])

dataframe_state.to_csv('museum_out.csv')


#----------airport----------------
dataframe = pd.read_csv('/kaggle/input/usa-airport-dataset/Airports2.csv')
origin_city = dataframe['Origin_city']
destination_city = dataframe['Destination_city']
#print(len(origin_city))
#print(len(destination_city))
assert len(origin_city) == len(destination_city)

for i in range(10):
    origin_temp = origin_city[i].split(',')[1]
    origin_city[i] = origin_temp
    destination_temp = destination_city[i].split(',')[1]
    destination_city[i] = destination_temp

dataframe.to_csv('airport_out.csv')



#----------storm----------------
address = './storm/StormEvents_details-ftp_v1.0_d1950_c20170120.csv'
dataframe = pd.read_csv(address)

dictionary = {}
dictionary['FLORIDA']='FL'
dictionary['OKLAHOMA']='OK'
dictionary['ALABAMA']='AL'
dictionary['ILLINOIS']='IL'
dictionary['NORTH DAKOTA']='ND'
dictionary['GEORGIA']='GA'
dictionary['WEST VIRGINIA']='WV'
dictionary['WISCONSIN']='WI'
dictionary['INDIANA']='IN'
dictionary['NORTH CAROLINA']='NC'
dictionary['TEXAS']='TX'
dictionary['MISSISSIPPI']='MS'
dictionary['KENTUCKY']='KY'
dictionary['CONNECTICUT']='CT'
dictionary['SOUTH CAROLINA']='SC'
dictionary['MISSOURI']='MO'
dictionary['SOUTH DAKOTA']='SD'
dictionary['COLORADO']='CO'
dictionary['IOWA']='IA'
dictionary['NEW MEXICO']='NM'
dictionary['KANSAS']='KS'
dictionary['MARYLAND']='MD'
dictionary['LOUISIANA']='LA'
dictionary['TENNESSEE']='TN'
dictionary['NEBRASKA']='NE'
dictionary['MINNESOTA']='MN'
dictionary['OHIO']='OH'
dictionary['WYOMING']='WY'
dictionary['PENNSYLVANIA']='PA'
dictionary['ARKANSAS']='AR'

dataframe['STATE'].replace(dictionary, inplace = True)
print(dataframe['STATE'])



#----------climate----------------
address = '/kaggle/input/climate-change-earth-surface-temperature-data/GlobalLandTemperaturesByState.csv'
dataframe = pd.read_csv(address)
dataframe_US = dataframe[(dataframe['Country'] == 'United States')]

dataframe_US['State'].replace(dictionary, inplace = True)
print(dataframe_US['State'])



#----------volcanic----------------not complete
def getplace(lat, lon):
    url = "http://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    url += "location=%s,%s&radius=100&key=" % (lat, lon)
    print(url)
    v = urllib.request.urlopen(url).read()
    j = json.loads(v)
    print(j)
    print(j['results'])
    components = j['results'][0]['address_components']
    country = town = None
    for c in components:
        if "country" in c['types']:
            country = c['long_name']
        if "postal_town" in c['types']:
            town = c['long_name']
    return town, country


print(getplace(51.1, 0.1))


#---------earthquake-------------not complete
address = "./earthquake/database.csv"

earthquake = pd.read_csv(address)




#---------population-------------
address1 = '/kaggle/input/population/Unemployment.csv'
address2 = '/kaggle/input/population/PopulationEstimates.csv'
address3 = '/kaggle/input/population/PovertyEstimates.csv'
address4 = '/kaggle/input/population/Education.csv'
dataframe1 = pd.read_csv(address1)
dataframe2 = pd.read_csv(address2)
dataframe3 = pd.read_csv(address3)
dataframe4 = pd.read_csv(address4)

dataframe1.drop(dataframe1[dataframe1['Stabr']=='US'].index, inplace=True)
dataframe1.drop(dataframe1[dataframe1['Stabr']=='PR'].index, inplace=True)

dataframe2.drop(dataframe2[dataframe2['State']=='US'].index, inplace=True)
dataframe2.drop(dataframe2[dataframe2['State']=='PR'].index, inplace=True)

dataframe3.drop(dataframe3[dataframe3['Stabr']=='US'].index, inplace=True)
dataframe3.drop(dataframe3[dataframe3['Stabr']=='PR'].index, inplace=True)

dataframe4.drop(dataframe4[dataframe4['State']=='US'].index, inplace=True)
dataframe4.drop(dataframe4[dataframe4['State']=='PR'].index, inplace=True)