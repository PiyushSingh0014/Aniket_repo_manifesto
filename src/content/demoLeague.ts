/**
 * Fictional sample data for the Coding League dashboard.
 * The league is not running. Every handle and number here is made up.
 * `history` is the rating after each contest played, oldest first.
 */

export const divisions = ["Beginner", "Intermediate", "Advanced"] as const;
export type Division = (typeof divisions)[number];

export interface LeagueEntry {
  handle: string;
  history: number[];
}

export const demoLeague: Record<Division, LeagueEntry[]> = {
  Beginner: [
    { handle: "@off_by_one", history: [1000, 1012, 1040, 1031, 1068, 1102, 1146] },
    { handle: "@null_pointer", history: [1000, 985, 1020, 1054, 1049, 1081, 1109] },
    { handle: "@tle_again", history: [1000, 1024, 1009, 1038, 1072] },
    { handle: "@wa_on_test_2", history: [1000, 968, 990, 1003, 1041, 1036] },
    { handle: "@edge_case", history: [1000, 1018, 1004, 1019] },
  ],
  Intermediate: [
    { handle: "@loop_invariant", history: [1380, 1402, 1395, 1431, 1458, 1447, 1489, 1512] },
    { handle: "@byte_bandit", history: [1350, 1371, 1404, 1398, 1422, 1466, 1479] },
    { handle: "@two_pointer", history: [1300, 1334, 1329, 1361, 1402, 1438] },
    { handle: "@heap_hopper", history: [1410, 1395, 1420, 1411, 1433, 1402] },
    { handle: "@prefix_summer", history: [1290, 1318, 1342, 1337, 1365] },
  ],
  Advanced: [
    { handle: "@stack_smith", history: [1810, 1846, 1872, 1859, 1901, 1938, 1962, 1990] },
    { handle: "@lazy_segtree", history: [1790, 1824, 1811, 1853, 1880, 1912, 1934] },
    { handle: "@binary_lift", history: [1760, 1741, 1789, 1822, 1847, 1861, 1873] },
    { handle: "@mod_inverse", history: [1700, 1742, 1768, 1791, 1784, 1822] },
    { handle: "@dfs_drifter", history: [1720, 1755, 1749, 1790, 1812, 1797] },
  ],
};

export interface LeagueRow {
  rank: number;
  handle: string;
  rating: number;
  change: number;
  contests: number;
  history: number[];
}

export function leaderboard(division: Division): LeagueRow[] {
  return demoLeague[division]
    .map((entry) => {
      const rating = entry.history[entry.history.length - 1] ?? 0;
      const previous = entry.history[entry.history.length - 2] ?? rating;
      return {
        rank: 0,
        handle: entry.handle,
        rating,
        change: rating - previous,
        contests: entry.history.length,
        history: entry.history,
      };
    })
    .sort((a, b) => b.rating - a.rating)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}
