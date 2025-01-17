// Tiny english sentiment analysis
"use strict";
// globals: document, window, GHOST

var SC = window.SC || {};

SC.sentiment = (function () {
    // Tiny english sentiment analysis
    function f(aText) {
        var uni = {}, i, t = aText.split(',');
        for (i = 0; i < t.length; i++) {
            uni[t[i]] = 1;
        }
        return uni;
    }

    var self = {
            positive: 0,
            negative: 0,
            sexual: 0,
            scary: 0
        },
        test = {
            positive: f("positive,alive,ball,dream,living,volleyball,lamborghini,paris,dear,christmas,beauty,cheesecake,coffee,lemonade,meal,belong,garden,faithful,loyal,win,refreshing,balloon,sunshine,balloons,diamond,fantasy,fly,heroine,won,eat,bro,smile,smiling,comfy,gifts,lucky,perfect,pats,neat,wonderful,arigatou,charming,capable,butterfly,boyfriend,girlfriend,dude,great,star,nice,able,accept,achieved,active,adios,adorable,agree,agreed,agreeing,aha,ahahha,ahoy,aloha,alright,amazing,amigo,attractive,awesome,aww,babe,baby,beach,beautiful,best,better,big,bigger,biggest,birthday,birthdays,bless,bonjour,boyfriend,brave,brilliant,bro,buddy,bueno,bye,cake,cakes,calm,candies,candy,capable,care,careful,cares,cheer,cheers,chocolate,chocolates,clever,close,closer,comedy,comic,compliment,cookie,cookies,cool,cooler,coolest,correct,correctly,creative,crush,crushes,cuddle,cuddles,cupcake,cupcakes,cure,dance,dank,dated,dates,dating,delicious,deserve,dessert,doggy,dude,dumbo,dummy,engaged,enjoy,excel,excellent,experience,fair,famous,fancy,fantasize,fantastic,fast,faster,favor,favorite,feel,feeling,feelings,fellow,fine,flavour,flawless,flirting,flower,flowers,forgiven,fortune,free,freed,freedom,friday,fridays,friend,friendly,friends,friendship,fun,funniest,funny,future,game,games,gaming,gammer,genius,giggles,girlfriend,girlfriends,girls,glad,gold,good,goodbye,great,greetings,haaha,haha,handsome,happy,healthy,hehe,hehehe,helpful,helping,hero,highest,hilarious,hobbies,hobby,honest,honesty,honey,hooray,hope,hopefully,horny,howdy,hug,huge,hugging,hugs,humor,hump,husband,husband's,impress,intelligent,interested,interesting,interests,joke,jokes,joking,joy,kidding,kind,kindness,kiss,kissed,kisses,kissing,kittens,kitties,kitty,lady,lala,lalala,laugh,laughing,laughs,lick,licks,like,liked,likes,lilly,lips,lipstick,llalalla,lol,lollipop,love,loved,lovely,lover,loves,luck,magical,makeout,marriage,married,marry,mary,masturbate,masturbating,masturbation,mate,meditation,meme,memes,meow,miao,moan,moans,mocking,moo,nerd,nerds,nom,noob,noobs,nyan,optimistic,party,pets,pink,play,played,playing,playstation,playstation3,playstation4,please,pleased,pleasure,ponies,pony,poptarts,popular,possible,promise,propose,puppies,puppy,quiet,rainbow,respect,rich,romantic,safe,santa,sass,sassy,silly,sleep,sleeping,sleepover,sleepy,smart,smarter,snowflake,song,songs,sweet,sweethart,sweetie,sweetly,sweets,sweety,t'aime,thank,thanks,tickles,trust,valentine,valentines,vanilla,wedding,welcome,workout,wow,hi,hello,sorry,pretty,sugar"),
            negative: f("negative,bastian,doctor,fault,cheat,heartbreaker,hit,fears,pale,bites,cold,deleted,dork,enemies,failed,mock,pretending,regrettable,slaps,unfaithful,regretted,war,alcoholic,stressful,gossip,hell,jail,weird,hurt,shoots,break,broke,gtfo,tough,2spooky4me,911,abandoning,abusive,accident,accidentally,acne,admin,adopted,ads,affairs,afraid,against,aids,alarm,alarms,alcohol,allergic,allergies,alone,anger,angry,annoy,annoying,antichrist,anymore,apologise,apologising,arguing,arrest,arrogant,asshole,attack,attitude,avoid,awkward,bad,bafoon,baka,bastard,bdsm,bear,bears,beat,bipolar,bitch,bite,blame,bleeding,blood,bloody,boo,bore,bored,boredom,boring,boss,bothering,brag,brat,breaking,broke,broken,bug,bugs,bullied,bullshit,bully,bullying,burn,burns,burp,busy,buttface,butthole,canceled,cancer,cannibal,chainsmokers,cheated,cheater,cheating,chores,clash,cocain,cocaine,cocksucker,complicated,confused,confusing,cops,copycat,coward,crack,crap,crazier,crazy,creep,creeping,creepy,creepypasta,cries,cry,crybaby,crying,crys,cunt,curse,cursed,cursing,cuss,cussing,damn,damnit,dangerous,dare,dark,darkness,darn,darth,ddos,dead,deadpool,death,debatable,decepticon,decepticons,delete,deleting,demon,demons,depressed,depression,deserve,destroy,destroying,detention,devil,diabetes,dickhead,dicks,die,died,difficult,dipshit,dirty,disabled,disgust,dishonored,dislike,dislikes,divide,doubt,douche,douchebag,dragqueen,drugs,drunk,dumb,dumbass,dumbhead,dumbo,dummy,dump,dumped,dumping,dying,earthquake,eek,eew,enemy,error,evil,eww,exams,exterminate,fag,fail,failing,fainting,fake,farted,farting,farts,fat,fatty,fbi,fear,fell,feuds,fever,fight,fighting,fights,flu,fool,forgot,freak,freaking,freaky,frustrated,fuck,fucked,fucker,fucking,fucks,gambling,gangs,gasp,glitch,goblin,gone,gross,grosses,gtfo,gun,guns,hack,hacked,hacker,hacking,hang,hanging,harassed,harm,harms,hate,hated,hates,hating,haunt,haunted,haunting,headache,heck,heroin,hiccup,hiccups,hide,hiding,hitler,homo,homosexual,homosexuals,horrible,horror,hospital,hunger,hungry,hunt,hunter,hunting,hurt,hurtful,hurting,hurts,hypocrite,ignorant,ignore,illuminati,imposter,insane,insomnia,insulted,invasion,isis,jealous,jeez,jerk,kidnaped,kidnapped,kill,killed,killer,killing,lame,lazy,liar,lice,lie,lied,lies,lonely,loner,loser,lost,lsd,lying,machettes,mad,madness,marihuana,mean,meanest,meaney,meanie,mental,meth,mistake,mistakes,mocking,moron,motherfucker,murdered,nasty,naughty,nazi,nazis,nigger,nightmare,nightmares,nonsense,nothing,nowhere,obese,offend,offended,offensive,ouija,pain,paranoid,pervert,pidor,pig,pigs,pissed,politics,prank,pretend,problem,problems,procrastinate,prude,psycho,psychopath,puke,puked,punch,punched,racist,rage,rape,raped,rapist,rekt,retard,retarded,ridiculous,rude,ruined,rumor,rumors,sack,sacrifice,sad,sadako,sadness,salmonella,sandstorm,sarcastic,satan,scam,scare,scared,scares,scaring,scary,scream,screwed,sexist,shit,shithead,shivering,shoot,shot,shutup,sick,silly,slap,slut,sluts,smash,smell,smells,smoke,smokes,snake,snap,spam,spammer,spamming,spooking,spooky,spy,stabbed,stalk,stalker,stalking,steal,stfu,stink,stinks,stinky,stoned,stoners,stop,stopped,strange,stranger,stressed,strict,stuck,stupid,suck,sucker,sucking,sucks,sue,suicidal,suicide,tear,tears,terrible,terrorist,threw,throw,throwing,tired,trap,traped,trapped,tricked,triggered,troll,trolled,trolling,trolls,trouble,tsunami,tsunamis,turd,ugly,unfriendly,uninstall,uninstalled,uninstalling,unpolite,uprising,violence,voldemort,vore,wars,waste,wasting,weak,weirder,weirdo,werewolf,whip,witch,wolf,wolves,worse,worst,worthless,wrong,wtf,yelling,zombie,zombies,cruel,ill,idiot"),
            sexual: f("adorable,hot,bulge,cheeks,clit,flirt,heterosexual,moaning,undress,yandere,crave,orgasm,gentle,panties,tonight,touches,tsundere,waifu,waist,ticklish,blanket,romance,blushes,blankets,clothes,pants,shorts,trousers,affairs,hump,aids,alone,anal,asleep,ass,attractive,babe,baby,bdsm,bikini,bikinis,bisexual,bite,blowjob,blush,blushing,body,boobies,boobs,boogers,booty,bra,bras,breasts,breed,butt,butthole,cheated,cheater,cheating,chemistry,chubby,cock,cocksucker,condom,cosplay,creep,creepy,crush,crushes,cuddle,cuddles,cum,cunt,cute,dated,dates,dating,delicious,dildos,dirty,doggy,fap,fat,fatty,female,fetish,flirting,fuck,fucked,fucker,fucking,fucks,gay,gays,gender,genitals,hairy,hip,hips,homo,homosexual,homosexuals,hump,kissed,kisses,kissing,lady,lesbian,lick,licks,limbs,lips,lipstick,love,loved,makeout,masturbate,masturbating,masturbation,moan,moans,naked,naughty,nipple,nipples,nudes,penis,penises,period,piss,porn,pregnant,puberty,pussy,rape,raped,rapist,redtube,reproduce,romantic,semen,sex,sexist,sexual,sexually,sexy,slave,sleep,sleeping,sleepover,sleepy,slut,sluts,suck,sucking,sucks,swallow,tattoo,tattoos,toe,transgender,tummy,underpants,underwear,undies,urinate,vagina,vaginas,woman,women,yaoi,dick,asexual,bedroom,bed,boob,darling,grab,eyes,mouth,grab,girl,boy,bride,guy,laid,orientation,pretty,partner,relationship,straight,sugar,tits,together,touch,wife,balls,virgin"),
            scary: f("2spooky4me,911,ghost,fears,mysterious,ninja,wolves,abandoning,ghosts,accident,werewolves,accidentally,sirens,shoots,alarm,alarms,antichrist,attack,bear,bears,beat,bite,bleeding,blood,bloody,body,boo,cancer,cannibal,clown,clowns,cocain,cocaine,crazier,crazy,creep,creeping,creepy,creepypasta,curse,cursed,dangerous,dark,darkness,dead,deadpool,demon,demons,devil,diabetes,die,died,disgust,drugs,dying,earthquake,eew,enemy,erase,evil,eww,fight,fighting,fights,freak,freaking,freaky,goblin,gun,guns,hack,hacked,hacker,hacking,halloween,harm,harms,haunt,haunted,haunting,hunt,hunter,hunting,illuminati,invisible,isis,kidnaped,kidnapped,kill,killed,killer,killing,machettes,magical,monster,monsters,nightmare,nightmares,ouija,paranoid,psycho,psychopath,rape,raped,rapist,rumor,rumors,sadako,salmonella,satan,scare,scared,scares,scaring,scary,scream,secret,shoot,shot,silence,spooky,spy,strange,stranger,suicidal,suicide,tear,tears,terrorist,trap,traped,trapped,trouble,tsunami,tsunamis,vampire,vampires,voldemort,werewolf,wolf,wolves,zombie,zombies,cruel")
        };

    self.test = test;

    self.debug = function () {
        return 'p' + self.positive + ' n' + self.negative + ' sx' + self.sexual + ' sc' + self.scary;
    };

    self.yesNo = function (aText) {
        // detect yes/no answer
        if (aText.match(/\b(no|not|aren't|don't|won't|wouldn't|haven't|don't|can't|didn't|wouln't|neither|nope|never)\b/)) { // ;'
            return 'no';
        }
        if (aText.match(/\b(yes|yeah|go|right|true|sure|maybe|absolutely|mkay|ok|of course|agree|agreed|good|great|indeed|right|true|alright|fine|cool|i want to go|let's go|me too|i do|i am|i'm in)\b/)) {
            return 'yes';
        }
        return '';
    };

    self.handleNegations = function (aTokens) {
        // handle few most common negations
        var i, t = typeof aTokens === 'string' ? GHOST.normalize(aTokens) : aTokens, negation = {not: 1};
        t = t.join(' ').replace(/do not be /g, ' not ').replace(/ not a /g, ' not ').replace(/n't /g, ' not ').replace(/ (a very|very|too|a|an) /g, ' ').split(' '); // '
        //console.log('t1', t);
        for (i = 1; i < t.length; i++) {
            // positive amplifier + negative -=> a negative
            if (test.positive.hasOwnProperty(t[i - 1]) && test.negative.hasOwnProperty(t[i])) {
                t[i - 1] = 'a';
                t[i] = 'negative';
            }
            // not + positive --> a negative
            if (negation.hasOwnProperty(t[i - 1]) && test.positive.hasOwnProperty(t[i])) {
                t[i - 1] = 'a';
                t[i] = 'negative';
            }
            // not + negative --> a positive
            if (negation.hasOwnProperty(t[i - 1]) && test.negative.hasOwnProperty(t[i])) {
                t[i - 1] = 'a';
                t[i] = 'positive';
            }
        }
        return t;
    };

    self.analyze = function (aTokens) {
        // perform sentiment analysis
        aTokens = typeof aTokens === 'string' ? GHOST.normalize(aTokens) : aTokens;
        aTokens = self.handleNegations(aTokens);
        console.log('handleNegations', aTokens);
        var i, q, t, match = [], yn = self.yesNo(aTokens.join(' ')), o = {
            positive: 0,
            negative: 0,
            sexual: 0,
            scary: 0,
            yes: yn === 'yes',
            no: yn === 'no'
        };
        // current sentence
        self.matched = {};
        for (i = 0; i < aTokens.length; i++) {
            t = aTokens[i].toLowerCase();
            for (q in test) {
                if (test.hasOwnProperty(q)) {
                    if (test[q].hasOwnProperty(t)) {
                        self.matched[t] = q;
                        if (!o.hasOwnProperty(q)) {
                            o[q] = 0;
                        }
                        o[q] += 1;
                        self[q] += 1;
                        match.push(q + '=' + t);
                    }
                }
            }
        }
        console.log('sentiment match', match.join(', '));
        return o;
    };

    self.image = function (aSentiment) {
        // decide image
        if (aSentiment.scary > aSentiment.negative) {
            return 'scared';
        }
        var pn = aSentiment.positive - aSentiment.negative - aSentiment.scary / 2;
        if (pn === 0) {
            return 'neutral';
        }
        if (pn >= 1) {
            return 'happy';
        }
        if (pn <= -2) {
            return 'angry_more';
        }
        if (pn <= -1) {
            return 'angry';
        }
        return 'neutral';
    };

    self.emoji = function (aText) {
        // remove emoji from output but let them affect sentiment
        var old = aText, t;
        // positive
        t = old.replace(/\:\)|\;\)|\:p/g, ' ');
        if (t !== old) {
            self.positive++;
            old = t;
        }
        // negative
        t = old.replace(/\:\(/g, ' ');
        if (t !== old) {
            self.negative++;
            old = aText;
        }
        return t.trim();
    };

    return self;
}());

