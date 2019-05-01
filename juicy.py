import os
from flask import Flask, render_template

app = Flask(__name__, static_folder='public', template_folder='views')

@app.route('/')
def homepage():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
