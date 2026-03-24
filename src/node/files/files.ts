import fs from 'fs';
import path from 'path';

export function getFiles(dir: string, ext: string = ''): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && (!ext || entry.name.endsWith(ext)))
        .map((entry) => path.join(dir, entry.name).replace(/\\/g, '/'));
}
