const fs = require('fs');

try {
  fs.rmSync('.next', { recursive: true, force: true });
} catch (e) {
  // Ignore error if directory doesn't exist or is locked
}
