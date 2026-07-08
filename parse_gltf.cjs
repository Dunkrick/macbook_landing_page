const fs = require('fs');
const buffer = fs.readFileSync('./public/models/macbook-16-transformed.glb');
// The glb format: 12-byte header, then JSON chunk, then BIN chunk.
// Header: magic (4), version (4), length (4)
// Chunk 0: chunkLength (4), chunkType (4), chunkData
const chunkLength = buffer.readUInt32LE(12);
const chunkType = buffer.toString('utf8', 16, 20);
if (chunkType === 'JSON') {
    const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
    const json = JSON.parse(jsonStr);
    const meshes = json.meshes || [];
    const nodes = json.nodes || [];
    const materials = json.materials || [];
    
    console.log("Nodes:");
    nodes.forEach((n, i) => {
        if (n.mesh !== undefined) {
            console.log(`Node ${i} (name: ${n.name || 'unnamed'}) -> Mesh ${n.mesh}`);
        }
    });
    
    console.log("\nMaterials:");
    materials.forEach((m, i) => {
        console.log(`Material ${i}: ${m.name}`);
    });
}
