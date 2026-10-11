import assert from 'node:assert';
import { content } from './projeto-juliana/src/content.js';

console.log('Testing content.js...');

// Rule 1: No invented facts, but core fields must exist
assert.strictEqual(content.name, 'Juliana');
assert.ok(content.traits.joy);
assert.ok(content.traits.strength);
assert.ok(content.traits.delicacy);
assert.ok(content.traits.studies);
assert.strictEqual(content.music.title, "Don't Dream It's Over");
assert.strictEqual(content.music.artist, 'Crowded House');

// Constellation data integrity
assert.ok(content.constellation, 'content.constellation must exist');
assert.ok(Array.isArray(content.constellation.stars), 'constellation.stars must be an array');
assert.ok(content.constellation.stars.length >= 2, 'constellation.stars should have at least 2 stars');

const ids = new Set();
for (const star of content.constellation.stars) {
  assert.ok(star.id, 'star.id must exist');
  assert.ok(!ids.has(star.id), 'star.id must be unique');
  ids.add(star.id);

  assert.ok(star.title, 'star.title must exist');
  assert.ok(star.text, 'star.text must exist');
  assert.ok(typeof star.x === 'number', 'star.x must be a number');
  assert.ok(typeof star.y === 'number', 'star.y must be a number');
}

assert.ok(Array.isArray(content.constellation.connections), 'constellation.connections must be an array');
for (const c of content.constellation.connections) {
  assert.ok(ids.has(c.from), 'connection.from must reference a valid star id');
  assert.ok(ids.has(c.to), 'connection.to must reference a valid star id');
}

console.log('All content tests passed!');
