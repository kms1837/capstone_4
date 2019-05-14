import sys
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series, DataFrame

df_raw = pd.read_csv('C:/Users/User/Desktop/수업자료/4학년 1학기/캡스톤디자인/data/sw_grade.csv', index_col = 'class_number')



from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

del df_raw['..1']
del df_raw['score']
del df_raw['C_test']
del df_raw['평점']

df_y = df_raw.iloc[:,5]

del df_raw['등급']

scaler = StandardScaler()
scaler.fit(df_raw)
df2_x_scaled = scaler.transform(df_raw)

pca_num = PCA(n_components=5)
pca_num_res = pca_num.fit(df2_x_scaled)

PCA_result = ['Variance', 'Variance\%','Cum\%']
pca_num_res_pc = np.transpose(np.array(pca_num_res.components_).reshape(np.shape(pca_num_res.components_)))
pca_num_res_var = np.array(np.transpose(pca_num_res.explained_variance_[:,np.newaxis]))
pca_num_res_varp = np.array(np.transpose(pca_num_res.explained_variance_ratio_[:,np.newaxis]))
pca_num_res_sum = np.cumsum(np.round(pca_num_res.explained_variance_ratio_, decimals=8)*100)
pca_num_res_varc = np.array(np.transpose(pca_num_res_sum[:,np.newaxis]))
pca_num_res_tab = DataFrame(np.concatenate((pca_num_res_pc, pca_num_res_var, pca_num_res_varp, pca_num_res_varc), axis = 0)
                            , index = np.concatenate((np.array(df_raw.columns), PCA_result))
                            , columns = ['PC1', 'PC2', 'PC3', 'PC4', 'PC5'])
#print(pca_num_res_tab)

# Calculate PSs for new data.
pca_num_res_ps = pca_num.fit_transform(df2_x_scaled)
df2_x_scaled_ps = DataFrame(data = pca_num_res_ps, index = df_raw.index
                            , columns = ['PS1', 'PS2', 'PS3', 'PS4', 'PS5'])
df2_x_final = df2_x_scaled_ps.iloc[:]
#print(df2_x_final.iloc[:])

# Set 40% of data for test sets based on random number generation
from sklearn.model_selection import train_test_split
df2_x_train, df2_x_test, df2_y_train, df2_y_test = train_test_split(df2_x_final, df_y, test_size=0.4, random_state=10)

from sklearn.linear_model import LogisticRegression
sl_lor = LogisticRegression().fit(df2_x_train, df2_y_train)

print("lr.coef_: {}\n".format(sl_lor.coef_))
print("lr.intercept_: {}".format(sl_lor.intercept_))

print("Training set score: {:.2f}".format(sl_lor.score(df2_x_train, df2_y_train)))
print("Test set score: {:.2f}".format(sl_lor.score(df2_x_test, df2_y_test)))

from sklearn.metrics import classification_report
sl_lor_target_predict = sl_lor.predict(df2_x_test)
print(classification_report(df2_y_test, sl_lor_target_predict))
