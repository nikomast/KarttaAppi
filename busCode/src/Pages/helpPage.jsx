function HelpPage() {
    return (
        <div className="helpPage">
            <title>Help Page</title>
            <div className="content">
                <h1>Getting started</h1>

                <div className="section">
                    <p>View the map with interactive real time information on the Main page. Click to select location.</p>
                    <p>Create routes by connecting locations by pins. </p>
                    <p>Edit routes by selecting a created route and using the Edit-button.</p>
                    <p>Delete your unwanted created routes by selecting Delete </p>
                    <p>Share your routes by ???. Use the comment section to discuss the routes.</p>
                </div>

                <div className="section">
                    <h2>Contact Us</h2>
                    <p>If you have any further questions, please contact us at team@transitodysseu.com</p>
                </div>
            </div>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@400;700&display=swap');

                html, body {
                    height: 100%;
                    margin: 0;
                    font-family: 'Red Hat Mono', monospace;
                    background-color: #0b6e4f;
                }
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center; 
                    align-items: center;
                }
                .content {
                    max-width: 600px;
                    padding: 20px;
                    border-radius: 10px;
                }
                h1, h2 {
                    text-align: center; 
                }

                p {
                    color: white;
                }
                .section {
                    margin-bottom: 20px;
                }
                `}
            </style>
        </div>
    );
}

export default HelpPage;
