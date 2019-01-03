# chaos-synth

To make sure you have everything installed, run

```
$ brew install make
```

To generate double pendulum data

```
$ gmake data.csv
```

I believe the columns are

1. Time
2. X1
3. Y1
4. X2
5. Y2

Double pendulum C code `solve_dpend.c` is from

- <http://www.physics.usyd.edu.au/~wheat/>
- <http://www.physics.usyd.edu.au/~wheat/dpend_html/>
