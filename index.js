const AWS = require('aws-sdk');


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
    const { greeting, userName } = await getSecretValue('helloworldcredentials');

    // Print the values
    console.log(`${greeting}, This is ${userName} here!!!`);
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
}

// Run the main function
main();
