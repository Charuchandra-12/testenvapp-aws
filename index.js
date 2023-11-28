const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

// Create a Secrets Manager client
const secretsManager = new AWS.SecretsManager();

// Function to retrieve secret values
async function getSecretValue(secretName) {
  const params = {
    SecretId: secretName,
  };

  try {
    const data = await secretsManager.getSecretValue(params).promise();
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error(`Error retrieving secret ${secretName}: ${error.message}`);
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Retrieve secrets
    const { greeting, userName } = await getSecretValue('NewGrettingsForHelloWorld');

    // Write secrets to .env file
    const envContent = `GREETING=${greeting}\nUSER_NAME=${userName}`;
    fs.writeFileSync('.env', envContent);

    // Load environment variables from .env file
    dotenv.config();

    // Print the values
    console.log(`${process.env.GREETING},it's ${process.env.USER_NAME} here!`);
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
}

// Run the main function
main();
