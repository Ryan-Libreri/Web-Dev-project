const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SAVE_PATH = path.join(__dirname, 'saveData.json');

app.use(express.json()); // for parsing JSON bodies
app.use(express.static('public')); // optional, only needed if serving files

// Load save file at server start
let gameData = {
  cups: 0,
  prestige: 0,
  brewMultiplier: 1,
  grinderLevel: 0,
  baristas: 0,
};

if (fs.existsSync(SAVE_PATH)) {
  try {
    const raw = fs.readFileSync(SAVE_PATH, 'utf-8');
    gameData = JSON.parse(raw);
    console.log('✅ Game data loaded from saveData.json');
  } catch (err) {
    console.error('⚠️ Failed to load save data. Using defaults.');
  }
}

// GET saved state
app.get('/load', (req, res) => {
  res.json(gameData);
});

// POST to save game state
app.post('/save', (req, res) => {
  const data = req.body;

  // Basic validation
  if (
    typeof data.cups === 'number' &&
    typeof data.prestige === 'number' &&
    typeof data.brewMultiplier === 'number'
  ) {
    gameData = data;

    fs.writeFile(SAVE_PATH, JSON.stringify(gameData, null, 2), (err) => {
      if (err) {
        console.error('❌ Failed to save:', err);
        res.status(500).send('Failed to save game');
      } else {
        console.log('💾 Game saved!');
        res.send('Game saved');
      }
    });
  } else {
    res.status(400).send('Invalid game data');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
