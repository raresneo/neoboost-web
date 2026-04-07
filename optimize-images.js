
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Helper to format bytes
const formatBytes = (bytes) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

async function optimizeImages() {
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error('Public directory not found!');
        process.exit(1);
    }

    const files = fs.readdirSync(PUBLIC_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to check...`);

    for (const file of imageFiles) {
        const filePath = path.join(PUBLIC_DIR, file);
        const stats = fs.statSync(filePath);

        // Process all images
        if (true) {
            console.log(`\nOptimizing ${file} (${formatBytes(stats.size)})...`);

            const fileNameNoExt = file.replace(/\.(jpg|jpeg|png)$/i, '');
            const weirdExtMatch = file.match(/\.(JPG|jpg|PNG|png)$/);
            // Determine if we should replace or create new. 
            // Strategy: Create .webp version.
            const newFilePath = path.join(PUBLIC_DIR, `${fileNameNoExt}.webp`);

            try {
                const image = sharp(filePath);
                const metadata = await image.metadata();

                let pipeline = image;

                // Resize if too huge
                if (metadata.width > MAX_WIDTH) {
                    console.log(`  Resizing from ${metadata.width}px to ${MAX_WIDTH}px`);
                    pipeline = pipeline.resize({ width: MAX_WIDTH });
                }

                // Convert to WebP
                await pipeline
                    .webp({ quality: QUALITY })
                    .toFile(newFilePath);

                const newStats = fs.statSync(newFilePath);
                const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);

                console.log(`  ✅ Created ${fileNameNoExt}.webp (${formatBytes(newStats.size)}) - Saved ${savings}%`);

                // Optional: Delete original if savings are good and it's not a strict requirement to keep it
                // For safety, we will keep originals for now, but the app should switch to using webp.

            } catch (error) {
                console.error(`  ❌ Failed to optimize ${file}:`, error.message);
            }
        }
    }
}

optimizeImages();
