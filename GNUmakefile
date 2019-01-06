data_xy.tsv: data.tsv data_to_xy
	./data_to_xy $< > $@
	
data.tsv: solve_dpend
	./$< 0.0 10.0 90.0 0.00 -10.0 0.0 1000 > $@

.PHONY: animate_xy
animate_xy: data_xy.tsv
	clear && gnuplot animate_xy.gnuplot
