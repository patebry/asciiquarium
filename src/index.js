#!/usr/bin/env node

/**
 * Asciiquarium - Node.js Edition
 * A faithful port of the classic Perl asciiquarium
 */

const Asciiquarium = require('./asciiquarium');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  classic: args.includes('-c') || args.includes('--classic')
};

// Show help
if (args.includes('-h') || args.includes('--help')) {
  console.log(`
Asciiquarium - Enjoy the mysteries of the sea from the safety of your terminal!

Usage: asciiquarium [options]

Options:
  -c, --classic    Use classic fish and monsters (old ASCII art)
  -h, --help       Show this help message

Keyboard controls:
  q               Quit
  r               Redraw screen
  p               Pause/unpause animation
  Ctrl+C          Quit
  ESC             Quit

Version: 2.0.0-beta.1
`);
  process.exit(0);
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('\nError:', error.message);
  console.error(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('\nUnhandled rejection:', error);
  process.exit(1);
});

// Create and start aquarium
try {
  const aquarium = new Asciiquarium(options);
  aquarium.init();
  aquarium.start();
} catch (error) {
  console.error('Error starting asciiquarium:', error.message);
  console.error(error.stack);
  process.exit(1);
}
