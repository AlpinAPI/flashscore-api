// Flashscore API Sports

const axios = require("axios");

const headers = {
  "x-rapidapi-key": "__YOUR_KEY__",
  "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
};

const baseUrl = "https://flashlive-sports.p.rapidapi.com";
const flashlive = axios.create({ baseURL: baseUrl, headers });

// LIST OF SPORTS
const listSports = async () => {
  console.log("\r\n__________________ LIST OF SPORTS __________________");
  try {
    const response = await flashlive.get("/v1/sports/list");
    const sports = response.data;
    for (const sport of sports.DATA) {
      console.log(`${sport.ID}: ${sport.NAME}`);
    }
  } catch (error) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  }
};

// LIST OF EVENTS
const listEvents = async () => {
  console.log("\r\n__________________ LIST OF EVENTS __________________");
  const params = {
    indent_days: 0,
    locale: "en_INT",
    timezone: "-4",
    sport_id: "1",
  };
  try {
    const response = await flashlive.get("/v1/events/list", { params });
    const items = response.data;
    for (const tournament of items.DATA) {
      console.log(`${tournament.TOURNAMENT_STAGE_ID}: ${tournament.NAME}`);
      for (const event of tournament.EVENTS) {
        console.log(
          `${new Date(event.START_TIME * 1000).toISOString().slice(0, 19).replace("T", " ")} | ${event.HOME_NAME} — ${event.AWAY_NAME} | ${event.HOME_SCORE_CURRENT || ""}:${event.AWAY_SCORE_CURRENT || ""} | ${event.STAGE}`,
        );
      }
    }
  } catch (error) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  }
};

// EVENT STATISTICS
const eventStatistics = async () => {
  console.log("\r\n__________________ EVENT STATISTICS __________________");
  const params = {
    locale: "en_INT",
    event_id: "6ivhWNOG",
  };
  try {
    const response = await flashlive.get("/v1/events/statistics", { params });
    const items = response.data;
    for (const stage of items.DATA) {
      console.log(stage.STAGE_NAME);
      for (const group of stage.GROUPS) {
        console.log(`   ${group.GROUP_LABEL}`);
        for (const item of group.ITEMS) {
          console.log(
            `      ${item.INCIDENT_NAME} ${item.VALUE_HOME} ${item.VALUE_AWAY}`,
          );
        }
      }
    }
  } catch (error) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  }
};

//  EVENT INCIDENTS
const eventIncidents = async () => {
  console.log("\r\n__________________ EVENT INCIDENTS __________________");
  const params = {
    locale: "en_INT",
    event_id: "6ivhWNOG",
  };
  try {
    const response = await flashlive.get("/v1/events/summary-incidents", {
      params,
    });
    const items = response.data;
    for (const stage of items.DATA) {
      console.log(stage.STAGE_NAME, stage.RESULT_HOME, stage.RESULT_AWAY);
      for (const item of stage.ITEMS) {
        console.log(
          `   ID: ${item.INCIDENT_ID}, TEAM: ${item.INCIDENT_TEAM}, TIME: ${item.INCIDENT_TIME}:`,
        );
        for (const participant of item.INCIDENT_PARTICIPANTS) {
          console.log(
            `      ${participant.INCIDENT_TYPE}, ${participant.PARTICIPANT_NAME}, ${participant.PARTICIPANT_ID}`,
          );
        }
      }
    }
  } catch (error) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  }
};

// EVENT LINEUPS
const eventLineups = async () => {
  console.log("\r\n__________________ EVENT LINEUPS __________________");
  const params = {
    locale: "en_INT",
    event_id: "6ivhWNOG",
  };
  try {
    const response = await flashlive.get("/v1/events/lineups", { params });
    const items = response.data;
    for (const group of items.DATA) {
      console.log(group.FORMATION_NAME);
      for (const formation of group.FORMATIONS) {
        console.log(
          `   ${formation.FORMATION_LINE}: ${formation.FORMATION_DISPOSTION}`,
        );
        for (const member of formation.MEMBERS) {
          console.log(
            `      ${member.ROW_ID}, ${member.PLAYER_ID}, ${member.PLAYER_FULL_NAME}, ${member.PLAYER_NUMBER}`,
          );
        }
      }
    }
  } catch (error) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  }
};

// ALL THE EVENTS OF THE SEASON
const allEventsOfTheSeason = async () => {
  console.log(
    "\r\n__________________ALL THE EVENTS OF THE SEASON __________________",
  );
  for (let page = 1; page < 100; page++) {
    const params = {
      locale: "en_INT",
      tournament_stage_id: "OEEq9Yvp",
      page: page,
    };
    try {
      const response = await flashlive.get("/v1/tournaments/results", {
        params,
      });
      if (response.status === 404) break;
      const tournaments = response.data;
      for (const tournament of tournaments.DATA) {
        console.log(tournament.NAME);
        for (const event of tournament.EVENTS) {
          console.log(
            `${new Date(event.START_TIME * 1000).toISOString().slice(0, 19).replace("T", " ")} | ${event.HOME_NAME} — ${event.AWAY_NAME} | ${event.HOME_SCORE_CURRENT || ""}:${event.AWAY_SCORE_CURRENT || ""} | ${event.STAGE}`,
          );
        }
      }
    } catch (error) {
      if (error.response.status == 404) break;
      throw new Error(`${error.response.status}: ${error.response.data}`);
    }
  }
};

const run = async () => {
  await listSports();
  await listEvents();
  await eventStatistics();
  // await eventIncidents();
  // await eventLineups();
  // await allEventsOfTheSeason();
};

run();
