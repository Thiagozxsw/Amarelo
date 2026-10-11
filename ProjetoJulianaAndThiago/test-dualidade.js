import assert from 'node:assert';

// Validação estrutural leve (sem DOM): garante que as strings/chaves existem.
// Não testamos lógica de interação aqui porque depende de document/window.

import { content } from './projeto-juliana/src/content.js';

assert.strictEqual(content.name, 'Juliana');
assert.ok(content.traits.strength);
assert.ok(content.traits.delicacy);

console.log('test-dualidade: PASS');
