/**
 * Old/classic fish ASCII art (10 variants, each with left and right facing)
 * Used in classic mode (-c flag)
 */
module.exports = [
  // Fish 0 - Right facing
  {
    body: `       \\
     ...\\..,
\\  /'       \\
 >=     (  ' >
/  \\      / /
    \`"'"/''`,
    mask: `       2
     1112111
6  11       1
 66     7  4 5
6  1      3 1
    11111311`
  },
  // Fish 1 - Left facing
  {
    body: `      /
  ,../...
 /       '\\  /
< '  )     =<
 \\ \\      /  \\
  \`'\\'"'"'`,
    mask: `      2
  1112111
 1       11  6
5 4  7     66
 1 3      1  6
  11311111`
  },
  // Fish 2 - Right facing
  {
    body: `    \\
\\ /--\\
>=  (o>
/ \\__/
    /`,
    mask: `    2
6 1111
66  745
6 1111
    3`
  },
  // Fish 3 - Left facing
  {
    body: `  /
 /--\\ /
<o)  =<
 \\__/ \\
  \\`,
    mask: `  2
 1111 6
547  66
 1111 6
  3`
  },
  // Fish 4 - Right facing
  {
    body: `       \\:.
\\;,   ,;\\\\\\\\,,
  \\\\\\\\;;:::::::o
  ///;;::::::::<
 /;\` \`\`/////\`\``,
    mask: `       222
666   1122211
  6661111111114
  66611111111115
 666 113333311`
  },
  // Fish 5 - Left facing
  {
    body: `      .:/
   ,,///;,   ,;/
 o:::::::;;///
>::::::::;;\\\\\\\\
  ''\\\\\\\\\\\\\\'' ';\\`,
    mask: `      222
   1122211   666
 4111111111666
51111111111666
  113333311 666`
  },
  // Fish 6 - Right facing
  {
    body: `  __
><_'>
   '`,
    mask: `  11
61145
   3`
  },
  // Fish 7 - Left facing
  {
    body: ` __
<'_><
 \``,
    mask: ` 11
54116
 3`
  },
  // Fish 8 - Right facing
  {
    body: `   ..\,
>='   ('>
  '''/''`,
    mask: `   1121
661   745
  111311`
  },
  // Fish 9 - Left facing
  {
    body: `  ,/..
<')   \`=<
 \`\`\\\`\`\``,
    mask: `  1211
547   166
 113111`
  },
  // Fish 10 - Right facing
  {
    body: `   \\
  / \\
>=_('>
  \\_/
   /`,
    mask: `   2
  1 1
661745
  111
   3`
  },
  // Fish 11 - Left facing
  {
    body: `  /
 / \\
<')_=<
 \\_/
  \\`,
    mask: `  2
 1 1
547166
 111
  3`
  },
  // Fish 12 - Right facing
  {
    body: `  ,\\
>=('>
  '/`,
    mask: `  12
66745
  13`
  },
  // Fish 13 - Left facing
  {
    body: ` /,
<')=<
 \\\``,
    mask: ` 21
54766
 31`
  },
  // Fish 14 - Right facing
  {
    body: `  __
\\/ o\\
/\\__/`,
    mask: `  11
61 41
61111`
  },
  // Fish 15 - Left facing
  {
    body: ` __
/o \\/
\\__/\\`,
    mask: ` 11
14 16
11116`
  }
];
