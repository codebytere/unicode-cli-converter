#!/usr/bin/env node

const inquirer = require("inquirer");
const { spawn } = require("child_process");

const uniMap = {
  a: { block: "𝕒", smallcaps: "ᴀ", superscript: "ᵃ" },
  b: { block: "𝕓", smallcaps: "ʙ", superscript: "ᵇ" },
  c: { block: "𝕔", smallcaps: "ᴄ", superscript: "ᶜ" },
  d: { block: "𝕕", smallcaps: "ᴅ", superscript: "ᵈ" },
  e: { block: "𝕖", smallcaps: "ᴇ", superscript: "ᵉ" },
  f: { block: "𝕗", smallcaps: "ꜰ", superscript: "ᶠ" },
  g: { block: "𝕘", smallcaps: "ɢ", superscript: "ᵍ" },
  h: { block: "𝕙", smallcaps: "ʜ", superscript: "ʰ" },
  i: { block: "𝕚", smallcaps: "ɪ", superscript: "ᶦ" },
  j: { block: "𝕛", smallcaps: "ᴊ", superscript: "ʲ" },
  k: { block: "𝕜", smallcaps: "ᴋ", superscript: "ᵏ" },
  l: { block: "𝕝", smallcaps: "ʟ", superscript: "ˡ" },
  m: { block: "𝕞", smallcaps: "ᴍ", superscript: "ᵐ" },
  n: { block: "𝕟", smallcaps: "ɴ", superscript: "ⁿ" },
  o: { block: "𝕠", smallcaps: "ᴏ", superscript: "ᵒ" },
  p: { block: "𝕡", smallcaps: "ᴘ", superscript: "ᵖ" },
  q: { block: "𝕢", smallcaps: "ǫ", superscript: "ᵠ" },
  r: { block: "𝕣", smallcaps: "ʀ", superscript: "ʳ" },
  s: { block: "𝕤", smallcaps: "ꜱ", superscript: "ˢ" },
  t: { block: "𝕥", smallcaps: "ᴛ", superscript: "ᵗ" },
  u: { block: "𝕦", smallcaps: "ᴜ", superscript: "ᵘ" },
  v: { block: "𝕧", smallcaps: "ᴠ", superscript: "ᵛ" },
  w: { block: "𝕨", smallcaps: "ᴡ", superscript: "ʷ" },
  x: { block: "𝕩", smallcaps: "x", superscript: "ˣ" },
  y: { block: "𝕪", smallcaps: "ʏ", superscript: "ʸ" },
  z: { block: "𝕫", smallcaps: "ᴢ", superscript: "ᶻ" },
  A: { block: "𝔸" },
  B: { block: "𝔹" },
  C: { block: "ℂ" },
  D: { block: "𝔻" },
  E: { block: "𝔼" },
  F: { block: "𝔽" },
  G: { block: "𝔾" },
  H: { block: "ℍ" },
  I: { block: "𝕀" },
  J: { block: "𝕁" },
  K: { block: "𝕂" },
  L: { block: "𝕃" },
  M: { block: "𝕄" },
  N: { block: "ℕ" },
  O: { block: "𝕆" },
  P: { block: "ℙ" },
  Q: { block: "ℚ" },
  R: { block: "ℝ" },
  S: { block: "𝕊" },
  T: { block: "𝕋" },
  U: { block: "𝕌" },
  V: { block: "𝕍" },
  W: { block: "𝕎" },
  X: { block: "𝕏" },
  Y: { block: "𝕐" },
  Z: { block: "ℤ" },
  0: { block: "𝟘" },
  1: { block: "𝟙" },
  2: { block: "𝟚" },
  3: { block: "𝟛" },
  4: { block: "𝟜" },
  5: { block: "𝟝" },
  6: { block: "𝟞" },
  7: { block: "𝟟" },
  8: { block: "𝟠" },
  9: { block: "𝟡" },
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
      if (uniMap.hasOwnProperty(c) &&
          uniMap[c].hasOwnProperty(answers.target)) {
        return uniMap[c][answers.target];
      } else {
        return c;
      }
    })
    .join("");

  if (answers.copy) copyToClipboard(converted);
});
