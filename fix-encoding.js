const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const initialContent = content;

  // Fix known mojibake from Windows-1251 to UTF-8
  content = content.replace(/вЂ™/g, "'");
  content = content.replace(/вЂ”/g, "—");
  content = content.replace(/вЂў/g, "•");
  content = content.replace(/ШҐЩђЩ†ЩЋЩ‘ Ш§Щ„Щ„ЩЋЩ‘Щ‡ЩЋ Щ‡ЩЏЩ€ЩЋ Ш§Щ„Ш±ЩЋЩ‘ШІЩЋЩ‘Ш§Щ‚ЩЏ Ш°ЩЏЩ€ Ш§Щ„Щ’Щ‚ЩЏЩ€ЩЋЩ‘Ш©Щђ Ш§Щ„Щ’Щ…ЩЋШЄЩђЩЉЩ†ЩЏ/g, "إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ");
  // Also catch other quotes if any
  content = content.replace(/вЂњ/g, '"');
  content = content.replace(/вЂќ/g, '"');

  if (initialContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fixFile(fullPath);
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Encoding fix completed.');
