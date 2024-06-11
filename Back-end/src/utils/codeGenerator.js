function generateRandomCode() {

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let code = '';
    
    for (let i = 0; i < 6; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    
    return code;
}

export default generateRandomCode;