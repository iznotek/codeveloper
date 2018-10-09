import * as express from 'express'
import * as bodyParser from 'body-parser'
import Api from './api'
import Router from './router'
import Passport from './passport'

export default class App {
  
  private app: express.Application;
  
  get application(): express.Application {
    return this.app;
  }
  
  constructor(port?: number) {
    this.app = express();
    this.setMiddleware();
    this.setRoute();
  }

  private setMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(Passport.initialize());
    this.app.use(Passport.session());
  }
  
  setRoute(): void {
    this.app.use('/', Router.route);
    this.app.use('/api/v1', Api.route);
  }

  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log("server is running");
    });
  }
  
}