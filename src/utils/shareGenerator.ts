// Placeholder for share string generation logic

interface ShareData {
  day: number;
  streak: number;
  performanceGrid: string[][]; // Array of rows, each row is an array of emojis (🟩, 🟨, ⬜)
  appUrl: string;
}

export const generateShareText = (data: ShareData): string => {
  const gridString = data.performanceGrid.map(row => row.join('')).join('\n');
  return `KanjiMatch Day ${data.day} 🇯🇵\n${gridString}\n\nStreak: ${data.streak} days 🔥\nPlay at: ${data.appUrl}`;
};

// Example Usage (can be removed later)
/*
const exampleData: ShareData = {
  day: 125,
  streak: 7,
  performanceGrid: [
    ['🟩', '🟩', '🟩', '🟩', '🟩'],
    ['🟨', '🟩', '🟩', '🟩', '🟩'],
    ['🟩', '🟩', '🟩', '🟩', '🟩'],
  ],
  appUrl: 'https://kanjimatch.example.com'
};

console.log(generateShareText(exampleData));
*/ 