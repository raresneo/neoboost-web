import fs from 'fs';
import path from 'path';

const directories = ['pages', 'components'];
const rootFiles = ['constants.tsx', 'App.tsx', 'extendedPrograms.tsx'];
const publicDir = path.join('/Users/rarespantis/Desktop/Neoboost/neoboost-web-main', 'public');

function replaceExtensions(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace local paths matching .jpg, .jpeg, .png to .webp
    // Ignore paths starting with http or https
    const newContent = content.replace(/(['"`])([^'"`]+)\.(jpg|jpeg|png|JPG|PNG)\1/g, (match, quote, imagePath, ext) => {
        if (imagePath.startsWith('http')) return match;
        
        // Strip leading slash to get the path relative to 'public' folder
        // Assuming all references are like '/image.jpg' mapping to 'public/image.jpg'
        let relativePath = imagePath;
        if (relativePath.startsWith('/')) {
            relativePath = relativePath.slice(1);
        }

        const webpPathInPublic = path.join(publicDir, relativePath + '.webp');
        
        if (fs.existsSync(webpPathInPublic)) {
            return quote + imagePath + '.webp' + quote;
        } else {
            // If the webp doesn't exist, we don't replace
            return match;
        }
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceExtensions(fullPath);
        }
    });
}

const basePath = '/Users/rarespantis/Desktop/Neoboost/neoboost-web-main';
directories.forEach(dir => walkDir(path.join(basePath, dir)));
rootFiles.forEach(file => replaceExtensions(path.join(basePath, file)));
