import pandas as pd
import random
import time
import os
import shutil
import tempfile
import logging
from flask import jsonify
from flask import json
from flask import request
from flask import Flask , render_template
from flask_cors import CORS, cross_origin
import pandas as pd
pd.set_option("display.colheader_justify","left")
from os import path, getcwd
#import tensorflow as tf 
import cv2
import numpy as np
import os
import json
import DetectChars
import DetectPlates
import PossiblePlate
import plate_recognition

# module level variables ##########################################################################
SCALAR_BLACK = (0.0, 0.0, 0.0)
SCALAR_WHITE = (255.0, 255.0, 255.0)
SCALAR_YELLOW = (0.0, 255.0, 255.0)
SCALAR_GREEN = (0.0, 255.0, 0.0)
SCALAR_RED = (0.0, 0.0, 255.0)

showSteps = False

USE_SMALL_FRAME = False
VISUALIZE_DATASET = False
process_this_frame = True
#graph = tf.compat.v1.get_default_graph()
app = Flask(__name__)
app = Flask(__name__, template_folder='templates')
CORS(app,  resources={r"/*": {"origins":["http://localhost:3000"]}})
app.static_folder = 'static'
app.secret_key = 'super secret key'

temporary_directory = tempfile.mkdtemp()

@app.errorhandler(400)
def bad_request(e):
    return jsonify({"status": "not ok", "message": "this server could not understand your request"})


@app.errorhandler(404)
def not_found(e):
    return jsonify({"status": "not found", "message": "route not found"})


@app.errorhandler(500)
def notfound(e):
    return jsonify({"status": "internal error", "message": "internal error occurred in server"})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        file_path = os.path.dirname(__file__)+"/Data.json"
        with open(file_path, 'r+', encoding='utf-8') as json_file:
            Data = json.load(json_file)
            for index, item in enumerate(Data):
                if(item["username"] == request.json.get("username") and  item["password"]==request.json.get("password")):
                    print(Data[index]['active'] == True)
                    Data[index]['active'] = True
                    print(index)
                    # 👇️ place the cursor at the beginning of the file
                    json_file.seek(0)
                    json.dump(Data, json_file)
                    json_file.truncate()
                    print('JSON file updated successfully')
                    return jsonify({"status": "success", "message": "user logged in successfully","username":item["username"]})
        return jsonify({"status": "failure", "message":"invalid username or password"})
    elif request.method == 'GET':
        file_path = os.path.dirname(__file__)+"/Data.json"
        with open(file_path, 'r', encoding='utf-8') as json_file:
            Data = json.load(json_file)
            for index, item in enumerate(Data):
                if(item["username"] == request.args.get('username') and  item["active"]==True):
                    return jsonify({"status": "success", "message": "user logged in successfully"})
        return jsonify({"status": "failure", "message":"invalid username or password"})

# @app.route('/upload', methods=['GET', 'POST'])
# def upload():
#      return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    print(request.headers)
    print(request.files)
    file = request.files['image']
    filename, ext = os.path.splitext(file.filename)
    if ext not in ('.png', '.jpg', '.jpeg'):
        return 'File extension not allowed.'
    tmp = tempfile.TemporaryDirectory()
    temp_storage = path.join(tmp.name, file.filename)

    file.save(temp_storage)
    print(temp_storage)
    num = plate_recognition.main(temp_storage)
        
    data=str("\nLicense Plate Read from Image = " + num + "\n")
    return jsonify({"status": "success","result": num})
# end main

###################################################################################################
def drawRedRectangleAroundPlate(imgOriginalScene, licPlate):
    p2fRectPoints = cv2.boxPoints(licPlate.rrLocationOfPlateInScene)            # get 4 vertices of rotated rect

    cv2.line(imgOriginalScene, tuple(p2fRectPoints[0]), tuple(p2fRectPoints[1]), SCALAR_RED, 2)         # draw 4 red lines
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[1]), tuple(p2fRectPoints[2]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[2]), tuple(p2fRectPoints[3]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[3]), tuple(p2fRectPoints[0]), SCALAR_RED, 2)
# end function

###################################################################################################
def writeLicensePlateCharsOnImage(imgOriginalScene, licPlate):
    ptCenterOfTextAreaX = 0                             # this will be the center of the area the text will be written to
    ptCenterOfTextAreaY = 0

    ptLowerLeftTextOriginX = 0                          # this will be the bottom left of the area that the text will be written to
    ptLowerLeftTextOriginY = 0

    sceneHeight, sceneWidth, sceneNumChannels = imgOriginalScene.shape
    plateHeight, plateWidth, plateNumChannels = licPlate.imgPlate.shape

    intFontFace = cv2.FONT_HERSHEY_SIMPLEX                      # choose a plain jane font
    fltFontScale = float(plateHeight) / 30.0                    # base font scale on height of plate area
    intFontThickness = int(round(fltFontScale * 1.5))           # base font thickness on font scale

    textSize, baseline = cv2.getTextSize(licPlate.strChars, intFontFace, fltFontScale, intFontThickness)        # call getTextSize

            # unpack roatated rect into center point, width and height, and angle
    ( (intPlateCenterX, intPlateCenterY), (intPlateWidth, intPlateHeight), fltCorrectionAngleInDeg ) = licPlate.rrLocationOfPlateInScene

    intPlateCenterX = int(intPlateCenterX)              # make sure center is an integer
    intPlateCenterY = int(intPlateCenterY)

    ptCenterOfTextAreaX = int(intPlateCenterX)         # the horizontal location of the text area is the same as the plate

    if intPlateCenterY < (sceneHeight * 0.75):                                                  # if the license plate is in the upper 3/4 of the image
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) + int(round(plateHeight * 1.6))      # write the chars in below the plate
    else:                                                                                       # else if the license plate is in the lower 1/4 of the image
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) - int(round(plateHeight * 1.6))      # write the chars in above the plate
    # end if

    textSizeWidth, textSizeHeight = textSize                # unpack text size width and height

    ptLowerLeftTextOriginX = int(ptCenterOfTextAreaX - (textSizeWidth / 2))           # calculate the lower left origin of the text area
    ptLowerLeftTextOriginY = int(ptCenterOfTextAreaY + (textSizeHeight / 2))          # based on the text area center, width, and height

            # write the text on the image
    cv2.putText(imgOriginalScene, licPlate.strChars, (ptLowerLeftTextOriginX, ptLowerLeftTextOriginY), intFontFace, fltFontScale, SCALAR_YELLOW, intFontThickness)
        
  


# @app.route("/charts")
# def charts(): 
#              # ** Printing out the Accuracy,      
#              Accuracy=metrics.accuracy_score(y_test, y_predictions)*100
#              return render_template('charts.html', data=str(Accuracy))



if __name__ == "__main__":
    app.run()