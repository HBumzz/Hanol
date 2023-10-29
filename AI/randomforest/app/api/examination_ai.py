from models.survey_request import SurveyRequest
import joblib
import pandas as pd

class ExaiminationAI:
    async def process_examination(self, request: SurveyRequest):
        path = 'randomforest_model/random_forest_model.pkl'
        model = joblib.load(path)

        gender = request.gender
        age = request.age
        answer1 = request.answer1
        answer2 = request.answer2
        answer3 = request.answer3
        answer4 = request.answer4
        answer5 = request.answer5
        answer6 = request.answer6
        answer7 = request.answer7

        # 필요시 gender 전처리
        # if gender == "남":
        #     gender = 0
        # else:
        #     gender = 1

        # 필요시 age 전처리
        # age = int(age[:-1])

        color_hair,fake_hair,move_hair,hair_etc = 0,0,0,0

        answer4 = answer4.split(',')
        for i in range(len(answer4)):
            tmp = answer4[i]
            if tmp == '염색 모발':
                color_hair = 1
            elif tmp == '가발 사용(붙임머리 포함)':
                fake_hair = 1
            elif tmp == '모발이식/시술':
                move_hair = 1
            elif tmp == '기타':
                hair_etc = 1
            else:
                pass

        shampoo, hair_styling, scalp_scaling, hair_assence, rinse, treatment, scalp_serum = 0,0,0,0,0,0,0

        answer5 = answer5.split(',')
        for i in range(len(answer5)):
            tmp = answer5[i]
            if tmp == '샴푸':
                shampoo = 1
            elif tmp == '헤어 스타일링제':
                hair_styling = 1
            elif tmp == '두피 스케일링제':
                scalp_scaling = 1
            elif tmp == '헤어 에센스':
                hair_assence = 1
            elif tmp == '린스':
                rinse = 1
            elif tmp == '트리트먼트':
                treatment = 1
            elif tmp == '두피 세럼':
                scalp_serum = 1
            else:
                pass
        
        features = ['Age', 'Answer1', 'Answer2', 'Answer3', 'Answer6', 'Answer7', 'Gender',
       'color_hair', 'fake_hair', 'hair_assence', 'hair_etc', 'hair_styling',
       'move_hair', 'rinse', 'scalp_scaling', 'scalp_serum', 'shampoo',
       'treatment']

        new_data = pd.DataFrame({
            'Gender' : gender,
            'Age' : age,
            'Answer1' : answer1,
            'Answer2' : answer2,
            'Answer3' : answer3,
            'Answer6' : answer6,
            'Answer7' : answer7,
            'color_hair' : color_hair,
            'fake_hair' : fake_hair,
            'move_hair' : move_hair,
            'hair_etc' : hair_etc,
            'shampoo' : shampoo,
            'hair_styling' : hair_styling,
            'scalp_scaling' : scalp_scaling,
            'hair_assence' : hair_assence,
            'rinse' : rinse,
            'treatment' : treatment,
            'scalp_serum' : scalp_serum
        }, index=[0], columns=features)

        predict_result = []

        result = model.predict(new_data)
        result = result[0]
        print(result)
        result = bin(result)
        print(result)
        result = result[2:]
        if len(result) < 3:
            result.zfill(3)
        else:
            pass

        if result[0] == '0':
            pass
        else:
            predict_result.append('비듬')
        
        if result[1] == '0':
            pass
        else:
            predict_result.append('홍반')

        if result[2] == '0':
            pass
        else:
            predict_result.append('탈모')

        return predict_result