<script>
	import { formatDateTime } from '$lib/utils';

	export let booking;
</script>

<tr>
	<th>{booking.id}</th>
	<td>{booking.name}</td>
	<td>{booking.email}</td>
	<td>{booking.what}</td>
	<td>
		{formatDateTime(booking.date, booking.time)}
	</td>
	<td>
		<label class="swap">
			<input bind:checked={booking.finish} type="checkbox" />
			<div class="swap-on">DONE</div>
			<div class="swap-off">NOT DONE</div>
		</label>
	</td>
</tr>
