# rhinocount

RhinoCount Version 1.0

/*
 * The goal here is to create a script that
 * doesn't require that anyone open up the HTML
 * window to edit everything. They should be
 * able to get everything running just by tagging
 * what's needed and letting the script take it
 * all from there and run with it.
*/
				
/*
 * Curent logic is:
 * Tag a text layer with 'count' and 'up' or 'down' depending on the direction.
 * In the payload put 'start number, end number, time interval, (opt) tag of layer to trigger it'.
 * If you want the layer to trigger itself, don't bother with the fourth payload value.
 * The time interval isn't in any exact unit. It's from a scale of 0-10 (slowest to fastest).
*/
