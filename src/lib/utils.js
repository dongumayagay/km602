const dateTimeFormat = new Intl.DateTimeFormat('en-PH', { dateStyle: 'full', timeStyle: 'short' });

export let date = new Date().toLocaleDateString('en-PH', {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric'
});
export let time = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

export function formatDateTime(date, time) {
	const dateTime = new Date(date + ' ' + time);
	return dateTimeFormat.format(dateTime);
}

export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-PH', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
