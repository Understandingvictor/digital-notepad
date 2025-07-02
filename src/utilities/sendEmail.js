 import emailjs from '@emailjs/browser';
const sendEmail = async(e, form) => {
    e.preventDefault();
    try {
      await emailjs
      .sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, {
        publicKey: process.env.REACT_APP_PUBLIC_KEY,
      })
      console.log('SUCCESS!');
      return true;
    } catch (error) {
      console.log('FAILED...', error.text);
      return false;
    }

 }

 export default sendEmail;