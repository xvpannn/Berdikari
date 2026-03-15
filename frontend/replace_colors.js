const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColor(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('cakep-orange')) {
                content = content.replace(/cakep-orangeDark/g, 'cakep-blue-dark');
                content = content.replace(/cakep-orange/g, 'cakep-blue');
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

replaceColor('frontend/components');
replaceColor('frontend/app');
console.log('Replaced cakep-orange with cakep-blue in all frontend files.');
