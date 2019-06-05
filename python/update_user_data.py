import argparse

import numpy as np
import pandas as pd
from pandas import Series, DataFrame

import pymysql

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('integers', metavar='N', type=str, nargs='+',
                    help='an integer for the accumulator')
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')

args = parser.parse_args()
print(args.accumulate(args.integers))

# 데이터 베이스에 접속하는 함수
def get_connection() :
    conn = pymysql.connect(host='127.0.0.1', user='root',
            password='6301rkwo', db='capstone', charset='utf8')

    return conn

def user_data_load(stdeuntID) :
    # 쿼리문
    sql = '''select coding, teample, spec, grade, math, studentID
             from final_score
             where studentID = %s'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    sql = cursor.execute(sql, (stdeuntID))

    # 데이터를 가져온다.
    result = cursor.fetchall()


    # 접속해제
    conn.commit()
    conn.close()

    return result

a = user_data_load(args.integers)
print("업데이트중...")

df_raw = pd.read_csv('../node/data/sw_grade.csv', index_col = 'class_number')

df_raw['activity'] = df_raw['activity']/100

df_raw["등급"] = df_raw["grade"].apply(lambda x: 1 if x > 4.3 else 2 if x > 4.1 else 3 if x > 3.8
                                    else 4 if x > 3.5
                                    else 5 if x > 3.0 else 6)

del df_raw['..1']
del df_raw['score']
del df_raw['C_test']
del df_raw['평점']

from sklearn.preprocessing import StandardScaler
df_x = df_raw.iloc[:,0:5]
scaler = StandardScaler()
scaler.fit(df_x)
df_x_scaled = DataFrame(scaler.transform(df_x))

df_y_converted = df_raw['등급']

from sklearn.model_selection import train_test_split
df_x_train, df_x_test, df_y_train, df_y_test = train_test_split(df_x_scaled, df_y_converted, test_size=0.4, random_state=13)

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
from sklearn import metrics
k_range = range(1,len(df_x_train.iloc[:,0]))
scores = {}
scores_list = []

knn_final = KNeighborsClassifier(n_neighbors=5)
knn_final.fit(df_x_scaled, df_y_converted)

coding = a[0][0] + 2
teamwork = a[0][1]
math = a[0][4]
grade = a[0][3]
activity = a[0][2]

def update_grade(studentID ,grade, spec) :
    # 쿼리문
    sql = '''update final_score
             set final_grade = %s, spec = %s
             where studentID = %s'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (grade, spec,studentID))

    # 접속해제
    conn.commit()
    conn.close()

x_new = DataFrame({'grade':grade,
                   'activity':activity,
                   'Coding':coding,
                   'Teamwork':teamwork,
                   'Math':math
                  }, index = [0])

x_new_scaled = (x_new - df_x.mean())/df_x.std()


y_new_predict = knn_final.predict(x_new_scaled)

for i in y_new_predict:
    if i == 6 :
        update_grade(a[0][5], 'Bronze', activity)
    elif i == 1 :
        update_grade(a[0][5], 'Challenger', activity)
    elif i == 5 :
        update_grade(a[0][5], 'Silver', activity)
    elif i == 4 :
        update_grade(a[0][5], 'Gold', activity)
    elif i == 3 :
        update_grade(a[0][5], 'Platinum', activity)
    elif i == 2 :
        update_grade(a[0][5], 'Dia', activity)

print("업데이트 완료.")
