import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series, DataFrame

df_raw = pd.read_csv('C:/Users/User/Desktop/capstone_4/node/data/sw_grade.csv', index_col = 'class_number')

df_raw["등급"] = df_raw["grade"].apply(lambda x: 1 if x > 4.3 else 2 if x > 4.1 else 3 if x > 3.8
                                    else 4 if x > 3.5
                                    else 5 if x > 3.0 else 6)

del df_raw['..1']
del df_raw['score']
del df_raw['C_test']
del df_raw['평점']

df_y_converted = df_raw['등급']

from sklearn.preprocessing import StandardScaler
df_x = df_raw.iloc[:,0:5]
scaler = StandardScaler()
scaler.fit(df_x)
df_x_scaled = DataFrame(scaler.transform(df_x))

from sklearn.model_selection import train_test_split
df_x_train, df_x_test, df_y_train, df_y_test = train_test_split(df_x_scaled, df_y_converted, test_size=0.4, random_state=13)

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
from sklearn import metrics
k_range = range(1,len(df_x_train.iloc[:,0]))
scores = {}
scores_list = []
for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(df_x_train, df_y_train)
    y_pred = knn.predict(df_x_test)
    scores[k] = metrics.accuracy_score(df_y_test, y_pred)
    scores_list.append(metrics.accuracy_score(df_y_test, y_pred))

knn_final = KNeighborsClassifier(n_neighbors=5)

df = pd.read_csv('C:/Users/User/Desktop/capstone_4/node/data/g.csv')
df = df.fillna(0)
subject = pd.read_excel('C:/Users/User/Desktop/capstone_4/node/data/first.xlsx')

math_subject = subject[subject['해당분야']=='수학']
teample_subject = subject[subject['해당분야']=='팀플']
coding_subject = subject[subject['해당분야']=='코딩개발']

del math_subject['교과목번호']
del teample_subject['교과목번호']
del coding_subject['교과목번호']

df_1 = pd.merge(df, math_subject, left_on = '교과목명', right_on = 'subject_name',  how='left')

df_1 = pd.merge(df_1,teample_subject, left_on = '교과목명', right_on = 'subject_name', how='left')

df_1 = pd.merge(df_1,coding_subject, left_on = '교과목명', right_on = 'subject_name', how='left')

del df_1['subject_name_x']
del df_1['subject_name_y']
del df_1['subject_name']

test = df_1.groupby(['class_number']).mean()

df_1 = pd.merge(df_1, test['평점'],left_on = 'class_number', right_index=True)

test = df_1.groupby(['class_number', '해당분야']).mean()
df_1 = pd.merge(df_1, test['평점_x'],left_on = 'class_number', right_on='class_number', how = 'left')

test = df_1.groupby(['class_number', '해당분야_x']).mean()
df_1 = pd.merge(df_1, test['평점_x_x'],left_on = 'class_number', right_on='class_number', how = 'left')

test = df_1.groupby(['class_number', '해당분야_y']).mean()
df_1 = pd.merge(df_1, test['평점_x_x_x'],left_on = 'class_number', right_on='class_number', how = 'left')

del df_1['Unnamed: 0']
del df_1['년도']
del df_1['학기']
del df_1['학번(입학연도)']
del df_1['소속']
del df_1['이수구분']
del df_1['평가방식']
del df_1['재수강']

df_1 = df_1.rename(columns={'평점_y':'grade'})
df_1 = df_1.rename(columns={'평점_x_y':'Coding'})
df_1 = df_1.rename(columns={'평점_x_x_y':'Math'})
df_1 = df_1.rename(columns={'평점_x_x_x_y':'Teamwork'})

del df_1['교과목번호']
del df_1['교과목명']
del df_1['교직영역']
del df_1['선택영역']
del df_1['학점']
del df_1['등급']
del df_1['평점_x_x_x_x']
del df_1['해당분야_x']
del df_1['해당분야_y']
del df_1['해당분야']

df_1 = df_1.groupby('class_number').mean()

df_1 = df_1.fillna(0)

df_1['activity'] = df_1['grade'] * 100

df_1['activity'] = df_1['activity'].astype('int')

x_new = df_1
x_new_scaled = (x_new - df_x.mean())/df_x.std()
y_new_predict = knn_final.predict(x_new_scaled)

data = {'등급' : y_new_predict}
frame = DataFrame(data, index=df_1.index)
df_1 = pd.concat([df_1, frame], axis=1)

for i in df_1.index :
    if df_1.loc[i,'등급'] == 6 :
        df_1.loc[i,'등급'] = 'Bronze'
    elif df_1.loc[i,'등급'] == 5 :
        df_1.loc[i,'등급'] = 'Silver'
    elif df_1.loc[i,'등급'] == 4 :
        df_1.loc[i,'등급'] = 'Gold'
    elif df_1.loc[i,'등급'] == 3 :
        df_1.loc[i,'등급'] = 'Platinum'
    elif df_1.loc[i,'등급'] == 2 :
        df_1.loc[i,'등급'] = 'Dia'
    elif df_1.loc[i,'등급'] == 1 :
        df_1.loc[i,'등급'] = 'Challenger'

df_1.to_csv(r"C:/Users/User/Desktop/capstone_4/node/data/등급분류완료.csv", header = True, index = True)


import numpy as np
import pandas as pd
from pandas import Series, DataFrame

df = pd.read_csv('C:/Users/User/Desktop/capstone_4/node/data/g.csv')

a = df[['class_number', '소속']]
class_number = a.drop_duplicates(['class_number'], keep='last')
depart = a.drop_duplicates(['소속'], keep='last')
depart["departID"] = depart["소속"].apply(lambda x: 1 if x == '전자정보공학대학 디지털콘텐츠학과' else 2 if x ==  '전자정보공학대학 컴퓨터공학과'
                                    else 3 if x == '전자정보공학대학 정보보호학과'
                                    else 4 if x == '소프트웨어융합대학 컴퓨터공학과'
                                    else 5 if x == "소프트웨어융합대학 정보보호학과"
                                    else 6 if x == '소프트웨어융합대학 소프트웨어학과'
                                    else 7 if x == '소프트웨어융합대학 데이터사이언스학과'
                                    else 8 if x == '소프트웨어융합대학 지능기전공학부'
                                    else 9 if x == '소프트웨어융합대학 지능기전공학부 무인이동체공학전공'
                                    else 10 if x == '소프트웨어융합대학 지능기전공학부 스마트기기공학전공'
                                    else 11 if x == '소프트웨어융합대학 창의소프트학부'
                                    else 12 if x == '소프트웨어융합대학 창의소프트학부 디자인이노베이션전공'
                                    else 13)

class_number = pd.merge(class_number, depart, left_on = '소속', right_on = '소속',  how='left')


# pip install pymysql 설치해야함
import pymysql

# 데이터 베이스에 접속하는 함수
def get_connection() :
    conn = pymysql.connect(host='127.0.0.1', user='root',
            password='6301tkrhk!@', db='capstone_test', charset='utf8')

    return conn


# 사용자 정보를 저장하는 함수
def add_user(studentID, name, password, departID, email, auth) :
    # 쿼리문
    sql = '''insert into user
             (studentID, name, password, departID, email, auth) values (%s, %s, %s, %s, %s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (studentID, name, password, departID, email, auth))

    # 접속해제
    conn.commit()
    conn.close()

# 과목 저장
def add_subject(majorname, subjectnumber, name, categoryID) :
    # 쿼리문
    sql = '''insert into user
             (subjectnumber, name, categoryID) values (%s, %s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (subjectnumber, name, categoryID))

    # 접속해제
    conn.commit()
    conn.close()

get_connection()
k=0
for i in class_number.index :
    a = class_number['departID'][k]
    a = int(a)
    add_user(k, class_number['class_number_x'][k], '1234', a, 'capstone', False )
    k= k+1


subject = pd.read_excel('C:/Users/User/Desktop/capstone_4/node/data/first.xlsx')

subject["해당분야"] = subject["해당분야"].apply(lambda x: 1 if x == '코딩개발' else 2 if x ==  '수학'
                                    else 3 if x == '팀플'
                                    else 4)

def add_subject(subjectnumber, name, categoryID) :
    # 쿼리문
    sql = '''insert into subject
             (subjectnumber, name, categoryID) values (%s, %s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (subjectnumber, name, categoryID))

    # 접속해제
    conn.commit()
    conn.close()
    
get_connection()
for i in subject.index :
    a = subject['해당분야'][i]
    a = int(a)
    add_subject(subject['교과목번호'][i], subject['subject_name'][i], a)
    
def add_score(studentID, majorid, score, grade) :
    # 쿼리문
    sql = '''insert into score
             (studentID, majorid, score, grade) values (%s, %s, %s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (studentID, majorid, score, grade))

    # 접속해제
    conn.commit()
    conn.close()

df = pd.read_csv('C:/Users/User/Desktop/capstone_4/node/data/g.csv')
get_connection()
for i in df.index :
    a = subject[subject['subject_name']==df['교과목명'][i]]
    b = a.index.values
    b = int(b[0])
    add_score(df['class_number'][i],b, float(df['평점'][i]), df['등급'][i])    

final_score = pd.read_csv('C:/Users/User/Desktop/capstone_4/node/data/등급분류완료.csv')

import datetime

def add_final(name, coding, teample, spec, grade, math, final_grade, check_date) :
    # 쿼리문
    sql = '''insert into final_score
             (name, coding, teample, spec, grade, math, final_grade, check_date) values (%s, %s, %s, %s, %s, %s, %s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (name, coding, teample, spec, grade, math, final_grade, check_date))

    # 접속해제
    conn.commit()
    conn.close()

for i in final_score.index :
    add_final(final_score['class_number'][i], float(final_score['Coding'][i]), float(final_score['Teamwork'][i]), float(final_score['activity'][i])
              , float(final_score['grade'][i]), float(final_score['Math'][i]), final_score['등급'][i], datetime.date.today())

def add_department(univID, name) :
    # 쿼리문
    sql = '''insert into department
             (univID, name) values (%s, %s)'''

    # 접속
    conn = get_connection()
    # 쿼리실행
    cursor = conn.cursor()
    cursor.execute(sql, (univID, name))

    # 접속해제
    conn.commit()
    conn.close()
k=0
for i in depart.index :
    add_department(int(depart['departID'][i]), depart['소속'][i])
    k = k+1
    
    
    
