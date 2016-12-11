from flask import render_template, json
from app import app
import random

with open('app/phraselist.txt') as pl:
    phrases = [x.strip() for x in pl.readlines()]

## @app.route('/')
## @app.route('/index')
## def index():
##     return render_template('index.html')
##

@app.route('/phrase')
def phrase():
    return render_template('phrase.html'
                            ,phrase = random.choice(phrases)
                            )

@app.route('/jsonphrase')
def jsonphrase():
    returnme = {"phrase":random.choice(phrases)}
    return json.dumps(returnme)

@app.route('/jsonphrases/<number>')
def jsonphrases(number):
    global phrases
    n = int(number)
    if n > 500: n = 500
    elif n < 1: n = 1
    random.shuffle(phrases)
    phraselist = phrases[:n]
    returnme = {"phrases":phraselist}
    return json.dumps(returnme)

@app.route('/sound')
def sound():
    return render_template('sound.html')

@app.route('/')
def index():
    return render_template('pentrainer.html')

@app.route('/staging')
def staging():
    return render_template('staging.html')

@app.route('/getphrases/<number>')
def getphrases(number):
    global phrases
    n = int(number)
    if n > 500: n = 500
    elif n < 1: n = 1
    random.shuffle(phrases)
    myphrases = phrases[:n]
    phraselist = [[x,len(x),(n+1)] for n,x in enumerate(myphrases)]

    return render_template('slides.html', phraselist = phraselist)

