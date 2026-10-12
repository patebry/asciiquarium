/**
 * Ship ASCII art (2 directions: right and left facing)
 * Ship is 24 characters wide, appears at water surface
 */
module.exports = [
  // Right facing (dir = 0)
  {
    body: `
     |    |    |
    )_)  )_)  )_)
   )___))___))___)\
  )____)____)_____)\\\\
_____|____|____|____\\\\\\__
\                   /`,
    mask: `
     y    y    y

                  w
                   ww
yyyyyyyyyyyyyyyyyyyywwwyy
y                   y`
  },
  // Left facing (dir = 1)
  {
    body: `
         |    |    |
        (_(  (_(  (_(
      /(___((___((___(
    //(_____(____(____(
__///____|____|____|_____
    \                   /`,
    mask: `
         y    y    y

      w
    ww
yywwwyyyyyyyyyyyyyyyyyyyy
    y                   y`
  }
];
