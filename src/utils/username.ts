// Top 100 aesthetic and meaningful base words
const firstBase = [
  "cool", "happy", "smart", "lazy", "brave", "funny", "gentle", "kind", "calm", "clever",
  "silent", "epic", "chill", "magic", "dreamy", "fancy", "sweet", "loyal", "quick", "wild",
  "humble", "cheerful", "bold", "shiny", "fierce", "quiet", "sunny", "crazy", "jolly", "cozy",
  "true", "soft", "neat", "vivid", "honest", "rare", "free", "vibrant", "mellow", "sparkly",
  "golden", "silver", "glossy", "warm", "cold", "playful", "sleepy", "quirky", "simple", "zesty",
  "fresh", "bright", "wise", "feisty", "blissful", "eager", "noble", "glowing", "melodic", "elegant",
  "artsy", "spunky", "zany", "jazzy", "snappy", "bubbly", "radiant", "snugly", "dandy", "snazzy",
  "nimble", "mighty", "lucky", "crafty", "peachy", "silly", "zappy", "hearty", "breezy", "trendy",
  "classy", "vintage", "rosy", "swift", "tidy", "perky", "nifty", "gritty", "zippy", "witty"
];

const secondBase = [
  "dream", "sky", "sun", "moon", "star", "cloud", "storm", "rain", "snow", "river",
  "lake", "ocean", "mountain", "valley", "forest", "meadow", "desert", "island", "garden", "fire",
  "light", "spark", "glow", "shadow", "flame", "mist", "breeze", "wave", "stone", "crystal",
  "gem", "pearl", "feather", "leaf", "petal", "vine", "root", "tree", "branch", "path",
  "trail", "road", "bridge", "castle", "cave", "nest", "echo", "beat", "melody", "voice",
  "tune", "sound", "whisper", "pulse", "ray", "beam", "spirit", "soul", "vibe", "zone",
  "portal", "code", "data", "byte", "glitch", "matrix", "link", "dust", "flare", "flux",
  "orbit", "comet", "planet", "system", "core", "ring", "mirror", "field", "dreams", "depth",
  "spectrum", "motion", "vision", "channel", "energy", "pulse", "loop", "signal", "dash", "flame"
];

const thirdBase = [
  "friend", "buddy", "ninja", "pirate", "ghost", "wizard", "explorer", "rider", "cat", "dog",
  "panda", "tiger", "lion", "dragon", "phoenix", "unicorn", "bear", "fox", "wolf", "eagle",
  "owl", "dolphin", "shark", "bee", "robot", "alien", "genius", "champ", "guru", "master",
  "seeker", "dreamer", "wanderer", "builder", "maker", "artist", "runner", "climber", "flyer", "surfer",
  "jester", "knight", "queen", "king", "prince", "princess", "guardian", "pilot", "hero", "scholar",
  "creator", "thinker", "inventor", "mentor", "teacher", "student", "leader", "dancer", "singer", "coder",
  "gamer", "healer", "protector", "empress", "captain", "paladin", "beast", "whiz", "monkey", "penguin",
  "crab", "yak", "sloth", "camel", "sphinx", "troll", "giant", "elf", "pixie", "sprite",
  "oracle", "nomad", "viking", "biker", "joker", "beacon", "knower", "defender", "pilot", "catcher"
];

// 100 fun and tech-themed suffixes
const suffixes = [
  "", "_x", "_pro", "_gen", "_bot", "_max", "_plus", "_core", "_dev", "_go",
  "_hq", "_net", "_ai", "_rx", "_cyber", "_neo", "_ultra", "_prime", "_nova", "_xp",
  "_fusion", "_sync", "_cloud", "_zone", "_wave", "_byte", "_loop", "_beam", "_dash", "_drive",
  "_grid", "_next", "_spark", "_tide", "_crew", "_lab", "_node", "_realm", "_kit", "_jam",
  "_link", "_fire", "_path", "_glow", "_flash", "_pulse", "_storm", "_track", "_os", "_mode",
  "_craft", "_luxe", "_blend", "_fog", "_scope", "_gear", "_touch", "_cube", "_storm", "_hype",
  "_hub", "_corex", "_vault", "_boost", "_unit", "_matrix", "_mint", "_warp", "_syncx", "_zen",
  "_echo", "_bit", "_cast", "_drop", "_top", "_low", "_mid", "_stream", "_flow", "_form",
  "_code", "_drivex", "_tone", "_stack", "_netx", "_deck", "_crush", "_ping", "_click", "_drift",
  "_snap", "_load", "_log", "_dock", "_peek", "_base", "_mark", "_tag", "_blaze", "_fuel"
];

// Generator function
export const generateRandomUsername = (): string => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(firstBase)}_${pick(secondBase)}_${pick(thirdBase)}${pick(suffixes)}`;
};
