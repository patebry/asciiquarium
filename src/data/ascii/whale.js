/**
 * Whale ASCII art (2 variants: right and left facing)
 */
module.exports = [
  // Right facing (dir = 0)
  {
    body: `
        .-----:
      .'       \`.
,????/       (o) \\
\\\`._/          ,__)`,
    mask: `
             C C
           CCCCCCC
           C  C  C
        BBBBBBB
      BB       BB
B    B       BWB B
BBBBB          BBBB`
  },
  // Left facing (dir = 1)
  {
    body: `
    :-----.
  .'       \`.
 / (o)       \\????,
(__,          \\_.'/`,
    mask: `
   C C
 CCCCCCC
 C  C  C
    BBBBBBB
  BB       BB
 B BWB       B    B
BBBB          BBBBB`
  }
];
