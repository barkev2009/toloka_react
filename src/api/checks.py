import re
from PIL import Image
import cv2


# Note: this file name check could be applied
# for projects with the photo made on smartphone requirement
def fname_check(x):
    allowed_prefs = "im|jp"
    year_pref = "2022"
    pref_format = x.split('.')[0].lower()
    if len(re.findall(allowed_prefs, pref_format)) == 1 and len(re.findall(year_pref, pref_format)) == 1:
        status = "accept"
    else:
        status = "reject"
    return status


def lowest_pix_size(img_path):
    image_size = list(Image.open(img_path).size)
    lowest_pix_size = sorted(image_size)[0]
    print(lowest_pix_size)
    return 'accept' if lowest_pix_size < 3000 else 'reject'


def white_pixels_area(img_path):
    im = cv2.imread(img_path)
    im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    th, im_gray_th_otsu = cv2.threshold(im_gray, 128, 192, cv2.THRESH_OTSU)
    maxval = 255
    im_bin = (im_gray > int(th)) * maxval
    white_pixels_area = len(im_bin[im_bin == 255]) / (im_bin.shape[0] * im_bin.shape[1])
    print(white_pixels_area)
    return 'accept' if white_pixels_area < 0.91 else 'reject'
