first 
open two terminals in VS code 
then 

terminal 1:
cd .\Mawaqef
if you changed anything in DB configuration:
         python .\manage.py makemigrations
         python .\manage.py migrate
then
python .\manage.py runserver



terminal 2:
cd .\Mawaqef\frontend\      
npm run dev

