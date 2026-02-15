// ==========================
// MAIN.JS TEMPLATE
// ==========================

// -------------------------
// 1. Game State
// -------------------------
const gameState = {
  scene: 'cave',        // Current scene ID
  stats: {               // Player stats
    hp: 10,
    presence: 1,
    honour: 0
  },
  flags: {
    exploredCave: false,
    encounteredGiants: false,
    foughtGiants: false,
    captured: false,
    foundSword: false
  }              // Story flags
};

// -------------------------
// 2. Scene Data
// -------------------------
// Each scene should have:
// - text: string
// - choices: array of {text, next, effects}
// - optional: dice: true/false
// - optional: combat: true/false
const scenes = {
cave: {
  text: "You wake up in a dark cave, your body feels light, as if you don't have anything on you. You glance down and notice all your belongings have been taken, but you cant seem to remember what belonings you even had. You start glancing your eyes around for a possible exit. You notice a faint light ahead of you.",
  choices: [
    {
      text: "look around",
      next: "obtainSword",
      effects: {exploredCave: true}
    },
    {
      text: "Move forward",
      next: "giantEncounter"
    }
  ]
},

obtainSword: {
  text: "As you look around, you notice a glint of metal in the corner of the cave. You walk over and find a rusty sword lying on the ground. You pick it up, feeling a surge of confidence as you hold it in your hand.",
  choices: [
    {
      text: "Take it",
      next: "giantEncounter",
      effects: {foundSword: true}
    },
    {
      text: "leave it",
      next: "giantEncounter"
    }
  ]
}
  // Add more scenes here
};

// -------------------------
// 3. Helper Functions
// -------------------------
// Example helpers you will implement:
// - rollDice(sides)
// - applyEffects(effects)
// - other small utilities

function applyEffects(effects) {
  if (!effects) return;

  for (const key in effects) {
    if (effects.hasOwnProperty(key)) {
      // If the key exists in stats, modify stat
      if (gameState.stats.hasOwnProperty(key)) {
        gameState.stats[key] += effects[key];
      } else {
        // Otherwise, assume it's a flag
        gameState.flags[key] = effects[key];
      }
    }
  }
}

// -------------------------
// 4. Scene Display Function
// -------------------------
// This function should:
// - Show scene text in <pre>
// - Create buttons for choices
// - Handle clicks to update gameState and move to next scene
function showScene(sceneId) {
  const scene = scenes[sceneId];
  gameState.scene = sceneId;

  // Placeholder: display scene text
  const gameDiv = document.getElementById('game');
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  gameDiv.textContent = scene.text;

  // Placeholder: display choices
  if (scene.choices) {
    scene.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        applyEffects(choice.effects);
        showScene(choice.next);
      };
      choicesDiv.appendChild(btn);
    });
  }

  // TODO: Handle dice-based scenes
  // TODO: Handle combat scenes
}

// -------------------------
// 5. Combat Handler (optional for v1)
// -------------------------
// Implement minimal combat logic here if you want a test combat scene

// -------------------------
// 6. Start Game
// -------------------------
showScene(gameState.scene);
