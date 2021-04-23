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

# files = listdir('./data/us_climate/')

# airports
val = []
with open('./data/Airports2.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    count = 0
    batch_size = 500
    batch_count = 0
    for row in reader:
        # ['GEG', 'EKO', 'Spokane, WA', 'Elko, NV', 
        # '111', '124', '1', '477', '1995-12-01', 
        # '401315', '42918', '47.6198997497559', '-117.533996582031', '40.8249015808105', '-115.791999816895']
        src = row[2].split(',')
        src_city = src[0].strip()
        src_state = src[-1].strip()
        dst = row[3].split(',')
        dst_city = dst[0].strip()
        dst_state = dst[-1].strip()
        row = row[:2] + [src_city, src_state, dst_city, dst_state] + row[4: 9]
        val.append(row)
        count += 1

        if count == batch_size:
            # run sql query
            query = "INSERT INTO airport (src_airport, dst_airport, src_city, src_state, dst_city, dst_state, passengers, seats, flights, distance, fly_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
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
                        # print("Finished processing file", filename, ", inserted ", len(val), "entries")
                        print("Finished batch", batch_count)
                        batch_count += 1
                        val = []
                        count = 0
            except Error as e:
                print(e)

'''
# museum
val = []
with open('./data/museum/tripadvisor_museum_USonly.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    count = 0
    batch_size = 500
    batch_count = 0
    for row in reader:
        address = row[1].split(',')
        if len(address) >= 2:
            state_zip = address.pop().strip()
            if ' ' in state_zip:
                state_zip = state_zip.split(' ')
                state = state_zip[0].strip()
                zipp = state_zip[1].strip()
                if '-' in zipp:
                    zipp = zipp.split('-')[0]
            else:
                continue
            city = address.pop().strip()
            address = ''.join(address)
        else:
            continue
        fee = row[4].strip()
        
        if fee == 'Yes':
            fee = True
        elif fee == 'No':
            fee = False
        else:
            fee = None
        discription = row[2]
        if discription == 'NA':
            discription = None
        length_visit = row[7]
        if length_visit == 'NA':
            length_visit = None
        row = [row[8]] + [address, city, state, zipp, discription, fee] + row[5:7] + [length_visit] + row[9:13] + [row[3]] + [row[13]]
        # print(len(row))
        val.append(row)

# run sql query
query = "INSERT INTO museum (museum_name, address, city, state, zip_code, description, fee, lat, lon, length_of_visit, phone, rank, rating, review_count, feature_count, things_to_do_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
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
            # print("Finished processing file", filename, ", inserted ", len(val), "entries")
except Error as e:
    print(e)
'''