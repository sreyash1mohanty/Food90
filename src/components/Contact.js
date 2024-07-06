const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, comments, or suggestions, please don't hesitate to get in touch with us. You can reach us through the following methods:</p>

            <div className="contact-methods">
                <div className="contact-email">
                    <h2>Email Us</h2>
                    <p>Drop us an email at <a href="mailto:support@food90.com">support@food90.com</a> and we'll get back to you as soon as possible.</p>
                </div>
                <div className="contact-social">
                    <h2>Follow Us</h2>
                    <p>Stay connected with us through social media:</p>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
            <p>Thank you for choosing FOOD90. We look forward to serving you!</p>
        </div>
    );
}

export default Contact;

