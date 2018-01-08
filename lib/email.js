const nodemailer = require('nodemailer');

module.exports = function (credentials) {
	const mailTransport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '291f5e648c307f',
			pass: 'bc22fd0f4685ae'
		}
	});

	const from = '"Express blog" <info@expressBlog.com>';

	return {
		send(to, subj, body) {
			mailTransport.sendMail({
				from,
				to,
				subj,
				html: body,
				generateTextFromHtml: true
			}, err => {
				if (err) {
					console.log(err);
				}
			});
		}
	};
};
