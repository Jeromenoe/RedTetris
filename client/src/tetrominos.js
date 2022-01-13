const CYAN = "08a9a9"
const BLUE = "2471a3"
const ORANGE = "e67e22"
const YELLOW = "b5a700"
const GREEN = "148f77"
const PURPLE = "76448a"
const RED = "a93226"
const GREY = "7f7f7f"
const LIGHTGREY = "c0c0c0"

const transparacy = '59'

export const TETROMINOS = {
	0: { shape: [[0]], color: 'ecf0f1' },
	1: { color : GREY },
	2: { color : LIGHTGREY },
	spectrum: { color : GREEN},
	I : { color : CYAN },
	J: { color : BLUE },
	L: { color : ORANGE },
	O: { color : YELLOW },
	S: { color : GREEN },
	T: { color : PURPLE },
	Z: { color : RED },
	Ip : { color : CYAN + transparacy },
	Jp: { color : BLUE + transparacy },
	Lp: { color : ORANGE + transparacy },
	Op: { color : YELLOW + transparacy },
	Sp: { color : GREEN + transparacy },
	Tp: { color : PURPLE + transparacy },
	Zp: { color : RED + transparacy },
	nextTetro: { color :  'e5e7e9' }
}