"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
/**
 * CONFIG
 */
const sourcePath = process.argv[2] || '../fonts';
const outputFile = process.argv[3] || '../vfs_fonts.ts';
const allowedExt = /\.(ttf|otf|woff2?|png|jpg|jpeg|svg)$/i;
/**
 * VALIDATION
 */
if (!fs_1.default.existsSync(sourcePath)) {
    console.error(`❌ Source path "${sourcePath}" not found`);
    process.exit(1);
}
/**
 * RECURSIVE FILE WALK
 */
function walk(dir) {
    let results = [];
    for (const file of fs_1.default.readdirSync(dir)) {
        const full = path_1.default.join(dir, file);
        const stat = fs_1.default.statSync(full);
        if (stat.isDirectory()) {
            results = results.concat(walk(full));
        }
        else {
            if (allowedExt.test(full)) {
                results.push(full);
            }
        }
    }
    return results;
}
/**
 * HASH (for caching)
 */
function hashFiles(files) {
    const hash = crypto_1.default.createHash('md5');
    for (const f of files) {
        hash.update(fs_1.default.readFileSync(f));
    }
    return hash.digest('hex');
}
/**
 * BUILD
 */
const files = walk(sourcePath).sort(); // deterministic order
const currentHash = hashFiles(files);
// cache file
const cacheFile = outputFile + '.hash';
if (fs_1.default.existsSync(cacheFile)) {
    const oldHash = fs_1.default.readFileSync(cacheFile, 'utf-8');
    if (oldHash === currentHash) {
        console.log('⚡ VFS unchanged, skipping build');
        process.exit(0);
    }
}
const vfs = {};
for (const fullPath of files) {
    const relative = path_1.default.basename(fullPath);
    const base64 = fs_1.default.readFileSync(fullPath).toString('base64');
    vfs[relative] = base64;
}
/**
 * OUTPUT (TS + ESM)
 */
const content = `/* AUTO-GENERATED FILE. DO NOT EDIT */
const vfs: Record<string, string> = ${JSON.stringify(vfs, null, 2)};

export default vfs;
`;
fs_1.default.writeFileSync(outputFile, content);
fs_1.default.writeFileSync(cacheFile, currentHash);
console.log(`✅ VFS built: ${files.length} files → ${outputFile}`);
//# sourceMappingURL=build-vfs.js.map