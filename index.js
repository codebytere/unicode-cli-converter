const inquirer = require("inquirer");
const { spawn } = require("child_process");

const uniMap = {
  a: { smallcaps: "ᴀ", superscript: "ᵃ", block: "𝕒" },
  b: { smallcaps: "ʙ", superscript: "ᵇ", block: "𝕓" },
  c: { smallcaps: "ᴄ", superscript: "ᶜ", block: "𝕔" },
  d: { smallcaps: "ᴅ", superscript: "ᵈ", block: "𝕕" },
  e: { smallcaps: "ᴇ", superscript: "ᵉ", block: "𝕖" },
  f: { smallcaps: "ꜰ", superscript: "ᶠ", block: "𝕗" },
  g: { smallcaps: "ɢ", superscript: "ᵍ", block: "𝕘" },
  h: { smallcaps: "ʜ", superscript: "ʰ", block: "𝕙" },
  i: { smallcaps: "ɪ", superscript: "ᶦ", block: "𝕚" },
  j: { smallcaps: "ᴊ", superscript: "ʲ", block: "𝕛" },
  k: { smallcaps: "ᴋ", superscript: "ᵏ", block: "𝕜" },
  l: { smallcaps: "ʟ", superscript: "ˡ", block: "𝕝" },
  m: { smallcaps: "ᴍ", superscript: "ᵐ", block: "𝕞" },
  n: { smallcaps: "ɴ", superscript: "ⁿ", block: "𝕟" },
  o: { smallcaps: "ᴏ", superscript: "ᵒ", block: "𝕠" },
  p: { smallcaps: "ᴘ", superscript: "ᵖ", block: "𝕡" },
  q: { smallcaps: "ǫ", superscript: "ᵠ", block: "𝕢" },
  r: { smallcaps: "ʀ", superscript: "ʳ", block: "𝕣" },
  s: { smallcaps: "s", superscript: "ˢ", block: "𝕤" },
  t: { smallcaps: "ᴛ", superscript: "ᵗ", block: "𝕥" },
  u: { smallcaps: "ᴜ", superscript: "ᵘ", block: "𝕦" },
  v: { smallcaps: "ᴠ", superscript: "ᵛ", block: "𝕧" },
  w: { smallcaps: "ᴡ", superscript: "ʷ", block: "𝕨" },
  x: { smallcaps: "x", superscript: "ˣ", block: "𝕩" },
  y: { smallcaps: "ʏ", superscript: "ʸ", block: "𝕪" },
  z: { smallcaps: "ᴢ", superscript: "ᶻ", block: "𝕫" }
};

const copyToClipboard = data => {
  const proc = spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
};

const questions = [
  {
    type: "input",
    name: "textToConvert",
    message: "Input the text to convert"
  },
  {
    type: "list",
    name: "target",
    message: "Convert to what?",
    choices: ["Superscript", "Block", "Small Caps"],
    filter: val => val.toLowerCase().replace(" ", "")
  },
  {
    type: "confirm",
    name: "copy",
    message: "Copy to clipboard?"
  }
];

inquirer.prompt(questions).then(answers => {
  const converted = answers.textToConvert
    .split("")
    .map(c => {
      if (uniMap.hasOwnProperty(c)) {
        return uniMap[c][answers.target];
      } else {
        return c;
      }
    })
    .join("");

  if (answers.copy) copyToClipboard(converted);
});
