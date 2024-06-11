import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS
    }
});

const sendVerificationEmail = async (username, email, verificationCode) => {

    const mailOptions = {
        
        from: process.env.GOOGLE_USER,
        to: email,
        subject: 'Verificação de E-mail',
        html: `
        <h1>Prezado(a) ${username}</h1>
        <br>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Para concluir o processo de criação da sua conta, precisamos garantir que você tenha acesso legítimo ao endereço de e-mail fornecido. Por favor, use o código de verificação abaixo para confirmar sua identidade:</p>
        <h2 style="text-align: center;">${verificationCode}</h2>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Por favor, insira este código na página de criação de conta para continuar. Se você não está tentando criar uma conta conosco, por favor, ignore este e-mail e entre em contato conosco imediatamente.</p>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Agradecemos por escolher nossa plataforma e estamos ansiosos para tê-lo(a) como parte de nossa comunidade.</p>
        <br>
        <p style="medium/1.5 Arial,Helvetica,sans-serif;">Atenciosamente,</p>
        <h2>DevWizzards, 2024</h2>
        `
    };

    try {

        let info = await transporter.sendMail(mailOptions);
        return "E-mail enviado!";
    } catch (error) {
        
        console.error(error.message);
        return "Falha ao enviar o e-mail";
    }
}

export default sendVerificationEmail;