// src/index.tsc
import 'reflect-metadata'
import app from './app'
import environment from './config/environment'
import AppDataSource from './config/ormconfig'

// console.log("Entities being loaded:", AppDataSource.options.entities);

AppDataSource.initialize()
  .then(() => AppDataSource.runMigrations())
  .then(() => {
    console.log('Connected to the database.')

    const port = environment.server.mode.trim() === 'production' ? process.env.PORT : environment.server.port

    app.set('port', port)

    app.listen(app.get('port'), '0.0.0.0', () => {
      console.info(`🚀 START APPLICATION => { PORT: '${app.get('port')}', MODE: '${environment.server.mode.trim()}' }`)
    })
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error)
  })