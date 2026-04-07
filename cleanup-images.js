import fs from 'fs';
import path from 'path';

const publicDir = '/Users/rarespantis/Desktop/Neoboost/neoboost-web-main/public';
let deletedCount = 0;
let deletedSpace = 0;

fs.readdirSync(publicDir).forEach(file => {
   if (file.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
       const webpVersion = file.replace(/\.(jpg|jpeg|png|JPG|PNG)$/i, '.webp');
       if (fs.existsSync(path.join(publicDir, webpVersion))) {
           const size = fs.statSync(path.join(publicDir, file)).size;
           fs.unlinkSync(path.join(publicDir, file));
           deletedCount++;
           deletedSpace += size;
       }
   }
});

console.log(`Deleted ${deletedCount} files, saving ${(deletedSpace / (1024*1024)).toFixed(2)} MB`);
