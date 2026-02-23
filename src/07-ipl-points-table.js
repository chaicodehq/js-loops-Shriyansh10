/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  let resArray = [];
  if (!Array.isArray(matches) || matches.length == 0) return resArray;

  let resObject = matches.reduce((acc, match) => {
    if (!acc.hasOwnProperty(match.team1)) {
      acc[match.team1] = {
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!acc.hasOwnProperty(match.team2)) {
      acc[match.team2] = {
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (match.result === "tie") {
      acc[match.team1].played++;
      acc[match.team1].tied++;
      acc[match.team1].points++;
      acc[match.team2].played++;
      acc[match.team2].tied++;
      acc[match.team2].points++;
    } else if (match.result === "no_result") {
      acc[match.team1].played++;
      acc[match.team1].noResult++;
      acc[match.team1].points++;
      acc[match.team2].played++;
      acc[match.team2].noResult++;
      acc[match.team2].points++;
    } else {
      const loser = match.winner === match.team1 ? match.team2 : match.team1;
      acc[match.winner].played++;
      acc[match.winner].won++;
      acc[match.winner].points += 2;
      acc[loser].lost++;
      acc[loser].played++;
    }
    return acc;
  }, {});
  for (let item in resObject) {
    let singleTeam = resObject[item];
    singleTeam.team = item;
    resArray.push(singleTeam);
  }
  resArray.sort((a, b) => {
    if (a.points === b.points) return a.team.localeCompare(b.team);
    else return b.points - a.points;
  });
  return resArray;
}
