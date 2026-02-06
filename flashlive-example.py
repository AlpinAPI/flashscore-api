# Flashscore API Sports

from datetime import datetime
import requests
import json
import time

headers = {
    "x-rapidapi-key": "__YOUR_KEY__",
    "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
}

base_url = "https://flashlive-sports.p.rapidapi.com"
flashlive = requests.Session()
flashlive.headers.update(headers)


# LIST OF SPORTS
print("\r\n__________________ LIST OF SPORTS __________________")
response = flashlive.get(base_url + "/v1/sports/list", params={})
if response.status_code != 200:
    raise Exception(response.status_code, response.text)
sports = json.loads(response.text)
for sport in sports["DATA"]:
    print("%s: %s" % (sport["ID"], sport["NAME"]))
    
# EVENT STATISTICS
print("\r\n__________________ EVENT STATISTICS __________________")
params = {
    "locale": "en_INT",  # locale
    "event_id": "6ivhWNOG",
}
response = flashlive.get(base_url + "/v1/events/statistics", params=params)
if response.status_code != 200:
    raise Exception(response.status_code, response.text)
items = json.loads(response.text)
for stage in items['DATA']:
    print(stage['STAGE_NAME'])
    for group in stage['GROUPS']:
        print('   %s' % group['GROUP_LABEL'])
        for item in group['ITEMS']:
            print('      %s %s %s' % (item['INCIDENT_NAME'], item['VALUE_HOME'] , item['VALUE_AWAY']))
            
            
# EVENT LINEUPS

print("\r\n__________________ EVENT LINEUPS __________________")
params = {
    "locale": "en_INT",  # locale
    "event_id": "6ivhWNOG",  # Aston Villa - Burnley 05.10.2025 17:00
}
response = flashlive.get(base_url + "/v1/events/lineups", params=params)
if response.status_code != 200:
    raise Exception(response.status_code, response.text)
items = json.loads(response.text)
for group in items["DATA"]:
    print(group["FORMATION_NAME"])
    for formation in group["FORMATIONS"]:
        print("   %s: %s" % (formation["FORMATION_LINE"], formation["FORMATION_DISPOSTION"]))
        for member in formation["MEMBERS"]:
            print(
                "      %s, %s, %s, %s"
                % (
                    member.get("ROW_ID"),
                    member.get("PLAYER_ID"),
                    member.get("PLAYER_FULL_NAME"),
                    member.get("PLAYER_NUMBER"),
                )
            )



# ALL THE EVENTS OF THE SEASON

print("\r\n__________________ALL THE EVENTS OF THE SEASON __________________")
for page in range(1, 100):
    params = {
        "locale": "en_INT",  # locale
        "tournament_stage_id": "OEEq9Yvp", # England: Premier League;187;OEEq9Yvp - 2025
        "page": page,
    }
    response = flashlive.get(base_url + "/v1/tournaments/results", params=params)
    if response.status_code == 404:
        break
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    tournaments = json.loads(response.text)
    for tournament in tournaments["DATA"]:
        print(tournament['NAME'])
        for event in tournament["EVENTS"]:
            print(
                "   %s | %s — %s | %s:%s | %s"
                % (
                    datetime.fromtimestamp(event["START_TIME"]).strftime("%Y-%m-%d %H:%M:%S"),
                    event["HOME_NAME"],
                    event["AWAY_NAME"],
                    event.get("HOME_SCORE_CURRENT"),
                    event.get("AWAY_SCORE_CURRENT"),
                    event.get("STAGE"),
                )
            )
