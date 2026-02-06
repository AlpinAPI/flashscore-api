
# Flashscore API Sports 

FlashLive Sports provides the fastest live scores, standings and detailed stats. FlashLive covers thousands of competitions in 30+ sports.

SPORTS: Soccer, Tennis, Basketball, Hockey, American football, Baseball, Handball, Rugby union, Floorball, Bandy, Futsal, Volleyball, Cricket, Darts, Snooker, Boxing, Beach volleyball, Aussie rules, Rugby league, Badminton, Water polo, Golf, Field hockey, Table tennis, Beach soccer, MMA, Netball, Pesapallo, Motorsport (MotoGP, Moto2, Moto3, Superbike, WRC, Nascar, Formula1, Formula E, DTM, Indycar), Autoracing, Motoracing, Cycling, Horse racing, Esports (CSGO, Dota, LOL), Winter sports, Ski jumping, Alpine skiing, Cross country, Biathlon, Kabaddi

Translation of players, teams and leagues (25 languages).

You can make a website like: flashscore.com, or livescore.com


⚡ [Connect Flashlive API ](https://rapidapi.com/tipsters/api/flashlive-sports)

🔗 [Docs Flashlive API ](https://flashlive.rapi.one/)


---


#### Quick start with FlashLive API?

The time zone is needed only at the point `/v1/events/list`

All return values are in `UTC +0`

<br/>

##### 1. Get a list of sports

Use endpoint `@Sports list` or `@Number of sport events`

<br/>

##### 2. Get list of events

Use endpoint `@List of events`

Pass the sport ID, and the number of days from the current date. For example 0 - today, -1 yesterday.
Get a list of tournaments and events by sport.

<br/>

##### 3. Get all the data about the event

Use points:

`Event commentary`

`Event data`

`Event report`

`Event news`

`Event statistics`

`Event highlights video`

`Event live odds`

`Event last-change`

`Event starting lineups`

`Event preview`

`Event missing players`

`Event points history`

`Event summary`

`Event odds`


Pass the event ID to retrieve the data.


---

#### FAQ

**How often is the data updated?**

There is no delay in updating the data.
Do not use `@Live events` or `@Events list` endpoints to get score updates, these endpoints are only needed to get the list of events.
Use the `@Changes to live events` endpoint for each sport to get only new data.
Also use the `@Event last-change` endpoint, which only returns keys for new data. If the key has changed, then the data in that match has also changed. For example, if the STATISTICS key has changed, it means the stats in the event have changed, so you need to call the `@Event statistics` endpoint and get the new data.

<br/>

**How do I get match times in soccer?**

For many sports you have to calculate the time of it yourself.
This is the same practice for all sports api.
For example matches in soccer are not interrupted as often as in hockey. In the results of the api there is the start time of each period.
You must subtract from the current time - the start time of the half. You will get the current time of the half.

<br/>

**I'm using the @/v1/events/list endpoint. But I get only + - 7 days list of matches. How to get the list of matches that will start 30 days from now. Or how to get the archive of matches from last year?**

You can get all matches since 1990. Endpoint: @/v1/tournaments/results

You can get all future matches. Endpoint: @/v1/tournaments/fixtures



---
#### Packages
.NET FlashLive
https://github.com/tbm0115/FlashLive

---

#### Additional links and materials

##### List of object statuses
Supported types and keys. For example, event types.


##### Flags image
You can download all images of flags. Flags are available by key, e.g. `PLAYER_FLAG_ID`
