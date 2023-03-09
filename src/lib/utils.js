import jsPDF from 'jspdf';

const dateTimeFormat = new Intl.DateTimeFormat('en-PH', {   
	weekday: 'short',
	month: 'short',
	day: 'numeric',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric' 
});

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




export function printPDF(view){

		const doc = new jsPDF({
			unit: 'mm',
			format: [88, 100]
		});

        const storeName = 'km602 Carwash';
        const storeAddress = 'Purok 7, Brgy. Ariman, Gubat, Sorsogon';
        const storePhone = '+639185321533';

        const transactionId = view.id;
        const receiptDate = new Date().toLocaleString();
		const price = parseFloat(view.price).toFixed(2).toString();
		

		console.log(price);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(storeName, 10, 10);
        doc.setFontSize(8);
        doc.text(storeAddress, 10, 14);
        doc.text(storePhone, 10, 18);
        doc.line(10, 22, 78, 22);

        doc.setFontSize(9);
        doc.text(`Transaction ID: ${transactionId}`, 10, 30);
        doc.text(`Receipt Date: ${receiptDate}`, 10, 34);
        doc.line(10, 40, 78, 40);


        doc.setFontSize(10);
        let y = 48;
        doc.text('Description', 10, y);
        doc.text('Amount', 76, y, { align: 'right' });
        y += 8;
        doc.text(`${view.vehicle} - ${view.what}`, 10, y);
        doc.text(`${price}`, 76, y, { align: 'right' });
        y += 14;

        // // Add the receipt totals
        doc.line(10, y, 78, y);
        y += 6;
        doc.text('Subtotal', 10, y);
        doc.text(`${price}`, 76, y, { align: 'right' });
        y += 6;

        doc.line(10, y, 78, y);

        y += 6;
        doc.text('Total', 10, y);
        doc.text(`${price}`, 76, y, { align: 'right' });


        window.open(doc.output('bloburl'), '_blank');

}



export const sendEmail = async (
	mailOptions = {
		to: 'erica.flores0307@gmail.com',
		subject: 'Email Subject',
		html: '<h1>Hello World</h1>'
	}
) =>
	await (
		await fetch('/api/send-email', {
			method: 'POST',
			body: JSON.stringify({ mailOptions })
		})
	).json();