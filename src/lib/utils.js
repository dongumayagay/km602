const dateTimeFormat = new Intl.DateTimeFormat('en-PH', { dateStyle: 'full', timeStyle: 'short' });

export function formatDateTime(date, time) {
	const dateTime = new Date(date + ' ' + time);
	return dateTimeFormat.format(dateTime);
}
