set terminal dumb
set xrange [-9:9]
set yrange [-9:9]

do for [ii=1:1000] {
	plot "data.tsv" using 2:3 every ::ii::ii, \
	     "data.tsv" using 4:5 every ::ii::ii
	pause 0.01
	system 'clear'
}
