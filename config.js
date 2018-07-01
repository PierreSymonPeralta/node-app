/**
 * Create and export configuration variable
 */

 // Container for all the environments
const environments = {};

// staging (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName : 'staging'
};

// production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName : 'production'
};

// Determine which env was passed as a command-line args
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

// Check if the given env is one of the keys of the environments object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] :  environments.staging;

// Export the modules
module.exports = environmentToExport;