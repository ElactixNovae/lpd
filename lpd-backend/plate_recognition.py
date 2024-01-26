#!/usr/bin/env python
from __future__ import absolute_import, division, print_function

import json
import time
from collections import OrderedDict
from glob import glob
import cv2
import requests


def main(temp_storage):
    #regions = 'fr'
    result = []
    path='vehcle.jpg'
    with open(temp_storage, 'rb') as fp:
        response = requests.post(
                        'https://api.platerecognizer.com/v1/plate-reader/',
                        files=dict(upload=fp),
                        data=dict(regions='fr'),
                        headers={'Authorization': 'Token ' + '46569c6bbf83ec3257068d20a74113e420598687'})
                
    result.append(response.json(object_pairs_hook=OrderedDict))
    time.sleep(1)
    im=cv2.imread(path)
          
    resp_dict = json.loads(json.dumps(result, indent=2))
    num=resp_dict[0]['results'][0]['plate']
    boxs=resp_dict[0]['results'][0]['box']
    xmins,ymins,ymaxs,xmaxs=boxs['xmin'],boxs['ymin'],boxs['ymax'],boxs['xmax']
   
    img = cv2.imread(path,cv2.IMREAD_GRAYSCALE)
    edges = cv2.Canny(img,100,200)
    cv2.rectangle(im, (xmins, ymins), (xmaxs, ymaxs), (255,0,0), 2)
    cv2.rectangle(edges, (xmins, ymins), (xmaxs, ymaxs), (255,0,0), 2)
    print(f"the car number is {num}")
    return num

    
if __name__ == '__main__':
    main()
