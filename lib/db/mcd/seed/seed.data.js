import bcrypt from "bcryptjs";

// USERS
export const stubUsers = [
  {
    name: "admin",
    email: "admin@mediacollege.dk",
    picture: "/users/no-user.jpg",
    role: "admin",
    hashedPassword: await bcrypt.hash("admin", 10),
  },
  {
    name: "member",
    email: "member@mediacollege.dk",
    picture: "/users/no-user.jpg",
    subscription: "STANDARD GYM",
    enrolledWorkouts: ["YOGA", "CROSSFIT"],
    role: "member",
    hashedPassword: await bcrypt.hash("member", 10),
  },
  {
    name: "guest",
    email: "guest@mediacollege.dk",
    picture: "/users/no-user.jpg",
    role: "guest",
    hashedPassword: await bcrypt.hash("guest", 10),
  },
];

// BENEFITS
export const stubBenefits = [
  {
    image: "/benefits/benefit_1.png",
    title: "TEKNIK",
    content:
      "God teknik er afgørende for at få mest muligt ud af dine øvelser — og for at undgå skader. Brug tid på at lære korrekt udførelse, så du kan træne sikkert og opnå bedre resultater.",
  },
  {
    image: "/benefits/benefit_2.png",
    title: "VITAMINER GIVER ENERGI",
    content:
      "Vitaminer er vigtige for kroppens energi og restitution. Med den rette balance styrker de dit immunforsvar, fremmer muskelopbygning og hjælper dig med at yde dit bedste – både under og efter træning.",
  },
  {
    image: "/benefits/benefit_3.png",
    title: "STYRK DIN CORE",
    content:
      "Drømmer du om en stærk og tonet mave? Der findes mange effektive øvelser, der træner både de lige og skrå mavemuskler — og du kan lave dem næsten hvor som helst!",
  },
  {
    image: "/benefits/benefit_4.png",
    title: "VÆGTLØFTNING",
    content:
      "Vil du opbygge styrke og muskler? Vægtløftning er en effektiv træningsform, der udvikler hele kroppen — uanset om du er nybegynder eller erfaren.",
  },
];

// SERVICES
export const stubServices = [
  {
    title: "PERSONLIG TRÆNER",
    teaser:
      "En personlig træner hjælper dig med at træne smartere — ikke bare hårdere!",
    content:
      "En personlig træner hjælper dig med at træne smartere — ikke bare hårdere! Med professionel vejledning får du et skræddersyet program, der passer til dine mål, din krop og dit niveau. Din træner sørger for, at teknikken er korrekt, så du undgår skader, og motiverer dig til at yde dit bedste hver gang. Resultatet er mere effektiv træning, hurtigere fremskridt og større selvtillid på gulvet.",
    icon: "/services/service_icons/service_1.png",
    image: "/services/service_1.jpg",
  },
  {
    title: "YOGA TIME",
    teaser:
      "Yoga hos Xtreme Fitness er for alle, der trænger til både stræk og indre ro.",
    content:
      "Yoga hos Xtreme Fitness er for alle, der trænger til både stræk og indre ro. Gennem rolige bevægelser, vejrtrækning og fokus på kroppen får du styrket smidighed, balance og mentalt overskud. Uanset om du er nybegynder eller øvet, tilpasses øvelserne dit niveau, så du kan finde din egen rytme og ro. Yoga er et perfekt supplement til styrketræning og en effektiv måde at skabe harmoni mellem krop og sind.",
    icon: "/services/service_icons/service_2.png",
    image: "/services/service_2.jpg",
  },
  {
    title: "BOKSNING",
    teaser: "Har du haft en lang dag? Kom og slå lidt på noget — helt lovligt!",
    content:
      "Har du haft en lang dag? Kom og slå lidt på noget — helt lovligt! Boksetræning er en intens og effektiv måde at få pulsen op, forbrænde kalorier og styrke hele kroppen. Du lærer slagteknikker, fodarbejde og koordination, samtidig med at du får afløb for stress og spændinger. Træningen tilpasses dit niveau, så både begyndere og øvede kan være med. Boksetimerne giver dig sved på panden, styrke i kroppen og et klart hoved, når du går hjem.",
    icon: "/services/service_icons/service_3.png",
    image: "/services/service_3.jpg",
  },
  {
    title: "ONLINE COACHING",
    teaser:
      "Med online coaching kan du få skældud og high-fives direkte hjemme i stuen!",
    content:
      "Med online coaching kan du få skældud og high-fives direkte hjemme i stuen! Du får personlig sparring, træningsplaner og kostvejledning leveret digitalt, så du kan træne når og hvor det passer dig. Din coach følger dine fremskridt, justerer din plan og giver dig både motivation og feedback undervejs. Det er den fleksible løsning til dig, der vil have professionel støtte — uden at skulle møde fysisk op i centret.",
    icon: "/services/service_icons/service_4.png",
    image: "/services/service_4.jpg",
  },
];

// REVIEWS
export const stubReviews = [
  {
    author: "Cecilie Caspersen",
    content:
      "Det bedste ved centeret er stemningen – man føler sig altid velkommen, uanset niveau. Trænerne er dygtige og imødekommende, og det gør en kæmpe forskel for motivationen.",
    position: "Medlem",
  },
  {
    author: "Jonas Christensen",
    content:
      "Det føles som at være en del af et hold, hvor alle hepper på hinanden. Der er altid en positiv energi i centret, og det giver lyst til at komme igen og igen.",
    position: "Medlem",
  },
  {
    author: "Mette Laursen",
    content:
      "Jeg kan mærke en kæmpe forskel på både energi og styrke, siden jeg begyndte her. Kombinationen af god vejledning og hyggelig stemning gør det nemt at holde motivationen oppe.",
    position: "Medlem",
  },
];

// SUBSCRIPTIONS
export const stubSubscriptions = [
  {
    image: "/subscriptions/pricing_tables_1.png",
    title: "BASIC GYM",
    list: [
      "Fri adgang til alle træningsområder",
      "Træn når det passer dig",
      "Adgang til basis holdtræning",
      "Gratis introduktionstime",
      "Motiverende atmosfære",
    ],
    price: 149,
  },
  {
    image: "/subscriptions/pricing_tables_2.png",
    title: "STANDARD GYM",
    list: [
      "Alt fra basis — plus lidt ekstra",
      "Flere hold på skemaet",
      "Fri adgang afslapningsområde",
      "Personlig træningsplan",
      "Rabatter på events og workshops",
    ],
    price: 199,
  },
  {
    image: "/subscriptions/pricing_tables_3.png",
    title: "PREMIUM GYM",
    list: [
      "Alt fra basis og standard",
      "Ubegrænset adgang til specialhold",
      "Personlig træner hver måned",
      "Eksklusiv adgang til wellness-området",
      "VIP-fordele og goodies",
    ],
    price: 249,
  },
];

// MESSAGES
export const stubMessages = [
  {
    name: "Mette Sørensen",
    email: "mette.sorensen@gmail.com",
    phone: 28763455,
    subject: "Spørgsmål om holdtræning",
    message:
      "Hej, jeg vil gerne høre mere om jeres yoga-hold og hvilke tider de ligger.",
  },
  {
    name: "Jonas Kristensen",
    email: "jonas.kristensen@yahoo.com",
    phone: 22331144,
    subject: "Personlig træner",
    message:
      "Jeg er interesseret i et forløb med en personlig træner. Kan I sende mig info og priser?",
  },
  {
    name: "Camilla Holm",
    email: "camilla.holm@hotmail.com",
    phone: 45678912,
    subject: "Medlemskab",
    message:
      "Hej, jeg overvejer et medlemskab og vil gerne vide, om I har studenterrabat.",
  },
];

// EMPLOYEES
export const stubEmployees = [
  {
    image: "/employees/team_member_1.png",
    name: "MIKKEL JENSEN",
    area: "Crossfit",
  },

  {
    image: "/employees/team_member_2.png",
    name: "SOFIE MADSEN",
    area: "Kardio & Kondition",
  },
  {
    image: "/employees/team_member_3.png",
    name: "RASMUS KRISTENSEN",
    area: "Fitness",
  },
  {
    image: "/employees/team_member_4.png",
    name: "JONAS SØRENSEN",
    area: "Yoga",
  },
  {
    image: "/employees/team_member_5.png",
    name: "ANDERS HANSEN",
    area: "Boksning",
  },
  {
    image: "/employees/team_member_6.png",
    name: "CAMILLA PEDERSEN",
    area: "Kardio & Kondition",
  },
];

// BLOGS
export const stubBlogs = [
  {
    image: "/blogs/blog_1.png",
    title: "FØRSTE DAG I CENTERET",
    teaser:
      "Fra nervøs nybegynder til svedig og smilende — sådan var min allerførste dag i Xtreme Fitness.",
    content:
      "Jeg indrømmer det: jeg var ret nervøs, da jeg trådte ind i Xtreme Fitness for allerførste gang. Ville jeg kunne finde ud af maskinerne? Ville alle glo på mig? Heldigvis blev jeg taget imod af en venlig træner, som viste mig rundt og hjalp mig med at lægge en plan, jeg kunne overskue. Jeg startede stille og roligt på løbebåndet, og inden jeg vidste af det, stod jeg midt i mit første holdtræningspas — halvdød, men grinende. Stemningen var overraskende afslappet. Folk var fokuserede på deres egen træning, men man fik hurtigt et nik eller et opmuntrende grin, når man kæmpede med vægtene. Efter en times sved og høj musik gik jeg ud ad døren med en følelse af at have gjort noget godt for mig selv — og for første gang i lang tid glædede jeg mig faktisk til at komme igen dagen efter. Hvis du overvejer at starte, kan jeg kun sige: gør det! Det sværeste er at tage det første skridt ind ad døren — resten klarer Xtreme Fitness for dig.",
    author: "Jonas Kristensen",
  },

  {
    image: "/blogs/blog_2.png",
    title: "FRA SOFASURFER TIL BÆNKPRESSER",
    teaser:
      "Hvordan et spontant medlemskab i Xtreme Fitness vendte min hverdag på hovedet — på den allerbedste måde!",
    content:
      "Jeg har altid været typen, der sagde “jeg starter på mandag” — og det gjorde jeg så aldrig. Sofaen var min bedste ven, og fjernbetjeningen min træningsmakker. Men en dag, midt i en ekstra lang Netflix-session, besluttede jeg mig for at ændre noget. Jeg meldte mig spontant ind i Xtreme Fitness — og ja, jeg var ved at fortryde det allerede, da jeg stod i døren første gang. Men det skulle vise sig at være det bedste impuls-køb nogensinde. Jeg blev mødt af smil, fed musik og en træner, der fik mig til at føle mig som en del af holdet, selvom jeg ikke anede, hvordan man justerede en bænkpres. De første uger var hårde — mine arme føltes som spaghetti, og jeg opdagede hurtigt, at trapper er djævelens værk, når man har trænet ben dagen før. Men der skete noget. Jeg begyndte at glæde mig til at træne. Folk hilste, vi grinede midt i sved og tunge vægte, og jeg mærkede for første gang, hvordan det føles at blive stærkere for hver uge. Nu er bænkpres ikke bare noget, jeg ser andre lave — det er noget, jeg gør selv. Sofaen findes stadig, men nu er den belønningen efter en god træning, ikke undskyldningen for at springe over. Hvis jeg kan rykke mig fra sofasurfer til bænkpresser, så kan du også. Tak Xtreme Fitness — I har for alvor vendt min hverdag på hovedet (og min biceps er ikke utilfreds!).",
    author: "Mette Sørensen",
  },
  {
    image: "/blogs/blog_3.png",
    title: "BOKSNING VED ET TILFÆLDE",
    teaser:
      "Nogle gange skal man bare sige ja til det uventede — også selvom man ikke aner, hvad man har sagt ja til!",
    content:
      "Jeg havde aldrig forestillet mig, at jeg skulle ende i en boksetime. Faktisk troede jeg, at boksehandsker kun var noget, man så i gamle Rocky-film — og jeg var i hvert fald ikke typen, der havde lyst til at få blå mærker i ansigtet. Men en aften, da mit hold blev aflyst, stod jeg i centret og så et skilt: “Prøv boksning – i dag kl. 18.” Jeg tænkte, hvorfor ikke? Jeg havde jo allerede træningstøjet på, og sofaen derhjemme kunne godt vente. Jeg fik stukket et par handsker i hånden, og inden jeg vidste af det, stod jeg og slog på en sandsæk med sveden løbende ned ad panden. Instruktøren var energisk og fik selv mine usikre jabs til at føles som verdens stærkeste slag. Stemningen i lokalet var intens, men på den fede måde — alle heppede på hinanden, og det føltes pludselig som et hold, jeg havde savnet uden at vide det. De første gange var kaos. Jeg rodede rundt med fodarbejdet, slog for langsomt og ramte næsten altid forbi puden. Mine skuldre brændte, og jeg havde ondt i hele kroppen dagen efter. Men jeg grinede undervejs — og det var nyt for mig at have det sjovt, mens jeg pressede mig selv. Efterhånden begyndte jeg at få styr på teknikken. Kombinationerne sad lidt bedre, og jeg kunne mærke, hvordan både kondition og styrke voksede. Samtidig fik jeg et afløb for hverdagens stress — det er utroligt befriende at slå på noget, der ikke slår igen. Nu er boksning ikke længere et tilfælde, men en af mine yndlingstimer. Jeg havde aldrig troet, at jeg ville finde glæden ved træning i et par handsker og en sandsæk — men sådan er det nogle gange: De bedste ting sker, når man mindst venter det.",
    author: "Camilla Holm",
  },
];

// EXERCISES
export const stubExercises = [
  {
    image: "/exercises/provide_1.png",
    title: "BRYSTTRÆNING",
    teaser:
      "Vil du have et stærkt og markeret bryst, der både giver power og selvtillid? Så handler det om at mestre de klassiske brystøvelser.",
    content:
      "Brystet er en central muskelgruppe, der ikke kun giver et flot look, men også spiller en vigtig rolle i mange funktionelle bevægelser. Den mest kendte øvelse er bænkpres, som er uundgåelig, hvis du vil bygge styrke og masse i brystet. Variér gerne med skrå bænkpres for at ramme den øvre del af brystet og skabe fylde. Håndvægtspres er et godt alternativ, hvor du arbejder mere stabiliserende og får en større bevægelsesfrihed. Flyes med håndvægte eller i kabelmaskine strækker musklen ud og giver en intens kontraktion i brystet. Push-ups er en klassiker, der altid virker – og de kan justeres i sværhedsgrad, så alle kan være med. Husk at brysttræning ikke kun handler om at presse tungt. Korrekt teknik, fuldt bevægeudslag og kontrol gennem hele løftet giver langt bedre resultater end at skubbe for hurtigt med for meget vægt. Kombinér brystøvelserne med træning af ryg og skuldre for at skabe balance i overkroppen og undgå skader. Med den rette blanding af pres, stræk og kontrol kan du bygge et bryst, der både er stærkt, funktionelt og æstetisk.",
  },
  {
    image: "/exercises/provide_2.png",
    title: "STYRKEØGNING",
    teaser:
      "Vil du bygge rå styrke, der kan mærkes i hverdagen og ses i spejlet? Så er det tid til at fokusere på de mest effektive styrkeøvelser.",
    content:
      "Når målet er at blive stærkere, er det vigtigt at vælge øvelser, der udfordrer flere store muskelgrupper på én gang. Disse kaldes basisøvelser — og de er grundstenen i enhver solid styrketræning. Squat er kongen af underkropstræning og bygger stærke lår, baller og core. Dødløft styrker ryggen, baglår og lænd, og lærer dig at løfte tungt på en sikker måde. Bænkpres er en klassiker, der udvikler bryst, skuldre og arme, mens skulderpres giver dig solide skuldre og en stærk overkrop. Træn med en vægt, der udfordrer dig, men som du kan løfte med god teknik. Hold fokus på langsomme, kontrollerede bevægelser — det giver mere effekt og mindre risiko for skader. Suppler gerne med assisterende øvelser som pull-ups, rows eller lunges for at styrke svage led og skabe balance i kroppen. Husk, at styrke ikke kommer natten over. Vær tålmodig, følg et program og øg vægtene gradvist — det er sådan, du bygger power, der holder. Så snør skoene, tag fat i vægten og giv kroppen noget at arbejde med. Din stærkere version af dig selv venter!",
  },
  {
    image: "/exercises/provide_3.png",
    title: "SKULDERØVELSER",
    teaser:
      "Drømmer du om stærke, markerede skuldre, der ser godt ud fra alle vinkler? Her er øvelserne, du skal kende!",
    content:
      "Skuldrene er en vigtig muskelgruppe, både for et flot udseende og en stærk overkrop, der kan klare tung træning uden skader. For at få stærke og sunde skuldre skal du træne dem fra flere vinkler. En af de bedste øvelser er skulderpres — stående eller siddende — hvor du presser vægte over hovedet. Det bygger masser af styrke og stabilitet. Side laterals (sidehævninger) giver bredde og form på skulderens side, mens front raises fokuserer på forsiden. Vil du have endnu mere power, kan du tilføje face pulls eller reverse flyes, som styrker bagsiden af skulderen og balancerer musklerne. Brug moderate vægte og god teknik — skuldrene er sarte, så det handler om kontrol frem for at svinge vægtene rundt. Sørg også for at varme godt op, gerne med let elastiktræning, inden du går i gang med de tungere løft. Indbyg disse øvelser 1-2 gange om ugen, og du vil hurtigt mærke, hvordan din styrke, holdning og udstråling forbedres. Stærke skuldre er ikke kun flotte — de giver dig også power til alt fra bænkpres til bæring af indkøbsposer!",
  },
  {
    image: "/exercises/provide_4.png",
    title: "VÆGTTAB",
    teaser:
      "Vil du smide de overflødige kilo på en sund og holdbar måde? Her får du de bedste råd til at sætte gang i dit vægttab!",
    content:
      "Vægttab handler ikke kun om at spise mindre — det handler om at finde en balance, du kan holde fast i på lang sigt. Træning spiller en stor rolle, fordi det booster forbrændingen, styrker musklerne og holder humøret højt. Kombinér konditionstræning som løb, cykling eller sjippe med styrketræning. Muskler forbrænder flere kalorier, selv når du slapper af, så jo stærkere du bliver, jo lettere bliver det at holde vægten nede. Hold øje med din kost, men uden at gå i ekstreme diæter. Spis masser af protein, grøntsager og fuldkorn — og husk, at der stadig skal være plads til lidt hygge indimellem. Drik rigeligt med vand og sov nok — manglende søvn kan faktisk gøre det sværere at tabe sig. Vær tålmodig! Vægttab sker ikke på en uge, men med små, sunde ændringer vil du snart mærke forskellen på både vægten, energien og spejlbilledet. Hos Xtreme Fitness er vi klar til at heppe på dig hele vejen — uanset om du vil tabe 5 kilo eller 25. Tag første skridt i dag — din sundere fremtid starter lige her!",
  },
];

// WORKOUTS
export const stubWorkouts = [
  {
    title: "KARDIO",
    weekday: "Mandag",
    time: "08:00",
  },
  {
    title: "KARDIO",
    weekday: "Onsdag",
    time: "08:00",
  },
  {
    title: "KARDIO",
    weekday: "Fredag",
    time: "08:00",
  },
  {
    title: "KARDIO",
    weekday: "Søndag",
    time: "11:00",
  },
  {
    title: "YOGA",
    weekday: "Tirsdag",
    time: "10:00",
  },
  {
    title: "YOGA",
    weekday: "Lørdag",
    time: "09:00",
  },
  {
    title: "BOKSNING",
    weekday: "Tirsdag",
    time: "19:00",
  },
  {
    title: "BOKSNING",
    weekday: "Fredag",
    time: "19:00",
  },
  {
    title: "CROSSFIT",
    weekday: "Lørdag",
    time: "17:00",
  },
  {
    title: "CROSSFIT",
    weekday: "Mandag",
    time: "17:00",
  },
  {
    title: "GYM",
    weekday: "Mandag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Tirsdag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Onsdag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Torsdag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Fredag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Lørdag",
    time: "06:00-23:00",
  },
  {
    title: "GYM",
    weekday: "Søndag",
    time: "06:00-23:00",
  },
];

// SUBSCRIBERS
export const stubSubscribers = [
  {
    email: "gowalasubscriber@mail.com",
  },
];
