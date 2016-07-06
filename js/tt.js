

var board = [];
var pos = [];
var turn = 0;
var thinking = false;
var onDeck;
var score = [0, 0];
var p0Deck = [];
var p1Deck = [];
var deckNum = 0;

(function($) {
	newGame();
	
	$(document).on('click', '.deck div.card:not(.used):not(.selected)', function() {
		if (!thinking) {
			var parent = $(this).parent().parent().parent().parent();
			var player = parent.attr("id").charAt(1);
			if (player != (turn % 2)) {
				return false;
			}
			else {
				deckNum = $(this).attr("num");
				deckNum = parseInt(deckNum, 10);
				$(this).addClass('selected');
				$('#p' + player + '-deck div.card').not(this).removeClass("selected");
				if (player == 0) {
					onDeck = p0Deck[deckNum];
				}
				else {
					onDeck = p1Deck[deckNum];
				}
			}
		}
	});
	
	$(document).on('click', '#tt-board div.card:not(.set)', function() {
		if (thinking || onDeck == null) {
			return false;
		}
		else {
			thinking = true;
			var index = $(this).attr("id").charAt(4);
			index = parseInt(index, 10);
			showCard('#card' + index, onDeck);
			$('#card' + index).addClass("set");
			$('#p' + onDeck.owner + '-deck tr:nth-of-type(' + (deckNum + 1) + ') div.card')
				.removeClass('selected').addClass('used');
			board[index] = onDeck;
			onDeck = null;
			turn++;
			setTimeout(function() {
				checkBorder(index);
				point(turn);
				thinking = false;
			}, 250);
		}
	});
	
	$(document).on('click', '#reset', function() {
		newGame();
	});
	
	function newGame() {
		turn = Math.floor(Math.random() * 10) % 2;
		point(turn);
		p0Deck = [];
		p1Deck = [];
		for (var i = 0; i < 9; i++) {
			board[i] = null;
			pos[i] = i;
			$('#card' + i).html("&nbsp").removeClass("p0").removeClass("p1").removeClass("set");
			if (i > 0 && i < 6) {
				var card = new Card(0);
				p0Deck.push(card);
				showCard("#p0-deck tr:nth-of-type(" + i + ") div", card);
				$('#p0-deck tr:nth-of-type(' + i + ') div').addClass('p0')
					.removeClass('selected').removeClass('used');
				card = new Card(1);
				p1Deck.push(card);
				showCard("#p1-deck tr:nth-of-type(" + i + ") div", card);
				$('#p1-deck tr:nth-of-type(' + i + ') div').addClass('p1')
					.removeClass('selected').removeClass('used');
			}
		}
		for (var i = 1; i <= 5; i++) {
			
		}
		thinking = false;
		score[0] = 0;
		score[1] = 0;
		updateScore();
	}
	
	function print(value) {
		switch (value) {
			case 10:
				return "A";
			default:
				return value;
		}
	}
	
	function showCard(id, card) {
		$(id).html("<span>" + print(card.north) + "<br>" + print(card.west) + 
			"&nbsp" + print(card.east) + "<br>" + print(card.south) + "</span>")
			.addClass("p" + card.owner);
	}
	
	function point(t) {
		if (t % 2 == 0) {
			$('#pointer').addClass('left');
			$('#pointer').removeClass('right');
		}
		else {
			$('#pointer').addClass('right');
			$('#pointer').removeClass('left');
		}
	}
	
	function checkBorder(index) {
		var card = board[index];
		score[card.owner]++;
		if ((index + 3 ) % 3 != 0) {
			var opponent = board[index - 1];
			if (opponent != null) {
				if (card.west > opponent.east && card.owner != opponent.owner) {
					$('#card' + (index - 1)).removeClass("p" + opponent.owner).addClass("p" + card.owner);
					opponent.owner = card.owner;
					board[index - 1] = opponent;
					score[card.owner]++;
					score[(card.owner + 1) % 2]--;
				}
			}
		}
		if ((index + 1 ) % 3 != 0) {
			var opponent = board[index + 1];
			if (opponent != null) {
				if (card.east > opponent.west && card.owner != opponent.owner) {
					$('#card' + (index + 1)).removeClass("p" + opponent.owner).addClass("p" + card.owner);
					opponent.owner = card.owner;
					board[index + 1] = opponent;
					score[card.owner]++;
					score[(card.owner + 1) % 2]--;
				}
			}
		}
		if (index < 6) {
			var opponent = board[index + 3];
			if (opponent != null) {
				if (card.south > opponent.north && card.owner != opponent.owner) {
					$('#card' + (index + 3)).removeClass("p" + opponent.owner).addClass("p" + card.owner);
					opponent.owner = card.owner;
					board[index + 3] = opponent;
					score[card.owner]++;
					score[(card.owner + 1) % 2]--;
				}
			}
		}
		if (index > 2) {
			var opponent = board[index - 3];
			if (opponent != null) {
				if (card.north > opponent.south && card.owner != opponent.owner) {
					$('#card' + (index - 3)).removeClass("p" + opponent.owner).addClass("p" + card.owner);
					opponent.owner = card.owner;
					board[index - 3] = opponent;
					score[card.owner]++;
					score[(card.owner + 1) % 2]--;
				}
			}
		}
		updateScore();
	}
	
	function updateScore() {
		$('#blue').text(score[0]);
		$('#red').text(score[1]);
	}
})(jQuery);

function Card(id) {
	this.north = Math.floor((Math.random() * 10) + 1);
	this.east = Math.floor((Math.random() * 10) + 1);
	this.south = Math.floor((Math.random() * 10) + 1);
	this.west = Math.floor((Math.random() * 10) + 1);
	this.owner = id % 2;
}