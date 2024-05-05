<script lang="ts">
	import { stolenNoise } from '$lib/index';

	const Noise = stolenNoise();

	type Tile = {
		sides: number;
		region: number;
		frac: number;
	};

	const noise = new Noise(Math.random());
	const borderNoise = new Noise(Math.random());

	const startingRegions = 4;

	function getTiles() {
		let tiles: Tile[][] = [];
		let regions: Region[] = [];

		for (let i = 0; i < startingRegions; i++) {
			regions.push({ blues: 0, reds: 0 });
		}

		for (let y = 0; y < 50; y++) {
			let row: Tile[] = [];
			for (let x = 0; x < 50; x++) {
				const frac = (1 + noise.perlin2(x / 10, y / 10)) / 2;
				const borderFrac = (1 + borderNoise.perlin2(x / 10, y / 10)) / 2;
				const region = Math.floor(borderFrac * startingRegions);
				row.push({
					sides: 0,
					region,
					frac
				});
			}
			tiles.push(row);
		}

		for (let y = 0; y < 50; y++) {
			for (let x = 0; x < 50; x++) {
				setBorders(tiles, x, y);
			}
		}

		const sets: (WeakSet<Tile> | null)[] = regions.map(() => null);

		for (let y = 0; y < 50; y++) {
			for (let x = 0; x < 50; x++) {
				const tile = tiles[y][x];
				const set = sets[tile.region];
				if (set != null) {
					if (set.has(tile)) {
						continue;
					}

					const toChange = [...allInRegion(tiles, x, y)];
					const newSet = new WeakSet<Tile>();
					for (const { x, y } of toChange) {
						const tile = tiles[y][x];
						tile.region = sets.length;
						newSet.add(tile);
					}
					sets.push(newSet);
					regions.push({ blues: 0, reds: 0 });
				} else {
					const toAdd = allInRegion(tiles, x, y);
					const newSet = new WeakSet<Tile>();
					for (const { x, y } of toAdd) {
						newSet.add(tiles[y][x]);
					}
					sets[tile.region] = newSet;
				}
			}
		}

		for (let y = 0; y < 50; y++) {
			for (let x = 0; x < 50; x++) {
				const tile = tiles[y][x];
				const region = regions[tile.region];
				region.reds += tile.frac;
				region.blues += 1 - tile.frac;
			}
		}

		return { tiles, regions };
	}

	let { tiles, regions } = getTiles();

	function onClick(x: number, y: number) {
		const frac = tiles[y][x].frac;
		const old = tiles[y][x].region;
		tiles[y][x].region = selected;
		const oldRegion = regions[old];
		const newRegion = regions[selected];

		oldRegion.reds -= frac;
		oldRegion.blues -= 1 - frac;
		newRegion.reds += frac;
		newRegion.blues += 1 - frac;

		regions = regions;

		setBorders(tiles, x, y);
		for (const { x: nx, y: ny } of neighbours(x, y)) {
			setBorders(tiles, nx, ny);
		}
	}

	function onClickBucket(x: number, y: number) {
		const toChange = [...allInRegion(tiles, x, y)];

		for (const { x, y } of toChange) {
			onClick(x, y);
		}
	}

	function* neighbours(x: number, y: number): Iterable<{ x: number; y: number }> {
		if (x % 2 === 0) {
			if (y !== 0) yield { y: y - 1, x: x };
			if (y !== 0 && x !== 49) yield { y: y - 1, x: x + 1 };
			if (x !== 49) yield { y: y, x: x + 1 };
			if (y !== 49) yield { y: y + 1, x: x };
			if (x !== 0) yield { y: y, x: x - 1 };
			if (x !== 0 && y !== 0) yield { y: y - 1, x: x - 1 };
		} else {
			if (y !== 0) yield { y: y - 1, x: x };
			if (x !== 49) yield { y: y, x: x + 1 };
			if (y !== 49 && x !== 49) yield { y: y + 1, x: x + 1 };
			if (y !== 49) yield { y: y + 1, x: x };
			if (y !== 49 && x !== 0) yield { y: y + 1, x: x - 1 };
			if (x !== 0) yield { y: y, x: x - 1 };
		}
	}

	function* allInRegion(tiles: Tile[][], x: number, y: number): Iterable<{ x: number; y: number }> {
		yield { x, y };

		const tile = tiles[y][x];
		const visited = new WeakSet<Tile>([tile]);
		const region = tile.region;

		function* inner(x: number, y: number): Iterable<{ x: number; y: number }> {
			for (const { x: nx, y: ny } of neighbours(x, y)) {
				const tile = tiles[ny][nx];
				if (!visited.has(tile) && tile.region === region) {
					yield { x: nx, y: ny };
					visited.add(tile);
					yield* inner(nx, ny);
				}
			}
		}

		yield* inner(x, y);
	}

	function setBorders(tiles: Tile[][], x: number, y: number) {
		if (x % 2 === 0) {
			tiles[y][x].sides =
				(tiles[y][x].sides & ~1) |
				(1 * +(y === 0 || tiles[y - 1][x].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~2) |
				(2 * +(y === 0 || x === 49 || tiles[y - 1][x + 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~4) |
				(4 * +(x == 49 || tiles[y][x + 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~8) |
				(8 * +(y === 49 || tiles[y + 1][x].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~16) |
				(16 * +(x === 0 || tiles[y][x - 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~32) |
				(32 * +(y === 0 || x === 0 || tiles[y - 1][x - 1].region !== tiles[y][x].region));
		} else {
			tiles[y][x].sides =
				(tiles[y][x].sides & ~1) |
				(1 * +(y === 0 || tiles[y - 1][x].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~2) |
				(2 * +(x === 49 || tiles[y][x + 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~4) |
				(4 * +(y === 49 || x === 49 || tiles[y + 1][x + 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~8) |
				(8 * +(y === 49 || tiles[y + 1][x].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~16) |
				(16 * +(x === 0 || y === 49 || tiles[y + 1][x - 1].region !== tiles[y][x].region));
			tiles[y][x].sides =
				(tiles[y][x].sides & ~32) |
				(32 * +(x === 0 || tiles[y][x - 1].region !== tiles[y][x].region));
		}
	}

	type Region = {
		reds: number;
		blues: number;
	};

	let selected = 0;

	let scale = 1;
	let top = 0;
	let left = 0;

	function setScale(mul: number, x: number, y: number) {
		const newScale = scale * mul;
		const diff = (newScale - scale) / scale;

		top -= y * diff;
		left -= x * diff;
		scale = newScale;
	}

	let last: { x: number; y: number } | null = null;
</script>

<div class="h-screen w-screen overflow-hidden relative">
	<div
		class="absolute plane"
		style:scale
		style:top="{top}px"
		style:left="{left}px"
		on:wheel={(ev) => {
			const x = ev.pageX - left;
			const y = ev.pageY - top;
			if (ev.deltaY > 0) {
				setScale(3 / 4, x, y);
			} else {
				setScale(4 / 3, x, y);
			}
		}}
		on:mousemove={(ev) => {
			if (ev.buttons === 4 && last) {
				left += ev.screenX - last.x;
				top += ev.screenY - last.y;
				last = { x: ev.screenX, y: ev.screenY };
			}
		}}
		on:drag|preventDefault={() => {}}
		on:touchmove={(ev) => {
			if (last) {
				const touch = ev.touches[0];
				left += touch.screenX - last.x;
				top += touch.screenY - last.y;
				last = { x: touch.screenX, y: touch.screenY };
			}
		}}
		on:pointerdown={(ev) => {
			last = { x: ev.screenX, y: ev.screenY };
		}}
	>
		{#each tiles as row, y}
			<div class="flex">
				{#each row as { sides: n, region, frac }, x}
					<div class="hex p-1 relative">
						<div class="absolute w-full h-full inset-0" class:hidden={!(n & 1)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<div class="absolute w-full h-full inset-0 rotate-[60deg]" class:hidden={!(n & 2)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<div class="absolute w-full h-full inset-0 rotate-[120deg]" class:hidden={!(n & 4)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<div class="absolute w-full h-full inset-0 rotate-[180deg]" class:hidden={!(n & 8)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<div class="absolute w-full h-full inset-0 rotate-[240deg]" class:hidden={!(n & 16)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<div class="absolute w-full h-full inset-0 rotate-[300deg]" class:hidden={!(n & 32)}>
							<div class="absolute w-full h-[4px] bg-white top-0" />
						</div>
						<!-- <div class="absolute w-full h-1 bg-blue-400 top-0 rotate-[60deg]" /> -->
						<div
							class="hex-inner bg-red-300 w-full h-full cursor-pointer flex items-center justify-center text-4xl text-white"
							style="background-color: rgb({Math.floor(frac * 255)}, 0, {Math.floor(
								(1 - frac) * 255
							)});"
							on:mousedown={(ev) =>
								(ev.button === 0 && onClick(x, y)) || (ev.button === 2 && onClickBucket(x, y))}
							on:mouseenter={(ev) => {
								if (ev.buttons === 1) {
									onClick(x, y);
								}
							}}
							on:contextmenu|preventDefault={() => {}}
						>
							{region}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class=" absolute bottom-5 left-5 pointer-events-none right-5 overflow-auto">
		<div class="flex gap-5 h-full pointer-events-auto w-max">
			{#each regions as region, i}
				<button
					on:click={() => (selected = i)}
					class="{selected === i ? 'bg-gray-400' : 'bg-gray-300'} shadow-xl rounded-lg w-10 h-10"
					>{i}</button
				>
			{/each}
			<button
				on:click={() => {
					regions.push({ blues: 0, reds: 0 });
					regions = regions;
				}}
				class="bg-gray-300 shadow-xl rounded-lg w-10 h-10">+</button
			>
		</div>
	</div>
	<div
		class="flex flex-col absolute top-5 h-48 md:h-auto overflow-auto md:top-auto md:bottom-5 right-5 shadow-xl rounded-lg bg-gray-300 text-2xl font-bold"
	>
		{#each regions as region, i}
			{@const total = region.reds + region.blues}
			{@const max = Math.max(region.reds, region.blues)}
			{@const percent = (max * 100) / total}
			<div class="{region.blues > region.reds ? 'text-blue-700' : 'text-red-700'} p-2">
				{i} - {isNaN(percent) ? 'N/A' : percent.toFixed(2) + '%'}
			</div>
		{/each}
	</div>
</div>

<style>
	div.hex {
		width: 115.5px;
		height: 100px;
		margin-left: -14.4px;
		margin-right: -14.4px;
	}

	div.hex,
	div.hex-inner {
		clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

		/* margin-top: 0.5px; */
		/* margin-bottom: 0.5px; */
	}

	div.hex:nth-child(even) {
		translate: 0 50%;
	}

	.plane {
		/* transition:
			left 0.2s,
			top 0.2s; */
		transform-origin: top left;
	}
</style>
