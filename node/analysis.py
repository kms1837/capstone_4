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
knn_final.fit(df_x_scaled, df_y_converted)


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
