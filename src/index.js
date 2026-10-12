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

let aquarium = null;

// Restore the terminal before printing, or blessed's cleanup hides the message
function fatal(message, error) {
  try {
    if (aquarium) aquarium.stop();
    if (aquarium && aquarium.screen) aquarium.screen.destroy();
  } catch (e) {
    // Ignore errors during cleanup
  }
  console.error(message, error && error.stack ? error.stack : error);
  process.exit(1);
}

process.on('uncaughtException', (error) => fatal('\nError:', error));
process.on('unhandledRejection', (error) => fatal('\nUnhandled rejection:', error));

try {
  aquarium = new Asciiquarium(options);
  aquarium.init();
  aquarium.start();
} catch (error) {
  fatal('Error starting asciiquarium:', error);
}
