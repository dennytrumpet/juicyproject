# Dennis's Juicy Project
Answering questions using the Nutritionix API.

## Running Locally

```sh
$ git clone https://github.com/dennytrumpet/juicyproject.git
$ cd juicyproject

$ pip install Flask
FLASK_APP=juicy.py flask run
```
### Problems
I couldn't get past the 50 result maximum imposed by the API. Could not get the offset or limit parameters to work at all. So the code behind the average calories and the ingredient/product index is solid, but the output is going to incorrect. 
