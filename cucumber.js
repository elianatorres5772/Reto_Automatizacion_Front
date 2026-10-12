module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    format: ['@serenity-js/cucumber', 'html:target/cucumber-report.html'],
    formatOptions: { specDirectory: 'features' },
  },
}
