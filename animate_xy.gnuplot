set terminal dumb
set xrange [-4:4]
set yrange [-4:4]

do for [ii=1:1000] {
	plot "data_xy.tsv" using 2:3 every ::ii::ii, \
	     "data_xy.tsv" using 4:5 every ::ii::ii
	pause 0.01
	system 'clear'
}
