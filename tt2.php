<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<link type="text/css" rel="stylesheet" href="style/sansita_one.css"/>
		<link type="text/css" rel="stylesheet" href="style/tt2.css"/>
		<title>Triple Triad</title>
	</head>
	<body>
		<div class="what-else-floats"></div>
		<div class="pointer-container">
			<div class="pointer"></div>
		</div>
		<div class="game-container">
			<div class="deck-container">
				<ul id="p0-deck" class="deck">
					<?php
						for ($i = 0; $i < 5; $i++) {
							echo "<li class='card hand' player='0' num='$i'></li>";
						}
					?>
				</ul>
			</div>
			<div class="deck-container">
				<ul id="p1-deck" class="deck">
					<?php
						for ($i = 0; $i < 5; $i++) {
							echo "<li class='card hand' player='1' num='$i'></li>";
						}
					?>
				</ul>
			</div>
			<div class="board-container">
				<table id="tt">
					<?php
						for ($i = 0; $i < 9; $i += 3) {
							echo '<tr>';
							for ($j = 0; $j < 3; $j++) {
								echo '<td><div id="card' . ($i + $j) . '" class="card">' .
									'<div class="front"></div><div class="back"></div></div></td>';
							}
							echo '</tr>';
						}
					?>
				</table>
			</div>
			<div class="scoreboard">
				<table class="sb-table">
					<tr>
						<th>0</th><th>&nbsp</th><th>0</th>
					</tr>
				</table>
			</div>
			<div id="msg"><span></span></div>
			<button class="button" id="reset">New Game</button>
		</div>
		<form class="pick-hand">
			<p>Choose the rules to play by</p>
			<div class="game-options">
				<div class="game-op-1">
					<label><input type="radio" name="rules-1" value="closed" checked="checked"/>Closed</label>
					<label><input type="radio" name="rules-1" value="open"/>Open</label>
					<label><input type="radio" name="rules-1" value="random"/>Random</label>
					<label><input type="checkbox" name="sudden-death" value="sudden-death"/>Sudden Death</label>
				</div>
				<div class="game-op-2">
					<label><input type="radio" name="rules-2" value="basic" checked="checked"/>Basic</label>
					<!--<label><input type="radio" name="rules-2" value="same"/>Same</label>
					<label><input type="radio" name="rules-2" value="same wall"/>Same Wall</label>
					<label><input type="radio" name="rules-2" value="plus"/>Plus</label>-->
					<label><input type="checkbox" name="elemental" value="elemental"/>Elemental</label>
				</div>
			</div>
			<p>Pick 5 cards to build your hand!</p>
			<div class="card-list">
				<?php
					$jsonBourne = array("FF6", "FF8", "FF9", "FF10", "FF12", "FF13", "SE");
					
					foreach ($jsonBourne as $index => $file) {
						$jfile = file_get_contents("js/$file.json");
						$json = json_decode($jfile);
						
						echo "<div class='sorted-deck'><h3>$json->name</h3>";
						foreach ($json->set as $deck) {
							echo "<div class='deck-level'><h5>$deck->level</h5>";
							foreach ($deck->cards as $card) {
								if (file_exists("cards/$file/$card.jpg")) {
									echo "<label><input id='select-$card' class='hidden' type='checkbox' deck='$file' value='$card'/>";
									echo "<img class='card-img' src='cards/$file/$card.jpg'/></label>";
								}
								else {
									echo '<img class="locked" src="img/TTlocked.jpg"/>';
								}
							}
							echo "</div>";
						}
						echo "</div>";
					}
				?>
			</div>
			<button class="button">Let's Duel!</button>
		</form>
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.flip.min.js"></script>
		<script src="js/jquery.konami.min.js"></script>
		<script src="js/tt3.js"></script>
	</body>
</html>