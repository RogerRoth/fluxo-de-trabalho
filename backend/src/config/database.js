module.exports = {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './src/database/db.sqlite', // or ':memory:'
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}