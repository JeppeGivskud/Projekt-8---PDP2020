Server startes gennem terminal i mappen hvor server.js (PDP8 git/server/SQL/server.js) ligger. Bruger "node server.js"

**Quirks:**
* Hvis serveren startes efter man har sendt en kommando køres den kommando når serveren starter. Der er altså en eller anden cue af kommandoer.

* CreateTable crasher serveren fordi table allerede eksisterer. Der burde være error handling med det dutter tilsyneladende ikke.

* Hvis serveren stopper med at sende svar kan man refreshe med ctrl + c i terminalen. Gætter på at det stopper det nuværende job så de næste i køen kan komme igennem.

* Lige nu kører serveren på hvejsel.dk:8080. Den skal flyttes til hvejsel.dk:5000 eller så noget. Porten skal ændres i server.js og ip+port (IP variabel) skal ændres i App interface/SQLReact/app.js

* Funktionen newHabitRow(habitName) er afhængig af funktionerne getTarget(habitName) og getRoutine(habitName). newHabitRow(habitName) kalder dem selv så no worries.