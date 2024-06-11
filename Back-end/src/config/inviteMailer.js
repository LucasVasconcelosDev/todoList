import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS
    }
});

const sendInvitationEmail = async (email, token) => {

    const mailOptions = {
        
        from: process.env.GOOGLE_USER,
        to: email,
        subject: 'Convite para Participar da Categoria',
        html: `
        <h1>Você foi convidado para participar de uma categoria</h1>
        <br>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Para aceitar o convite, clique no botão abaixo:</p>
        <a href="http://localhost/convite/${token}" style="background-color: #5F33E1; color: #fff; display: inline-block; padding: 10px 20px; text-decoration: none; text-align: center; border-radius: 5px;">Aceitar Convite</a>
        <br>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Atenciosamente,</p>
        <h2>DevWizzards, 2024</h2>
        `
    };

    try {

        let info = await transporter.sendMail(mailOptions);
        return "Convite enviado!";
    } catch (error) {
        
        console.error(error.message);
        return "Falha ao fazer o convite";
    }
}

export default sendInvitationEmail;