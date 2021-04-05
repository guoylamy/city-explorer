'''
Load data from source file into mysql database
'''

import csv
import json
from os import listdir
from mysql.connector import connect, Error

# load db credentials from json
with open('./dbconfig.json') as jsonfile:
    data = json.load(jsonfile)
    host = data['host']
    user = data['user']
    password = data['password']
    database = data['database']

# load csv file
# filename = './data/us_climate/city_info.csv'

files = listdir('./data/us_climate/')

val = []
for filename in files:
    if filename[0] is not 'U' or not filename.endswith('.csv'):
        continue
    name = filename.split('.')[0]
    with open('./data/us_climate/' + filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            row[0] = name
            if row[2] == 'NA':
                row[2] = None
            if row[3] == 'NA':
                row[3] = None
            if row[4] == 'NA':
                row[4] = None
            val.append(tuple(row))

    # run sql query
    query = "INSERT INTO climate_data (file_name, date_record, tmax, tmin, prcp) VALUES (%s, %s, %s, %s, %s)"
    try:
        with connect(
            host=host,
            user=user,
            passwd=password,
            db=database
        ) as connection:
            with connection.cursor() as cursor:
                # query = "SELECT * FROM climate_city_info"
                # cursor.execute(query)
                cursor.executemany(query, val)
                # result = cursor.fetchall()
                # for row in result:
                #     print(row)
                connection.commit()
                print("Finished processing file", filename, ", inserted ", len(val), "entries")
    except Error as e:
        print(e)
    val = []
